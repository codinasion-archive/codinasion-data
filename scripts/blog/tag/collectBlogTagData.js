import fs from "fs";

import fetch from "node-fetch";

import formatTag from "../../formatTag";

export default async function collectBlogTagData(owner, token) {
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

  const tagList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/blog/${"tagList"}.json`,
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
        const allBlog = [];
        blogList &&
          (await Promise.all(
            await blogList.map(async (data) => {
              for (let i = 0; i < data.tags.length; i++) {
                if (formatTag(data.tags[i]).tag === formatTag(tag.tag).tag) {
                  allBlog.push(data);
                  break;
                }
              }
            })
          ));
        await console.log(`\n=> Total ${tag.tag} tag data : `, allBlog.length);
        const tagFileDir = "data/blog/tag";
        await fs.promises.mkdir(tagFileDir, { recursive: true });
        const tagFilePath = `${tagFileDir}/${tag.tag}.json`;
        const tagData = await JSON.stringify(
          allBlog.sort(function (a, b) {
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
