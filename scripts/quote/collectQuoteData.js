import fetch from "node-fetch";

import fs from "fs";

export default async function collectQuoteData(
  owner,
  token,
  quoteRepo,
  quoteBranch
) {
  const quoteData = await fetch(
    `https://raw.githubusercontent.com/${owner}/${quoteRepo}/${quoteBranch}/quotes.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });

  console.log("quoteData => ", quoteData);

  // const quoteFileDir = "data/quote";
  // await fs.promises.mkdir(quoteFileDir, { recursive: true });
  // const quoteFilePath = quoteFileDir + "/quotes.json";
  // await fs.writeFile(quoteFilePath, JSON.stringify(quoteData), (err) => {
  //   if (err) throw err;
  //   console.log(`=> ${quoteFilePath} succesfully saved !!!`);
  // });
}
