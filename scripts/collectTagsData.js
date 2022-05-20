import fs from "fs";

import fetch from "node-fetch";

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
          if (!allTags.includes(data.tags[i])) {
            await allTags.push(data.tags[i]);
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
