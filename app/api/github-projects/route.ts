interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    fork: boolean;
}

export async function GET() {
    const response = await fetch('https://api.github.com/users/Mr-BiG1/repos');
    const data: GitHubRepo[] = await response.json();

    const filteredProjects = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
            title: repo.name,
            description: repo.description ?? 'No description provided.',
            technologies: [repo.language ?? 'Unknown'],
            githubUrl: repo.html_url,
        }));

    return Response.json(filteredProjects);
}
