export async function GET() {
    const res = await fetch('https://api.github.com/users/Mr-BiG1/repos');
    const repos = await res.json();

    const filtered = repos
        .filter((repo: any) => !repo.fork)
        .map((repo: any) => ({
            title: repo.name,
            description: repo.description,
            technologies: [repo.language],
            githubUrl: repo.html_url,
        }));

    return Response.json(filtered);
}
