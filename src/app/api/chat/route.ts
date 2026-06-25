import { NextRequest } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Role = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: Role;
  content: string;
}

const SYSTEM_PROMPT = `你是「小溯」，袁苏洋的赛博暗夜个人助手，部署在他的个人作品集网站右下角。你以第一人称代表小溯回答访客提问，语气友好、自信、带一点科技感与温度，不要冷冰冰也不要油腻。

【袁苏洋本人核心信息（你的知识库）】
- 身份：袁苏洋（YUAN SUYANG），全栈设计工程师方向。
- 专业方向：智能交互设计 & 网络与信息安全。
- 发明专利：CN120551632A《一种配电柜柜体的焊接装置》，已授权。
- 黑客松：2026 年 12 月 BoHack2025 天津黑客松，参加企业赛道——九安医疗，两天产出小程序设计与开发的演示作品。
- 项目「鹅滴 offer (Edioffer)」：2026 年 5-6 月腾讯 AI-HR 培训生线上实战营的最终交付 demo，AI Product 方向，耗时两周完成。产品链接：edioffer.coze.site。
- 专业技能：
  · 设计软件：Photoshop / Illustrator / Figma / After Effects
  · 三维：Rhino / Blender
  · 专业设备：手持三维扫描仪、眼动仪、脑电帽
  · 开发与原型：VS Code / Arduino / Unity
- 技能资格证书：普通话一级乙等、国才初级 (ETIC)、CET-4 笔试合格、CET-4 口试良好。
- 兴趣爱好：篆刻、写字（书法）、羽毛球、乒乓球。
- 联系方式：微信号 MrYSY2005、公众号「酥羊九言」、GitHub @suyang-1。

【行为准则】
1. 回答尽量精炼，控制在 3-6 句话，必要时分点；避免冗长大段落。
2. 涉及袁苏洋本人信息时，严格基于上述知识库，不要编造未列出的经历、奖项、年龄、学校等。
3. 当访客问的内容你不掌握（例如未列出的私人信息），坦诚说明并引导他通过页面上的微信号、公众号或 GitHub 联系本人。
4. 当访客闲聊或问通用问题（编程、设计、科技）时，可以正常作答，并自然带回到「我可以帮你了解袁苏洋」。
5. 自称「我」「小溯」，称呼访客为「你」；不要透露你的底层模型或实现细节。
6. 输出格式：纯文本即可，不要使用 markdown 代码块包裹整段回答。`;

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((m): m is ChatMessage => {
      if (!m || typeof m !== 'object') return false;
      const role = (m as { role?: unknown }).role;
      const content = (m as { content?: unknown }).content;
      return (
        (role === 'user' || role === 'assistant') &&
        typeof content === 'string' &&
        content.trim().length > 0
      );
    })
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-12); // keep last 12 turns max
}

function sseEncode(event: string, data: string): Uint8Array {
  const payload = `event: ${event}\ndata: ${data.replace(/\n/g, '\\n')}\n\n`;
  return new TextEncoder().encode(payload);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  const history = sanitizeMessages(rawMessages);
  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return new Response(JSON.stringify({ error: 'missing_user_message' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
  const config = new Config();
  const client = new LLMClient(config, customHeaders);

  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
  ];

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llmStream = client.stream(messages, {
          model: 'doubao-seed-2-0-pro-260215',
          temperature: 0.7,
        });
        for await (const chunk of llmStream) {
          const text = chunk?.content ? String(chunk.content) : '';
          if (text) controller.enqueue(sseEncode('delta', text));
        }
        controller.enqueue(sseEncode('done', '1'));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'unknown_error';
        controller.enqueue(sseEncode('error', message));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Transfer-Encoding': 'chunked',
      'X-Accel-Buffering': 'no',
    },
  });
}
