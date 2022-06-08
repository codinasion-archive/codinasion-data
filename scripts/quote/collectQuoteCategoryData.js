import fetch from "node-fetch";

import fs from "fs";

export default async function collectQuoteCategoryData(token) {
  const quoteCategory = [];
  const quoteList = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/quote/${"quotes"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const quoteFileDir = "data/quote/category";
  await fs.promises.mkdir(quoteFileDir, { recursive: true });

  //  get quote categories
  quoteList &&
    (await Promise.all(
      await quoteList.map(async (quote) => {
        if (!quoteCategory.includes(quote.type.toLowerCase())) {
          await quoteCategory.push(quote.type.toLowerCase());
        }
      })
    ));

  await console.log("quotes categories =>", quoteCategory);

  // save quote category data
  quoteCategory &&
    (await Promise.all(
      await quoteCategory.map(async (category) => {
        const categoryQuotes = await quoteList.filter(function (quote) {
          return quote.type.toLowerCase() === category.toLowerCase();
        });

        // write quote category data to file
        const quoteFilePath = `${quoteFileDir}/${category.toLowerCase()}.json`;
        await fs.writeFile(
          quoteFilePath,
          JSON.stringify(categoryQuotes),
          (err) => {
            if (err) throw err;
            console.log(`=> ${quoteFilePath} succesfully saved !!!`);
          }
        );
      })
    ));
}
