interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    language: string;
    fork: boolean;
}

export async function GET() {
    const res = await fetch('https://api.github.com/users/Mr-BiG1/repos');
    const repos: GitHubRepo[] = await res.json();

    const filtered = repos
        .filter((repo) => !repo.fork)
        .map((repo) => ({
            title: repo.name,
            description: repo.description || 'No description provided.',
            technologies: [repo.language || 'Unknown'],
            githubUrl: repo.html_url,
        }));

    return Response.json(filtered);
}
