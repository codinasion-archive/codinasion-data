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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The HTTP status of the reponse: ${res.status} (${res.statusText})`
          );
        }
      })
      .then((json) => {
        return json;
      })
      .catch((err) => console.log(err));

    //   add projects to projectsData
    projects &&
      (await Promise.all().map(async (project) => {
        if (project.owner.login === owner) {
          const data = {
            name: project.name,
            description: project.description,
            url: project.html_url,
            stars: project.stargazers_count,
            language: project.language,
            owner: project.owner.login,
            ownerUrl: project.owner.html_url,
            ownerAvatar: project.owner.avatar_url,
            ownerType: project.owner.type,
            ownerCompany: project.owner.company,
            ownerLocation: project.owner.location,
            ownerBlog: project.owner.blog,
            ownerBio: project.owner.bio,
          };
          projectsData.push(data);
        }
      }));

    await console.log(projectsData);

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} project collection !!!`);
    await console.log(error);
  }
}
