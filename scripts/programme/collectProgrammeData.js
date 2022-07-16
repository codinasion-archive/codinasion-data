import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import formatTag from "../formatTag";

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

        // get README.md text data
        const readme_text = await fetch(
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

        // get code data
        var code_text = `
<CodeBlock>
        `;
        const programme_tags = [];
        const programme_files = await fetch(
          `https://api.github.com/repos/${owner}/${programmeRepo}/contents/programme/${slug}`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .catch((error) => console.log(error));

        programme_files &&
          (await Promise.all(
            programme_files.map(async (file) => {
              if (
                !file.path.endsWith(".md") &&
                !file.path.endsWith(".png") &&
                !file.path.endsWith(".jpg") &&
                !file.path.endsWith(".jpeg") &&
                !file.path.endsWith(".gif") &&
                !file.path.endsWith(".svg")
              ) {
                // get tags data
                // check if tag is already in the list
                if (
                  !programme_tags.find((tag) => tag === file.path.split(".")[1])
                ) {
                  await programme_tags.push(file.path.split(".")[1]);
                }

                // get code file data
                const response_text = await fetch(
                  `https://raw.githubusercontent.com/${owner}/${programmeRepo}/${programmeBranch}/${file.path}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `token ${token}`,
                    },
                  }
                )
                  .then((res) => res.text())
                  .catch((error) => console.log(error));

                code_text =
                  code_text +
                  `
${"```"}${formatTag(file.path.split(".")[1]).tag}
${response_text}
${"```"}
                `;
              }
            })
          ));

        code_text =
          code_text +
          `
</CodeBlock>
          `;

        try {
          const source = `${readme_text}
${code_text}
        `;

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
              `https://api.github.com/repos/${owner}/${programmeRepo}/commits?path=${
                "programme/" + slug
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
                `https://api.github.com/repos/${owner}/${programmeRepo}/commits?path=${
                  "programme/" + slug + "/README.md"
                }&page=1&per_page=1`
            );
            await console.log(error);
          }

          const programmeData = JSON.stringify({
            slug: slug || null,
            title: matterResult.data.title
              ? matterResult.data.title
              : "Codinasion",
            description: matterResult.data.description
              ? matterResult.data.description
              : "Codinasion",
            tags: programme_tags ? programme_tags : [],
            contributors: matterResult.data.contributors
              ? matterResult.data.contributors
              : [],
            latestUpdateDate: latestUpdateDate,
            contentHtml: contentHtml,
            markdown: matterResult.content,
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
