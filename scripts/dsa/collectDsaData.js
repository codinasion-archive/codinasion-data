import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function collectDsaData(owner, token, dsaRepo, dsaBranch) {
  const dsaList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/dsa/${"dsaList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const dsaFileDir = "data/dsa/programme";
  await fs.promises.mkdir(dsaFileDir, { recursive: true });
  dsaList &&
    (await Promise.all(
      dsaList.map(async (data) => {
        const slug = data.slug;

        try {
          const source = await fetch(
            `https://raw.githubusercontent.com/${owner}/${dsaRepo}/${dsaBranch}/programme/${slug}/README.md`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          const matterResult = await matter(source);

          const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
          const contentHtml = processedContent.toString();

          const dsaData = JSON.stringify({
            contentHtml: contentHtml,
            markdown: matterResult.content,
            frontMatter: {
              slug: slug || null,
              title: matterResult.data.title
                ? matterResult.data.title
                : "Codinasion",
              description: matterResult.data.description
                ? matterResult.data.description
                : "Codinasion",
              tags: matterResult.data.tags ? matterResult.data.tags : [],
              contributors: matterResult.data.contributors
                ? matterResult.data.contributors
                : [],
            },
          });

          // write prorgamme list data to file
          const dsaFilePath = `${dsaFileDir}/${slug}.json`;
          await fs.writeFile(dsaFilePath, dsaData, (err) => {
            if (err) throw err;
            console.log(`=> ${dsaFilePath} succesfully saved !!!`);
          });
        } catch (error) {
          await console.log("error occured !!! for ", slug);
          await console.log(error);
        }
      })
    ));
}