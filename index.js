import collectProgrammesData from "./scripts/programme/collectProgrammesData";
import collectProgrammeData from "./scripts/programme/collectProgrammeData";
import collectTagsData from "./scripts/tag/collectTagsData";
import collectTagData from "./scripts/tag/collectTagData";
import collectOrgStats from "./scripts/stats/collectOrgStats";

const core = require("@actions/core");

// main function
(async () => {
  try {
    console.log("Hii there !!!");

    const owner = await core.getInput("owner");
    const token = await core.getInput("token");
    const programmeRepo = await core.getInput("programme-repo");
    const programmeBranch = await core.getInput("programme-branch");
    const collectProgramme = await core.getInput("collect-programme");
    const processProgramme = await core.getInput("process-programme");
    const collectTag = await core.getInput("collect-tag");
    const processTag = await core.getInput("process-tag");
    const collectStats = await core.getInput("collect-stats");

    if (collectProgramme === "true") {
      await collectProgrammesData(owner, token, programmeRepo, programmeBranch);
    }

    if (processProgramme === "true") {
      await collectProgrammeData(owner, token, programmeRepo, programmeBranch);
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

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
