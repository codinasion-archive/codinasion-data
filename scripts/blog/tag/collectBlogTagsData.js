import fs from "fs";

import fetch from "node-fetch";

import formatTag from "../../formatTag";

export default async function collectBlogTagsData(owner, token) {
  const allTags = [];

  const blogList = await fetch(
    `https://raw.githubusercontent.com/${owner}/${"codinasion-data"}/master/data/blog/${"blogList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  blogList &&
    (await Promise.all(
      await blogList.map(async (data) => {
        for (let i = 0; i < data.tags.length; i++) {
          if (!allTags.includes(formatTag(data.tags[i]).tag)) {
            // push tag to allTags
            await allTags.push({
              tag: formatTag(data.tags[i]).tag,
              count: 1,
            });
          } else {
            // update count
            for (let j = 0; j < allTags.length; j++) {
              if (allTags[j].tag === formatTag(data.tags[i]).tag) {
                allTags[j].count++;
              }
            }
          }
        }
      })
    ));

  // write tag list data to file
  const tagsFilePath = `data/blog/tagList.json`;
  await fs.writeFile(tagsFilePath, JSON.stringify(allTags), (err) => {
    if (err) throw err;
    console.log(`=> ${tagsFilePath} succesfully saved !!!`);
  });
}
