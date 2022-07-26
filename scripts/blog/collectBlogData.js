import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function collectblogData(
  owner,
  token,
  blogRepo,
  blogBranch
) {
  const blogList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/blog/${"blogList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const blogFileDir = "data/blog/blog";
  await fs.promises.mkdir(blogFileDir, { recursive: true });
  blogList &&
    (await Promise.all(
      blogList.map(async (data) => {
        try {
          const slug = data.slug;

          // get README.md text data
          const source = await fetch(
            `https://raw.githubusercontent.com/${owner}/${blogRepo}/${blogBranch}/blog/${slug}/README.md`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          // await console.log(source);

          const matterResult = await matter(String(source));

          // await console.log(matterResult);

          const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
          const contentHtml = processedContent.toString();

          var latestUpdateDate = null;
          try {
            let json_res = [];
            latestUpdateDate = await fetch(
              `https://api.github.com/repos/${owner}/${blogRepo}/commits?path=${
                "blog/" + slug
              }&page=1&per_page=1`,
              {
                method: "GET",
                headers: {
                  Authorization: `token ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((json) => ((json_res = json), json_res))
              .then((json) => json[0].commit.committer.date)
              .catch((error) => console.log(slug, json_res, error));
          } catch (error) {
            latestUpdateDate = await new Date().toISOString();
            await console.log(
              "latestUpdateDate set to null !!! for " +
                `https://api.github.com/repos/${owner}/${blogRepo}/commits?path=${
                  "blog/" + slug + "/README.md"
                }&page=1&per_page=1`
            );
            await console.log(error);
          }

          const blogData = JSON.stringify({
            slug: slug || null,
            title: matterResult.data.title
              ? matterResult.data.title
              : "Codinasion",
            author: matterResult.data.author
              ? matterResult.data.author
              : "Codinasion",
            date: matterResult.data.date
              ? matterResult.data.date
              : "2020-01-01",
            description: matterResult.data.description
              ? matterResult.data.description
              : "Codinasion",
            image: matterResult.data.hero
              ? `https://raw.githubusercontent.com/${owner}/${blogRepo}/${blogBranch}/blog/${slug}/${matterResult.data.hero}`
              : "https://raw.githubusercontent.com/codinasion/codinasion/master/image/og/default.png",
            tags: matterResult.data.tags ? matterResult.data.tags : [],
            contributors: matterResult.data.contributors
              ? matterResult.data.contributors
              : [],
            latestUpdateDate: latestUpdateDate,
            contentHtml: contentHtml,
            markdown: matterResult.content,
          });

          // write prorgamme list data to file
          const blogFilePath = `${blogFileDir}/${slug}.json`;
          await fs.writeFile(blogFilePath, blogData, (err) => {
            if (err) throw err;
            console.log(`=> ${blogFilePath} succesfully saved !!!`);
          });
        } catch (error) {
          await console.log("error occured !!! for ", slug);
          await console.log(error);
        }
      })
    ));
}
