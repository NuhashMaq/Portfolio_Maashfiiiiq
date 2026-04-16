export async function GET() {
  const repo = process.env.GITHUB_REPO || 'vercel/next.js';
  const token = process.env.GITHUB_TOKEN;
  const repoUrl = `https://api.github.com/repos/${repo}`;

  const baseHeaders = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-maashfiiiiq',
  };

  const withTokenHeaders = token
    ? {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
      }
    : baseHeaders;

  let res = await fetch(repoUrl, {
    headers: withTokenHeaders,
    next: { revalidate: 300 },
  });

  // Retry anonymously if token is invalid or expired.
  if (res.status === 401 && token) {
    res = await fetch(repoUrl, {
      headers: baseHeaders,
      next: { revalidate: 300 },
    });
  }

  if (!res.ok) {
    return Response.json(
      { stars: 0, error: 'Failed to fetch stars' },
      {
        status: res.status,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }

  const data: { stargazers_count?: number } = await res.json();
  return Response.json(
    { stars: typeof data.stargazers_count === 'number' ? data.stargazers_count : 0 },
    {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    }
  );
}