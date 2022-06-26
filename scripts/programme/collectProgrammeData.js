import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function collectProgrammeData(
  owner,
  token,
  programmeRepo,
  programmeBranch
) {
  const programmeList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/programme/${"programmeList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const programmeFileDir = "data/programme/programme";
  await fs.promises.mkdir(programmeFileDir, { recursive: true });
  programmeList &&
    (await Promise.all(
      programmeList.map(async (data) => {
        const slug = data.slug;

        try {
          const source = await fetch(
            `https://raw.githubusercontent.com/${owner}/${programmeRepo}/${programmeBranch}/programme/${slug}/README.md`,
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

          var latestUpdateDate = null;
          try {
            let json_res = [];
            const latestUpdateDate = await fetch(
              `https://api.github.com/repos/${owner}/${programmeRepo}/commits?path=${
                "programme/" + slug + "/README.md"
              }&page=1&per_page=1`
            )
              .then((res) => res.json())
              // .then((json) => console.log(json))
              .then((json) => ((json_res = json), json_res))
              .then((json) => json[0].commit.committer.date)
              .catch((error) => console.log(slug, json_res, error));
            // const data = await res.json();
            // latestUpdateDate = await data[0].commit.committer.date;
          } catch (error) {
            latestUpdateDate = await new Date().toISOString();
            await console.log(
              "latestUpdateDate set to null !!! for" +
                `https://api.github.com/repos/${owner}/${programmeRepo}/commits?path=${
                  "programme/" + slug + "/README.md"
                }&page=1&per_page=1`
            );
            await console.log(error);
          }

          const programmeData = JSON.stringify({
            latestUpdateDate: latestUpdateDate,
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
              image: matterResult.data.image
                ? `https://raw.githubusercontent.com/${owner}/${programmeRepo}/${programmeBranch}/programme/${slug}/${matterResult.data.image}`
                : "https://avatars.githubusercontent.com/u/98682602",
              tags: matterResult.data.tags ? matterResult.data.tags : [],
              contributors: matterResult.data.contributors
                ? matterResult.data.contributors
                : [],
            },
          });

          // write prorgamme list data to file
          const programmeFilePath = `${programmeFileDir}/${slug}.json`;
          await fs.writeFile(programmeFilePath, programmeData, (err) => {
            if (err) throw err;
            console.log(`=> ${programmeFilePath} succesfully saved !!!`);
          });
        } catch (error) {
          await console.log("error occured !!! for ", slug);
          await console.log(error);
        }
      })
    ));
}
