// import programme functions
import collectProgrammesData from "./scripts/programme/collectProgrammesData";
import collectProgrammeData from "./scripts/programme/collectProgrammeData";

// import dsa functions
import collectAllDsaData from "./scripts/dsa/collectAllDsaData";
import collectDsaData from "./scripts/dsa/collectDsaData";

// import blog functions
import collectAllBlogsData from "./scripts/blog/collectAllBlogsData";
import collectBlogData from "./scripts/blog/collectBlogData";

// import programme tags functions
import collectProgrammeTagsData from "./scripts/programme/tag/collectProgrammeTagsData";
import collectProgrammeTagData from "./scripts/programme/tag/collectProgrammeTagData";

// import blog tags functions
import collectBlogTagsData from "./scripts/blog/tag/collectBlogTagsData";
import collectBlogTagData from "./scripts/blog/tag/collectBlogTagData";

// import stats functions
import collectOrgStats from "./scripts/stats/collectOrgStats";

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

    // blog data
    const blogRepo = await core.getInput("blog-repo");
    const blogBranch = await core.getInput("blog-branch");
    const collectBlog = await core.getInput("collect-blog");
    const processBlog = await core.getInput("process-blog");

    // Programme tag data
    const collectProgrammeTag = await core.getInput("collect-programme-tag");
    const processProgrammeTag = await core.getInput("process-programme-tag");

    // Blog tag data
    const collectBlogTag = await core.getInput("collect-blog-tag");
    const processBlogTag = await core.getInput("process-blog-tag");

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

    // blog conditions
    if (collectBlog === "true") {
      await collectAllBlogsData(owner, token, blogRepo, blogBranch);
    }

    if (processBlog === "true") {
      await collectBlogData(owner, token, blogRepo, blogBranch);
    }

    // Programme tag conditions
    if (collectProgrammeTag === "true") {
      await collectProgrammeTagsData(owner, token);
    }

    if (processProgrammeTag === "true") {
      await collectProgrammeTagData(owner, token);
    }

    // Blog tag conditions
    if (collectBlogTag === "true") {
      await collectBlogTagsData(owner, token);
    }

    if (processBlogTag === "true") {
      await collectBlogTagData(owner, token);
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
