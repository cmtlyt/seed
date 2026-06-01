import type { APIContext } from 'astro';

/** GET /api/hello?name=xxx */
export function GET(context: APIContext) {
  const name = context.url.searchParams.get('name') || 'World';
  return new Response(JSON.stringify({ message: `Hello, ${name}!`, timestamp: Date.now() }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

/** POST /api/hello — accepts JSON body { name: string } */
export async function POST(context: APIContext) {
  const body = await context.request.json();
  const name = body?.name || 'World';
  return new Response(JSON.stringify({ message: `Hello, ${name}!`, method: 'POST', timestamp: Date.now() }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
