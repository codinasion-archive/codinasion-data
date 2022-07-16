// import programme functions
import collectProgrammesData from "./scripts/programme/collectProgrammesData";
import collectProgrammeData from "./scripts/programme/collectProgrammeData";

// import tags functions
import collectTagsData from "./scripts/tag/collectTagsData";
import collectTagData from "./scripts/tag/collectTagData";

// import stats functions
import collectOrgStats from "./scripts/stats/collectOrgStats";

// import dsa functions
import collectAllDsaData from "./scripts/dsa/collectAllDsaData";
import collectDsaData from "./scripts/dsa/collectDsaData";

// import humans functions
import generateHumansFn from "./scripts/humans/generateHumans";

// import project functions
import collectProjectsData from "./scripts/home/collectProjectData";

const core = require("@actions/core");

// main function
(async () => {
  try {
    console.log("Hii there !!!");

    // default data
    const owner = await core.getInput("owner");
    const token = await core.getInput("token");
    const PAT = await core.getInput("PAT");

    // programme data
    const programmeRepo = await core.getInput("programme-repo");
    const programmeBranch = await core.getInput("programme-branch");
    const collectProgramme = await core.getInput("collect-programme");
    const processProgramme = await core.getInput("process-programme");

    // dsa data
    const dsaRepo = await core.getInput("dsa-repo");
    const dsaBranch = await core.getInput("dsa-branch");
    const collectDsa = await core.getInput("collect-dsa");
    const processDsa = await core.getInput("process-dsa");

    // tag data
    const collectTag = await core.getInput("collect-tag");
    const processTag = await core.getInput("process-tag");

    // stats data
    const collectStats = await core.getInput("collect-stats");

    // humans data
    const generateHumans = await core.getInput("generate-humans");

    // home data
    const projectTopic = await core.getInput("project-topic");
    const collectProject = await core.getInput("collect-project");

    // programme conditions
    if (collectProgramme === "true") {
      await collectProgrammesData(owner, token, programmeRepo, programmeBranch);
    }

    if (processProgramme === "true") {
      await collectProgrammeData(owner, token, programmeRepo, programmeBranch);
    }

    // dsa conditions
    if (collectDsa === "true") {
      await collectAllDsaData(owner, token, dsaRepo, dsaBranch);
    }

    if (processDsa === "true") {
      await collectDsaData(owner, token, dsaRepo, dsaBranch);
    }

    // tag conditions
    if (collectTag === "true") {
      await collectTagsData(owner, token);
    }

    if (processTag === "true") {
      await collectTagData(owner, token);
    }

    // stats conditions
    if (collectStats === "true") {
      await collectOrgStats(owner, token);
    }

    // humans conditions
    if (generateHumans === "true") {
      await generateHumansFn(owner, token, PAT);
    }

    // project conditions
    if (collectProject === "true") {
      await collectProjectsData(owner, token, projectTopic);
    }

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
