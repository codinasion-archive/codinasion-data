import fs from "fs";

import fetch from "node-fetch";

import formatTag from "../formatTag";

export default async function collectTagData(owner, token) {
  const programmeList = await fetch(
    `https://raw.githubusercontent.com/${owner}/${"codinasion-data"}/master/data/programme/${"programmeList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const tagList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/programme/${"tagList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  tagList &&
    (await Promise.all(
      await tagList.map(async (tag) => {
        const allProgramme = [];
        programmeList &&
          (await Promise.all(
            await programmeList.map(async (data) => {
              for (let i = 0; i < data.tags.length; i++) {
                if (formatTag(data.tags[i]).tag === formatTag(tag).tag) {
                  allProgramme.push(data);
                  break;
                }
              }
            })
          ));
        await console.log(`\n=> Total ${tag} tag data : `, allProgramme.length);
        const tagFileDir = "data/programme/tag";
        await fs.promises.mkdir(tagFileDir, { recursive: true });
        const tagFilePath = `${tagFileDir}/${tag}.json`;
        const tagData = await JSON.stringify(
          allProgramme.sort(function (a, b) {
            if (a.slug < b.slug) {
              return -1;
            }
            if (a.slug > b.slug) {
              return 1;
            }
            return 0;
          })
        );
        await fs.writeFile(tagFilePath, tagData, (err) => {
          if (err) throw err;
          console.log(`=> ${tagFilePath} succesfully saved !!!`);
        });
      })
    ));
}
