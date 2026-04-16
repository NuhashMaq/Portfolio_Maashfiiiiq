export async function GET(req: Request) {
  const repo = process.env.GITHUB_REPO || 'vercel/next.js';
  const token = process.env.GITHUB_TOKEN;

  const withTokenHeaders = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined;

  let res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: withTokenHeaders,
  });

  // Retry anonymously if token is invalid or expired.
  if (res.status === 401 && token) {
    res = await fetch(`https://api.github.com/repos/${repo}`);
  }

  if (!res.ok) {
    return new Response('Failed to fetch stars', { status: res.status });
  }

  const data = await res.json();
  return Response.json({ stars: data.stargazers_count });
}