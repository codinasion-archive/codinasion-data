import fetch from "node-fetch";

import fs from "fs";

export default async function collectOrgStats(owner, token, PAT) {
  try {
    const repos = [];
    const contributors = [];
    var stars = 0;
    var forks = 0;

    async function getRepoJson(apilink) {
      var repo_data = [];
      await fetch(apilink, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
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
          repo_data = json;
        })
        .catch((err) => console.log(err));

      for (let i = 0; i < repo_data.length; i++) {
        const found = repos.some(
          (el) => el.full_name === repo_data[i].full_name
        );
        if (!found) {
          stars = stars + repo_data[i].stargazers_count;
          forks = forks + repo_data[i].forks_count;
          repos.push({ full_name: repo_data[i].full_name });
        }
      }

      if (repo_data.length === 100) {
        repo_page = repo_page + 1;
        getrepolink = `https://api.github.com/users/${owner}/repos?per_page=100&page=${repo_page}`;
        await getRepoJson(getrepolink);
      }
    }

    async function getContributorJson(apilink) {
      var contributor_data = [];
      await fetch(apilink, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
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
          contributor_data = json;
        })
        .catch((err) => console.log(err));

      for (let i = 0; i < contributor_data.length; i++) {
        const found = contributors.some(
          (el) =>
            el.username === contributor_data[i].login ||
            contributor_data[i].login.includes("[bot]")
        );
        if (!found) contributors.push({ username: contributor_data[i].login });
      }

      if (contributor_data.length === 100) {
        contributor_page = contributor_page + 1;
        getcontributorlink = `https://api.github.com/repos/${repo_full_name}/contributors?per_page=100&page=${contributor_page}`;
        await getContributorJson(getcontributorlink);
      }
    }

    // get list of repos
    var repo_page = 1;
    var getrepolink = `https://api.github.com/users/${owner}/repos?per_page=100&page=${repo_page}`;
    await getRepoJson(getrepolink);

    // get list of contributors
    for (let i = 0; i < repos.length; i++) {
      var contributor_page = 1;
      var repo_full_name = repos[i].full_name;
      var getcontributorlink = `https://api.github.com/repos/${repo_full_name}/contributors?per_page=100&page=${contributor_page}`;
      await getContributorJson(getcontributorlink);
    }

    contributors.sort((a, b) =>
      a.username > b.username.toLowerCase()
        ? 1
        : b.username.toLowerCase() > a.username.toLowerCase()
        ? -1
        : 0
    );

    await console.log("\nTotal no. of contributors : ", contributors.length);

    const data = [
      {
        title: "STARS",
        value: stars,
      },
      {
        title: "FORKS",
        value: forks,
      },
      {
        title: "CONTRIBUTORS",
        value: contributors.length,
      },
      {
        title: "REPOS",
        value: repos.length,
      },
    ];

    await console.log(data);

    // write contributors list data to file
    const contributorsFileDir = "data";
    const contributorsFilePath = `${contributorsFileDir}/${"contributors"}.json`;
    await fs.writeFile(
      contributorsFilePath,
      JSON.stringify(contributors),
      (err) => {
        if (err) throw err;
        console.log(`=> ${contributorsFilePath} succesfully saved !!!`);
      }
    );

    // write stats data to file
    const statsFileDir = "data";
    const statsFilePath = `${statsFileDir}/${"stats"}.json`;
    await fs.writeFile(statsFilePath, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(`=> ${statsFilePath} succesfully saved !!!`);
    });

    // humans.txt data
    const humansAdded = [];
    var humans = "";
    // add logo to humans.txt
    // ...
    // add organisation details to humans.txt
    humans =
      humans +
      `\n
/* PROJECT */
Site Name:   Codinasion
Site URL:    https://codinasion.vercel.app
Created:     2022-01-26
Web Design:  Harsh Raj @ Codinasion
    `;
    // add meta details to humans.txt
    humans =
      humans +
      `\n
/* META */
Title:       Codinasion
Description: An Open Source community, dedicated to Open Source projects. Codinasion is a community of developers and coders.
Built with:  Nextjs, Docsearch, Github API, Material-UI, Giscus, and many more.
    `;
    // add social media details to humans.txt
    humans =
      humans +
      `\n
/* SOCIAL */
Website:     https://codinasion.vercel.app
Github:      https://github.com/codinasion
Twitter:     https://twitter.com/codinasion
    `;
    // add maintainers details to humans.txt
    humans =
      humans +
      `\n
/* MAINTAINERS */
    `;
    var maintainers_data = [];
    var maintainers = [];
    await fetch(
      `https://api.github.com/organizations/98682602/team/6258326/members`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${PAT} `,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The HTTP status of the reponse { maintainers-api }: ${res.status} (${res.statusText})`
          );
        }
      })
      .then((json) => {
        maintainers_data = json;
      })
      .catch((err) => console.log(err));
    // iterate through maintainers data and add to maintainers array
    for (let i = 0; i < maintainers_data.length; i++) {
      maintainers.push(maintainers_data[i].login);
    }
    // add maintainers to humans.txt
    for (let i = 0; i < maintainers.length; i++) {
      var maintainer_data = {};
      // get user data from github api
      await fetch(`https://api.github.com/users/${maintainers[i]}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
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
          maintainer_data = json;
        })
        .catch((err) => console.log(err));
      // add maintainer to humans.txt
      if (maintainer_data.name !== "") {
        humans = humans + `\n${maintainer_data.name}`;
      } else {
        humans = humans + `\n${maintainer_data.login}`;
      }
      if (maintainer_data.html_url !== "") {
        humans = humans + `\n${maintainer_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (maintainer_data.twitter_username !== "") {
        humans =
          humans +
          `\n${"https://twitter.com/" + maintainer_data.twitter_username}`;
      }
      humans = humans + "\n";
      humansAdded.push(maintainer_data.login);
    }

    // add team details to humans.txt
    humans =
      humans +
      `\n
/* TEAM */
    `;
    var team_data = [];
    var team = [];
    // get all teams from github api
    await fetch(`https://api.github.com/orgs/codinasion/teams`, {
      method: "GET",
      headers: {
        Authorization: `token ${token} `,
      },
    })
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
        team_data = json;
      })
      .catch((err) => console.log(err));
    // iterate through team data and fetch team members
    for (let i = 0; i < team_data.length; i++) {
      var team_members_data = [];
      await fetch(`https://api.github.com/teams/${team_data[i].id}/members`, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
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
          team_members_data = json;
        })
        .catch((err) => console.log(err));
      // iterate through team members data and add to team array
      for (let j = 0; j < team_members_data.length; j++) {
        // find if team member is already in humansAdded array
        var isAlreadyAdded = false;
        for (let k = 0; k < humansAdded.length; k++) {
          if (humansAdded[k] === team_members_data[j].login) {
            isAlreadyAdded = true;
          }
        }
        // if team member is not already in humansAdded array, add to team array
        if (isAlreadyAdded === false) {
          team.push(team_members_data[j].login);
        }
      }
    }
    // iterate trough team array and get user data from github api
    for (let j = 0; j < team.length; j++) {
      var team_member_data = {};
      await fetch(`https://api.github.com/users/${team[j]}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
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
          team_member_data = json;
        })
        .catch((err) => console.log(err));
      // add team member to humans.txt
      if (team_member_data.name !== "") {
        humans = humans + `\n${team_member_data.name}`;
      } else {
        humans = humans + `\n${team_member_data.login}`;
      }
      if (team_member_data.html_url !== "") {
        humans = humans + `\n${team_member_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (team_member_data.twitter_username !== "") {
        humans =
          humans +
          `\n${"https://twitter.com/" + team_member_data.twitter_username}`;
      }
      humans = humans + "\n";
      humansAdded.push(team_member_data.login);
    }

    await console.log(humans);

    // // write humans.txt data to file
    // const humansFileDir = "data";
    // const humansFilePath = `${humansFileDir}/${"humans"}.txt`;
    // await fs.writeFile(humansFilePath, humans, (err) => {
    //   if (err) throw err;
    //   console.log(`=> ${humansFilePath} succesfully saved !!!`);
    // });

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} stats collect`);
    await console.log(error);
  }
}
