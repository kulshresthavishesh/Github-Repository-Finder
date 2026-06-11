const fetchBtn = document.getElementById("fetchBtn");
const language = document.getElementById("language");
const repoInfo = document.getElementById("repoInfo");

fetchBtn.addEventListener("click", async () => {
    const lang = language.value;

    repoInfo.innerHTML = "Loading...";

    try {
        const response = await fetch(
            `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc&per_page=100`
        );

        const data = await response.json();

        const repos = data.items;

        const randomRepo =
            repos[Math.floor(Math.random() * repos.length)];

        repoInfo.innerHTML = `
            <h2>${randomRepo.name}</h2>
            <p><strong>Description:</strong> ${
                randomRepo.description || "No description available"
            }</p>
            <p><strong>⭐ Stars:</strong> ${randomRepo.stargazers_count}</p>
            <p><strong>🍴 Forks:</strong> ${randomRepo.forks_count}</p>
            <p><strong>🐞 Open Issues:</strong> ${randomRepo.open_issues_count}</p>
            <p>
                <a href="${randomRepo.html_url}" target="_blank">
                    View Repository
                </a>
            </p>
        `;
    } catch (error) {
        repoInfo.innerHTML =
            "Error fetching repository. Try again.";
        console.error(error);
    }
});