import fetch from "node-fetch";

export default async function collectProjectsData(owner, token, projectTopic) {
  try {
    // get all projects
    const projectsData = [];
    const projects = await fetch(
      `https://api.github.com/search/repositories?q=topic:${projectTopic}&sort=stars&order=desc`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => json.items)
      .catch((error) => console.log(error));

    // add projects to projectsData
    projects &&
      (await Promise.all(
        projects.map(async (project) => {
          if (project.owner.login === owner) {
            const data = {
              name: project.name,
              description: project.description,
              url: project.html_url,
              stars: project.stargazers_count,
            };
            projectsData.push(data);
          }
        })
      ));

    await console.log(projectsData);

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} project collection !!!`);
    await console.log(error);
  }
}
