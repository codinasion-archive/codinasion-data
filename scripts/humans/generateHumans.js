import fetch from "node-fetch";

import fs from "fs";

export default async function generateHumans(owner, token, PAT) {
  try {
    const contributors = await fetch(
      `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/contributors.json`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    // humans.txt data
    const humansAdded = [];
    var humans = "";

    // add logo to humans.txt
    humans =
      humans +
      `\n
       __
      /  )          /                 /
     /      _    __/  -  __    _    -/-  -  _   __
    (___/  (_)  (_/  /   / (  (_(_  (_  /  (_)  / (


    The humans.txt file explains the team, technology, and assets 
    behind this site.

_______________________________________________________________________________
    `;

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
    // for loop doesn't work here because of the async-await
    maintainers_data &&
      (await Promise.all(
        await maintainers_data.map(async (maintainer) => {
          maintainers.push(maintainer.login);
        })
      ));
    // add maintainers to humans.txt
    // for loop doesn't work here because of the async-await
    maintainers &&
      (await Promise.all(
        await maintainers.map(async (maintainer) => {
          var maintainer_data = {};
          // get user data from github api
          await fetch(`https://api.github.com/users/${maintainer}`, {
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
          if (
            maintainer_data.name !== "" &&
            maintainer_data.name !== null &&
            maintainer_data.name !== undefined
          ) {
            humans = humans + `\n${maintainer_data.name}`;
          } else {
            humans = humans + `\n${maintainer_data.login}`;
          }
          if (
            maintainer_data.html_url !== "" &&
            maintainer_data.html_url !== null &&
            maintainer_data.html_url !== undefined
          ) {
            humans = humans + `\n${maintainer_data.html_url}`;
          } else {
            humans =
              humans + `\n${"https://github.com/orgs/codinasion/people"}`;
          }
          if (
            maintainer_data.twitter_username !== "" &&
            maintainer_data.twitter_username !== null &&
            maintainer_data.twitter_username !== undefined
          ) {
            humans =
              humans +
              `\n${"https://twitter.com/" + maintainer_data.twitter_username}`;
          }
          humans = humans + "\n";
          await humansAdded.push(maintainer_data.login);
        })
      ));

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
        Authorization: `token ${PAT} `,
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
    // for loop doesn't work here because of the async-await
    team_data &&
      (await Promise.all(
        await team_data.map(async (data) => {
          var team_members_data = [];
          await fetch(`https://api.github.com/teams/${data.id}/members`, {
            method: "GET",
            headers: {
              Authorization: `token ${PAT} `,
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
          // for loop doesn't work here because of the async-await
          team_members_data &&
            (await Promise.all(
              await team_members_data.map(async (member) => {
                // find if team member is already in humansAdded array
                var isAlreadyAdded = false;
                humansAdded &&
                  (await Promise.all(
                    await humansAdded.map(async (human) => {
                      if (human === member.login) {
                        isAlreadyAdded = true;
                      }
                    })
                  ));
                // if team member is not already in humansAdded array, add to team array
                if (isAlreadyAdded === false) {
                  await team.push(member.login);
                  await humansAdded.push(member.login);
                }
              })
            ));
        })
      ));

    // sort team array alphabetically
    team.sort((a, b) =>
      a.toLowerCase() > b.toLowerCase()
        ? 1
        : b.toLowerCase() > a.toLowerCase()
        ? -1
        : 0
    );
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
      if (
        team_member_data.name !== "" &&
        team_member_data.name !== null &&
        team_member_data.name !== undefined
      ) {
        humans = humans + `\n${team_member_data.name}`;
      } else {
        humans = humans + `\n${team_member_data.login}`;
      }
      if (
        team_member_data.html_url !== "" &&
        team_member_data.html_url !== null &&
        team_member_data.html_url !== undefined
      ) {
        humans = humans + `\n${team_member_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (
        team_member_data.twitter_username !== "" &&
        team_member_data.twitter_username !== null &&
        team_member_data.twitter_username !== undefined
      ) {
        humans =
          humans +
          `\n${"https://twitter.com/" + team_member_data.twitter_username}`;
      }
      humans = humans + "\n";
    }

    // add contributors to humans.txt
    humans =
      humans +
      `\n
/* CONTRIBUTORS */
    `;
    var contributors_data = [];
    // iterate through all contributors and add to contributors array
    for (let i = 0; i < contributors.length; i++) {
      // find if contributor is already in humansAdded array
      var isAlreadyAdded = false;
      for (let j = 0; j < humansAdded.length; j++) {
        if (humansAdded[j] === contributors[i].username) {
          isAlreadyAdded = true;
        }
      }
      // if contributor is not already in humansAdded array, add to contributors array
      if (isAlreadyAdded === false) {
        await contributors_data.push(contributors[i].username);
        await humansAdded.push(contributors[i].username);
      }
    }
    // iterate through contributors array and get user data from github api
    for (let i = 0; i < contributors_data.length; i++) {
      var contributor_data = {};
      await fetch(`https://api.github.com/users/${contributors_data[i]}`, {
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
      // add contributor to humans.txt
      if (
        contributor_data.name !== "" &&
        contributor_data.name !== null &&
        contributor_data.name !== undefined
      ) {
        humans = humans + `\n${contributor_data.name}`;
      } else {
        humans = humans + `\n${contributor_data.login}`;
      }
      if (
        contributor_data.html_url !== "" &&
        contributor_data.html_url !== null &&
        contributor_data.html_url !== undefined
      ) {
        humans = humans + `\n${contributor_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (
        contributor_data.twitter_username !== "" &&
        contributor_data.twitter_username !== null &&
        contributor_data.twitter_username !== undefined
      ) {
        humans =
          humans +
          `\n${"https://twitter.com/" + contributor_data.twitter_username}`;
      }
      humans = humans + "\n";
    }

    await console.log(humans);

    // write humans.txt data to file
    const humansFileDir = "data";
    const humansFilePath = `${humansFileDir}/${"humans"}.txt`;
    await fs.writeFile(humansFilePath, String(humans), (err) => {
      if (err) throw err;
      console.log(`=> ${humansFilePath} succesfully saved !!!`);
    });

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} stats collect`);
    await console.log(error);
  }
}
