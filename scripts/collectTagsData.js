import fs from "fs";

import fetch from "node-fetch";

import formatTag from "./formatTag";

export default async function collectTagsData(owner, token) {
  const allTags = [];

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

  programmeList &&
    (await Promise.all(
      await programmeList.map(async (data) => {
        for (let i = 0; i < data.tags.length; i++) {
          if (!allTags.includes(formatTag(data.tags[i]).tag)) {
            await allTags.push(formatTag(data.tags[i]).tag);
          }
        }
      })
    ));

  // write tag list data to file
  const tagsFilePath = `data/programme/tagList.json`;
  await fs.writeFile(tagsFilePath, JSON.stringify(allTags), (err) => {
    if (err) throw err;
    console.log(`=> ${tagsFilePath} succesfully saved !!!`);
  });
}
