import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";

import formatSlug from "../formatSlug";

export default async function collectAllBlogsData(
  owner,
  token,
  blogRepo,
  blogBranch
) {
  const blogList = [];
  const pathsData = await fetch(
    `https://api.github.com/repos/${owner}/${blogRepo}/git/trees/${blogBranch}?recursive=1`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.tree)
    .catch((error) => {
      console.log(error);
    });

  pathsData &&
    (await Promise.all(
      await pathsData.map(async (data) => {
        if (
          data.path.startsWith("blog") &&
          data.path.endsWith("README.md") &&
          data.path !== "blog/README.md"
        ) {
          const source = await fetch(
            `https://raw.githubusercontent.com/${owner}/${blogRepo}/${blogBranch}/${data.path}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          try {
            const content = await matter(source);
            await blogList.push({
              title: content.data.title ? content.data.title : "Codinasion",
              author: content.data.author ? content.data.author : "Codinasion",
              date: content.data.date ? content.data.date : "2020-01-01",
              description: content.data.description
                ? content.data.description
                : "Codinasion",
              image: content.data.hero
                ? `https://raw.githubusercontent.com/${owner}/${blogRepo}/${blogBranch}/${formatSlug(
                    data.path
                  )}/${content.data.hero}`
                : "https://raw.githubusercontent.com/codinasion/codinasion/master/image/og/default.png",
              tags: content.data.tags ? content.data.tags : [],
              contributors: content.data.contributors
                ? content.data.contributors
                : [],
              slug: formatSlug(data.path),
            });
          } catch (error) {
            await console.log("error occured !!! for ", data.path);
            await console.log(error);
          }
        }
      })
    ));

  await console.log("\n=> Total blogList data : ", blogList.length);

  // write prorgamme list data to file
  const blogListJson = await JSON.stringify(
    // sort blogList by date
    await blogList.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
  );
  const blogFileDir = "data/blog";
  await fs.promises.mkdir(blogFileDir, { recursive: true });
  const blogFilePath = blogFileDir + "/blogList.json";
  await fs.writeFile(blogFilePath, blogListJson, (err) => {
    if (err) throw err;
    console.log(`=> ${blogFilePath} succesfully saved !!!`);
  });
}
