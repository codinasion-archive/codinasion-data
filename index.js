import collectProgrammesData from "./scripts/programme/collectProgrammesData";
import collectProgrammeData from "./scripts/programme/collectProgrammeData";
import collectTagsData from "./scripts/tag/collectTagsData";
import collectTagData from "./scripts/tag/collectTagData";
import collectOrgStats from "./scripts/stats/collectOrgStats";
import collectAllDsaData from "./scripts/dsa/collectAllDsaData";
import collectDsaData from "./scripts/dsa/collectDsaData";
import collectQuoteData from "./scripts/quote/collectQuoteData";
import collectQuoteCategoryData from "./scripts/quote/collectQuoteCategoryData";

const core = require("@actions/core");

// main function
(async () => {
  try {
    console.log("Hii there !!!");

    const owner = await core.getInput("owner");
    const token = await core.getInput("token");
    const programmeRepo = await core.getInput("programme-repo");
    const programmeBranch = await core.getInput("programme-branch");
    const dsaRepo = await core.getInput("dsa-repo");
    const dsaBranch = await core.getInput("dsa-branch");
    const quoteRepo = await core.getInput("quote-repo");
    const quoteBranch = await core.getInput("quote-branch");
    const collectProgramme = await core.getInput("collect-programme");
    const processProgramme = await core.getInput("process-programme");
    const collectDsa = await core.getInput("collect-dsa");
    const processDsa = await core.getInput("process-dsa");
    const collectQuote = await core.getInput("collect-quote");
    const processQuote = await core.getInput("process-quote");
    const collectTag = await core.getInput("collect-tag");
    const processTag = await core.getInput("process-tag");
    const collectStats = await core.getInput("collect-stats");

    if (collectProgramme === "true") {
      await collectProgrammesData(owner, token, programmeRepo, programmeBranch);
    }

    if (processProgramme === "true") {
      await collectProgrammeData(owner, token, programmeRepo, programmeBranch);
    }

    if (collectDsa === "true") {
      await collectAllDsaData(owner, token, dsaRepo, dsaBranch);
    }

    if (processDsa === "true") {
      await collectDsaData(owner, token, dsaRepo, dsaBranch);
    }

    if (collectTag === "true") {
      await collectTagsData(owner, token);
    }

    if (processTag === "true") {
      await collectTagData(owner, token);
    }

    if (collectStats === "true") {
      await collectOrgStats(owner, token);
    }

    if (collectQuote === "true") {
      await collectQuoteData(owner, token, quoteRepo, quoteBranch);
    }

    if (processQuote === "true") {
      await collectQuoteCategoryData(token);
    }

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
