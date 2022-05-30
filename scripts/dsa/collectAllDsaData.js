import fetch from "node-fetch";

import fs from "fs";

import matter from "gray-matter";

import formatSlug from "../formatSlug";

export default async function collectAllDsaData(
  owner,
  token,
  dsaRepo,
  dsaBranch
) {
  const dsaList = [];
  const pathsData = await fetch(
    `https://api.github.com/repos/${owner}/${dsaRepo}/git/trees/${dsaBranch}?recursive=1`,
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
          data.path.startsWith("programme") &&
          data.path.endsWith("README.md") &&
          data.path !== "programme/README.md"
        ) {
          const source = await fetch(
            `https://raw.githubusercontent.com/${owner}/${dsaRepo}/${dsaBranch}/${data.path}`,
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
            await dsaList.push({
              title: content.data.title ? content.data.title : "Codinasion",
              tags: content.data.tags ? content.data.tags : [],
              slug: formatSlug(data.path),
            });
          } catch (error) {
            await console.log("error occured !!! for ", data.path);
            await console.log(error);
          }
        }
      })
    ));

  await console.log("\n=> Total dsaList data : ", dsaList.length);

  // write prorgamme list data to file
  const dsaListJson = await JSON.stringify(
    dsaList.sort(function (a, b) {
      if (a.slug < b.slug) {
        return -1;
      }
      if (a.slug > b.slug) {
        return 1;
      }
      return 0;
    })
  );
  const dsaFileDir = "data/dsa";
  await fs.promises.mkdir(dsaFileDir, { recursive: true });
  const dsaFilePath = dsaFileDir + "/dsaList.json";
  await fs.writeFile(dsaFilePath, dsaListJson, (err) => {
    if (err) throw err;
    console.log(`=> ${dsaFilePath} succesfully saved !!!`);
  });
}
