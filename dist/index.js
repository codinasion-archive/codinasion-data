/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 974:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 332:
/***/ ((module) => {

module.exports = eval("require")("gray-matter");


/***/ }),

/***/ 609:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ }),

/***/ 890:
/***/ ((module) => {

module.exports = eval("require")("remark");


/***/ }),

/***/ 760:
/***/ ((module) => {

module.exports = eval("require")("remark-html");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?node-fetch
var _notfoundnode_fetch = __nccwpck_require__(609);
var _notfoundnode_fetch_default = /*#__PURE__*/__nccwpck_require__.n(_notfoundnode_fetch);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__nccwpck_require__.n(external_fs_namespaceObject);
// EXTERNAL MODULE: ../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?gray-matter
var _notfoundgray_matter = __nccwpck_require__(332);
var _notfoundgray_matter_default = /*#__PURE__*/__nccwpck_require__.n(_notfoundgray_matter);
;// CONCATENATED MODULE: ./scripts/formatSlug.js
function formatSlug(slug) {
  slug = slug.replace(/programme\//, "");
  slug = slug.replace(/\/(README|index|Readme)/, "");
  slug = slug.replace(/\.(mdx|md)/, "");
  return slug;
}

;// CONCATENATED MODULE: ./scripts/programme/collectProgrammesData.js








async function collectProgrammesData(
  owner,
  token,
  programmeRepo,
  programmeBranch
) {
  const programmeList = [];
  const pathsData = await _notfoundnode_fetch_default()(
    `https://api.github.com/repos/${owner}/${programmeRepo}/git/trees/${programmeBranch}?recursive=1`,
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
          const source = await _notfoundnode_fetch_default()(
            `https://raw.githubusercontent.com/${owner}/${programmeRepo}/${programmeBranch}/${data.path}`,
            {
              method: "GET",
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((res) => res.text())
            .catch((error) => console.log(error));

          // get programme tags
          const programme_tags = [];
          const programme_files = pathsData.filter((file) =>
            file.path.startsWith("programme/" + data.path.split("/")[1])
          );
          programme_files &&
            (await Promise.all(
              await programme_files.map(async (file) => {
                if (
                  !file.path.endsWith(".md") &&
                  file.path.replace(
                    `programme/${file.path.split("/")[1]}`,
                    ""
                  ) !== ""
                ) {
                  // check if tag is already in the list
                  if (
                    !programme_tags.find(
                      (tag) => tag === file.path.split(".")[1]
                    )
                  ) {
                    await programme_tags.push(file.path.split(".")[1]);
                  }
                }
              })
            ));

          try {
            const content = await _notfoundgray_matter_default()(source);
            await programmeList.push({
              title: content.data.title ? content.data.title : "Codinasion",
              tags: programme_tags ? programme_tags : [],
              slug: formatSlug(data.path),
            });
          } catch (error) {
            await console.log("error occured !!! for ", data.path);
            await console.log(error);
          }
        }
      })
    ));

  await console.log("\n=> Total programmeList data : ", programmeList.length);

  // write prorgamme list data to file
  const programmeListJson = await JSON.stringify(
    programmeList.sort(function (a, b) {
      if (a.slug < b.slug) {
        return -1;
      }
      if (a.slug > b.slug) {
        return 1;
      }
      return 0;
    })
  );
  const programmeFileDir = "data/programme";
  await external_fs_default().promises.mkdir(programmeFileDir, { recursive: true });
  const programmeFilePath = programmeFileDir + "/programmeList.json";
  await external_fs_default().writeFile(programmeFilePath, programmeListJson, (err) => {
    if (err) throw err;
    console.log(`=> ${programmeFilePath} succesfully saved !!!`);
  });
}

// EXTERNAL MODULE: ../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?remark
var _notfoundremark = __nccwpck_require__(890);
// EXTERNAL MODULE: ../../../../../usr/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?remark-html
var _notfoundremark_html = __nccwpck_require__(760);
var _notfoundremark_html_default = /*#__PURE__*/__nccwpck_require__.n(_notfoundremark_html);
;// CONCATENATED MODULE: ./scripts/formatTag.js
function formatTag(tag) {
  if (tag === "c" || tag === "C") {
    return {
      tag: "c",
      label: "C",
    };
  }
  if (tag === "c++" || tag === "C++" || tag === "cpp" || tag === "CPP") {
    return {
      tag: "cpp",
      label: "C++",
    };
  }
  if (tag === "cs" || tag === "c#" || tag === "CS" || tag === "C#") {
    return {
      tag: "cs",
      label: "C#",
    };
  }
  if (tag === "java" || tag === "Java" || tag === "JAVA") {
    return {
      tag: "java",
      label: "Java",
    };
  }
  if (
    tag === "py" ||
    tag === "Py" ||
    tag === "PY" ||
    tag === "python" ||
    tag === "Python" ||
    tag === "PYTHON"
  ) {
    return {
      tag: "python",
      label: "Python",
    };
  }
  if (tag === "GO" || tag === "go" || tag === "golang" || tag === "Go") {
    return {
      tag: "go",
      label: "GO",
    };
  }
  if (
    tag === "js" ||
    tag === "JS" ||
    tag === "Js" ||
    tag === "javascript" ||
    tag === "JavaScript" ||
    tag === "JAVASCRIPT"
  ) {
    return {
      tag: "js",
      label: "JS",
    };
  }
  if (tag === "php" || tag === "PHP" || tag === "Php") {
    return {
      tag: "php",
      label: "PHP",
    };
  }
  if (
    tag === "julia" ||
    tag === "Julia" ||
    tag === "JULIA" ||
    tag === "jl" ||
    tag === "JL" ||
    tag === "Jl"
  ) {
    return {
      tag: "julia",
      label: "Julia",
    };
  }
  return {
    tag: tag,
    label: tag,
  };
}

;// CONCATENATED MODULE: ./scripts/programme/collectProgrammeData.js










async function collectProgrammeData(
  owner,
  token,
  programmeRepo,
  programmeBranch
) {
  const programmeList = await _notfoundnode_fetch_default()(
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
  await external_fs_default().promises.mkdir(programmeFileDir, { recursive: true });
  programmeList &&
    (await Promise.all(
      programmeList.map(async (data) => {
        const slug = data.slug;

        // get README.md text data
        const readme_text = await _notfoundnode_fetch_default()(
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
        const programme_files = await _notfoundnode_fetch_default()(
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
              if (!file.path.endsWith(".md") && !file.path.endsWith(".png")) {
                // get tags data
                // check if tag is already in the list
                if (
                  !programme_tags.find((tag) => tag === file.path.split(".")[1])
                ) {
                  await programme_tags.push(file.path.split(".")[1]);
                }

                // get code file data
                const response_text = await _notfoundnode_fetch_default()(
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

          const matterResult = await _notfoundgray_matter_default()(String(source));

          // await console.log(matterResult);

          const processedContent = await (0,_notfoundremark.remark)()
            .use((_notfoundremark_html_default()))
            .process(matterResult.content);
          const contentHtml = processedContent.toString();

          var latestUpdateDate = null;
          try {
            let json_res = [];
            latestUpdateDate = await _notfoundnode_fetch_default()(
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
          await external_fs_default().writeFile(programmeFilePath, programmeData, (err) => {
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

;// CONCATENATED MODULE: ./scripts/tag/collectTagsData.js






async function collectTagsData(owner, token) {
  const allTags = [];

  const programmeList = await _notfoundnode_fetch_default()(
    `https://raw.githubusercontent.com/${owner}/${"codinasion-data"}/master/data/programme/${"programmeList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  programmeList &&
    (await Promise.all(
      await programmeList.map(async (data) => {
        for (let i = 0; i < data.tags.length; i++) {
          if (!allTags.includes(formatTag(data.tags[i]).tag)) {
            await allTags.push(formatTag(data.tags[i]).tag);
          }
        }
      })
    ));

  // write tag list data to file
  const tagsFilePath = `data/programme/tagList.json`;
  await external_fs_default().writeFile(tagsFilePath, JSON.stringify(allTags), (err) => {
    if (err) throw err;
    console.log(`=> ${tagsFilePath} succesfully saved !!!`);
  });
}

;// CONCATENATED MODULE: ./scripts/tag/collectTagData.js






async function collectTagData(owner, token) {
  const programmeList = await _notfoundnode_fetch_default()(
    `https://raw.githubusercontent.com/${owner}/${"codinasion-data"}/master/data/programme/${"programmeList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const tagList = await _notfoundnode_fetch_default()(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/programme/${"tagList"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  tagList &&
    (await Promise.all(
      await tagList.map(async (tag) => {
        const allProgramme = [];
        programmeList &&
          (await Promise.all(
            await programmeList.map(async (data) => {
              for (let i = 0; i < data.tags.length; i++) {
                if (formatTag(data.tags[i]).tag === formatTag(tag).tag) {
                  allProgramme.push(data);
                  break;
                }
              }
            })
          ));
        await console.log(`\n=> Total ${tag} tag data : `, allProgramme.length);
        const tagFileDir = "data/programme/tag";
        await external_fs_default().promises.mkdir(tagFileDir, { recursive: true });
        const tagFilePath = `${tagFileDir}/${tag}.json`;
        const tagData = await JSON.stringify(
          allProgramme.sort(function (a, b) {
            if (a.slug < b.slug) {
              return -1;
            }
            if (a.slug > b.slug) {
              return 1;
            }
            return 0;
          })
        );
        await external_fs_default().writeFile(tagFilePath, tagData, (err) => {
          if (err) throw err;
          console.log(`=> ${tagFilePath} succesfully saved !!!`);
        });
      })
    ));
}

;// CONCATENATED MODULE: ./scripts/stats/collectOrgStats.js




async function collectOrgStats(owner, token) {
  try {
    const repos = [];
    const contributors = [];
    var stars = 0;
    var forks = 0;

    async function getRepoJson(apilink) {
      var repo_data = [];
      await _notfoundnode_fetch_default()(apilink, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(
              `The HTTP status of the reponse: ${res.status} (${res.statusText})`
            );
          }
        })
        .then((json) => {
          repo_data = json;
        })
        .catch((err) => console.log(err));

      for (let i = 0; i < repo_data.length; i++) {
        const found = repos.some(
          (el) => el.full_name === repo_data[i].full_name
        );
        if (!found) {
          stars = stars + repo_data[i].stargazers_count;
          forks = forks + repo_data[i].forks_count;
          repos.push({ full_name: repo_data[i].full_name });
        }
      }

      if (repo_data.length === 100) {
        repo_page = repo_page + 1;
        getrepolink = `https://api.github.com/users/${owner}/repos?per_page=100&page=${repo_page}`;
        await getRepoJson(getrepolink);
      }
    }

    async function getContributorJson(apilink) {
      var contributor_data = [];
      await _notfoundnode_fetch_default()(apilink, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(
              `The HTTP status of the reponse: ${res.status} (${res.statusText})`
            );
          }
        })
        .then((json) => {
          contributor_data = json;
        })
        .catch((err) => console.log(err));

      for (let i = 0; i < contributor_data.length; i++) {
        const found = contributors.some(
          (el) =>
            el.username === contributor_data[i].login ||
            contributor_data[i].login.includes("[bot]")
        );
        if (!found) contributors.push({ username: contributor_data[i].login });
      }

      if (contributor_data.length === 100) {
        contributor_page = contributor_page + 1;
        getcontributorlink = `https://api.github.com/repos/${repo_full_name}/contributors?per_page=100&page=${contributor_page}`;
        await getContributorJson(getcontributorlink);
      }
    }

    // get list of repos
    var repo_page = 1;
    var getrepolink = `https://api.github.com/users/${owner}/repos?per_page=100&page=${repo_page}`;
    await getRepoJson(getrepolink);

    // get list of contributors
    for (let i = 0; i < repos.length; i++) {
      var contributor_page = 1;
      var repo_full_name = repos[i].full_name;
      var getcontributorlink = `https://api.github.com/repos/${repo_full_name}/contributors?per_page=100&page=${contributor_page}`;
      await getContributorJson(getcontributorlink);
    }

    contributors.sort((a, b) =>
      a.username.toLowerCase() > b.username.toLowerCase()
        ? 1
        : b.username.toLowerCase() > a.username.toLowerCase()
        ? -1
        : 0
    );

    await console.log("\nTotal no. of contributors : ", contributors.length);

    const data = [
      {
        title: "STARS",
        value: stars,
      },
      {
        title: "FORKS",
        value: forks,
      },
      {
        title: "CONTRIBUTORS",
        value: contributors.length,
      },
      {
        title: "REPOS",
        value: repos.length,
      },
    ];

    await console.log(data);

    // write contributors list data to file
    const contributorsFileDir = "data";
    const contributorsFilePath = `${contributorsFileDir}/${"contributors"}.json`;
    await external_fs_default().writeFile(
      contributorsFilePath,
      JSON.stringify(contributors),
      (err) => {
        if (err) throw err;
        console.log(`=> ${contributorsFilePath} succesfully saved !!!`);
      }
    );

    // write stats data to file
    const statsFileDir = "data";
    const statsFilePath = `${statsFileDir}/${"stats"}.json`;
    await external_fs_default().writeFile(statsFilePath, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(`=> ${statsFilePath} succesfully saved !!!`);
    });

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} stats collect`);
    await console.log(error);
  }
}

;// CONCATENATED MODULE: ./scripts/dsa/collectAllDsaData.js








async function collectAllDsaData(
  owner,
  token,
  dsaRepo,
  dsaBranch
) {
  const dsaList = [];
  const pathsData = await _notfoundnode_fetch_default()(
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
          const source = await _notfoundnode_fetch_default()(
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

          // get programme tags
          const programme_tags = [];
          const programme_files = pathsData.filter((file) =>
            file.path.startsWith("programme/" + data.path.split("/")[1])
          );
          programme_files &&
            (await Promise.all(
              await programme_files.map(async (file) => {
                if (
                  !file.path.endsWith(".md") &&
                  !file.path.endsWith(".png") &&
                  file.path.replace(
                    `programme/${file.path.split("/")[1]}`,
                    ""
                  ) !== ""
                ) {
                  // check if tag is already in the list
                  if (
                    !programme_tags.find(
                      (tag) => tag === file.path.split(".")[1]
                    )
                  ) {
                    await programme_tags.push(file.path.split(".")[1]);
                  }
                }
              })
            ));

          try {
            const content = await _notfoundgray_matter_default()(source);
            await dsaList.push({
              title: content.data.title ? content.data.title : "Codinasion",
              description: content.data.description
                ? content.data.description
                : "Codinasion",
              image: content.data.image
                ? `https://raw.githubusercontent.com/${owner}/${dsaRepo}/${dsaBranch}/programme/${formatSlug(data.path)}/${content.data.image}`
                : "https://raw.githubusercontent.com/codinasion/codinasion/master/image/og/default.png",
              tags: programme_tags ? programme_tags : [],
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
  await external_fs_default().promises.mkdir(dsaFileDir, { recursive: true });
  const dsaFilePath = dsaFileDir + "/dsaList.json";
  await external_fs_default().writeFile(dsaFilePath, dsaListJson, (err) => {
    if (err) throw err;
    console.log(`=> ${dsaFilePath} succesfully saved !!!`);
  });
}

;// CONCATENATED MODULE: ./scripts/dsa/collectDsaData.js










async function collectDsaData(owner, token, dsaRepo, dsaBranch) {
  const dsaList = await _notfoundnode_fetch_default()(
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
  await external_fs_default().promises.mkdir(dsaFileDir, { recursive: true });
  dsaList &&
    (await Promise.all(
      dsaList.map(async (data) => {
        const slug = data.slug;

        // get README.md text data
        const readme_text = await _notfoundnode_fetch_default()(
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

        // get code data
        var code_text = `
<CodeBlock>
        `;
        const programme_tags = [];
        const programme_files = await _notfoundnode_fetch_default()(
          `https://api.github.com/repos/${owner}/${dsaRepo}/contents/programme/${slug}`,
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
              if (!file.path.endsWith(".md") && !file.path.endsWith(".png")) {
                // get tags data
                // check if tag is already in the list
                if (
                  !programme_tags.find((tag) => tag === file.path.split(".")[1])
                ) {
                  await programme_tags.push(file.path.split(".")[1]);
                }

                // get code file data
                const response_text = await _notfoundnode_fetch_default()(
                  `https://raw.githubusercontent.com/${owner}/${dsaRepo}/${dsaBranch}/${file.path}`,
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

          const matterResult = await _notfoundgray_matter_default()(String(source));

          // await console.log(matterResult);

          const processedContent = await (0,_notfoundremark.remark)()
            .use((_notfoundremark_html_default()))
            .process(matterResult.content);
          const contentHtml = processedContent.toString();

          var latestUpdateDate = null;
          try {
            let json_res = [];
            latestUpdateDate = await _notfoundnode_fetch_default()(
              `https://api.github.com/repos/${owner}/${dsaRepo}/commits?path=${
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
                `https://api.github.com/repos/${owner}/${dsaRepo}/commits?path=${
                  "programme/" + slug + "/README.md"
                }&page=1&per_page=1`
            );
            await console.log(error);
          }

          const dsaData = JSON.stringify({
            slug: slug || null,
            title: matterResult.data.title
              ? matterResult.data.title
              : "Codinasion",
            description: matterResult.data.description
              ? matterResult.data.description
              : "Codinasion",
            image: matterResult.data.image
              ? `https://raw.githubusercontent.com/${owner}/${dsaRepo}/${dsaBranch}/programme/${slug}/${matterResult.data.image}`
              : "https://raw.githubusercontent.com/codinasion/codinasion/master/image/og/default.png",
            tags: programme_tags ? programme_tags : [],
            contributors: matterResult.data.contributors
              ? matterResult.data.contributors
              : [],
            latestUpdateDate: latestUpdateDate,
            contentHtml: contentHtml,
            markdown: matterResult.content,
          });

          // write prorgamme list data to file
          const dsaFilePath = `${dsaFileDir}/${slug}.json`;
          await external_fs_default().writeFile(dsaFilePath, dsaData, (err) => {
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

;// CONCATENATED MODULE: ./scripts/humans/generateHumans.js




async function generateHumans_generateHumans(owner, token, PAT) {
  try {
    const contributors = await _notfoundnode_fetch_default()(
      `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/contributors.json`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));

    // humans.txt data
    const humansAdded = [];
    var humans = "";

    // add logo to humans.txt
    humans =
      humans +
      `\n
       __
      /  )          /                 /
     /      _    __/  -  __    _    -/-  -  _   __
    (___/  (_)  (_/  /   / (  (_(_  (_  /  (_)  / (


    The humans.txt file explains the team, technology, and assets 
    behind this site.

_______________________________________________________________________________
    `;

    // add organisation details to humans.txt
    humans =
      humans +
      `\n
/* PROJECT */
Site Name:   Codinasion
Site URL:    https://codinasion.vercel.app
Created:     2022-01-26
Web Design:  Harsh Raj @ Codinasion
    `;

    // add meta details to humans.txt
    humans =
      humans +
      `\n
/* META */
Title:       Codinasion
Description: An Open Source community, dedicated to Open Source projects. Codinasion is a community of developers and coders.
Built with:  Nextjs, Docsearch, Github API, Material-UI, Giscus, and many more.
    `;

    // add social media details to humans.txt
    humans =
      humans +
      `\n
/* SOCIAL */
Website:     https://codinasion.vercel.app
Github:      https://github.com/codinasion
Twitter:     https://twitter.com/codinasion
    `;

    // add maintainers details to humans.txt
    humans =
      humans +
      `\n
/* MAINTAINERS */
    `;
    var maintainers_data = [];
    var maintainers = [];
    await _notfoundnode_fetch_default()(
      `https://api.github.com/organizations/98682602/team/6258326/members`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${PAT} `,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The HTTP status of the reponse { maintainers-api }: ${res.status} (${res.statusText})`
          );
        }
      })
      .then((json) => {
        maintainers_data = json;
      })
      .catch((err) => console.log(err));
    // iterate through maintainers data and add to maintainers array
    // for loop doesn't work here because of the async-await
    maintainers_data &&
      (await Promise.all(
        await maintainers_data.map(async (maintainer) => {
          maintainers.push(maintainer.login);
        })
      ));
    // add maintainers to humans.txt
    // for loop doesn't work here because of the async-await
    maintainers &&
      (await Promise.all(
        await maintainers.map(async (maintainer) => {
          var maintainer_data = {};
          // get user data from github api
          await _notfoundnode_fetch_default()(`https://api.github.com/users/${maintainer}`, {
            method: "GET",
            headers: {
              Authorization: `token ${token} `,
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error(
                  `The HTTP status of the reponse: ${res.status} (${res.statusText})`
                );
              }
            })
            .then((json) => {
              maintainer_data = json;
            })
            .catch((err) => console.log(err));
          // add maintainer to humans.txt
          if (
            maintainer_data.name !== "" &&
            maintainer_data.name !== null &&
            maintainer_data.name !== undefined
          ) {
            humans = humans + `\n${maintainer_data.name}`;
          } else {
            humans = humans + `\n${maintainer_data.login}`;
          }
          if (
            maintainer_data.html_url !== "" &&
            maintainer_data.html_url !== null &&
            maintainer_data.html_url !== undefined
          ) {
            humans = humans + `\n${maintainer_data.html_url}`;
          } else {
            humans =
              humans + `\n${"https://github.com/orgs/codinasion/people"}`;
          }
          if (
            maintainer_data.twitter_username !== "" &&
            maintainer_data.twitter_username !== null &&
            maintainer_data.twitter_username !== undefined
          ) {
            humans =
              humans +
              `\n${"https://twitter.com/" + maintainer_data.twitter_username}`;
          }
          humans = humans + "\n";
          await humansAdded.push(maintainer_data.login);
        })
      ));

    // add team details to humans.txt
    humans =
      humans +
      `\n
/* TEAM */
    `;
    var team_data = [];
    var team = [];
    // get all teams from github api
    await _notfoundnode_fetch_default()(`https://api.github.com/orgs/codinasion/teams`, {
      method: "GET",
      headers: {
        Authorization: `token ${PAT} `,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            `The HTTP status of the reponse: ${res.status} (${res.statusText})`
          );
        }
      })
      .then((json) => {
        team_data = json;
      })
      .catch((err) => console.log(err));
    // iterate through team data and fetch team members
    // for loop doesn't work here because of the async-await
    team_data &&
      (await Promise.all(
        await team_data.map(async (data) => {
          var team_members_data = [];
          await _notfoundnode_fetch_default()(`https://api.github.com/teams/${data.id}/members`, {
            method: "GET",
            headers: {
              Authorization: `token ${PAT} `,
            },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error(
                  `The HTTP status of the reponse: ${res.status} (${res.statusText})`
                );
              }
            })
            .then((json) => {
              team_members_data = json;
            })
            .catch((err) => console.log(err));
          // iterate through team members data and add to team array
          // for loop doesn't work here because of the async-await
          team_members_data &&
            (await Promise.all(
              await team_members_data.map(async (member) => {
                // find if team member is already in humansAdded array
                var isAlreadyAdded = false;
                humansAdded &&
                  (await Promise.all(
                    await humansAdded.map(async (human) => {
                      if (human === member.login) {
                        isAlreadyAdded = true;
                      }
                    })
                  ));
                // if team member is not already in humansAdded array, add to team array
                if (isAlreadyAdded === false) {
                  await team.push(member.login);
                  await humansAdded.push(member.login);
                }
              })
            ));
        })
      ));

    // sort team array alphabetically
    team.sort((a, b) =>
      a.toLowerCase() > b.toLowerCase()
        ? 1
        : b.toLowerCase() > a.toLowerCase()
        ? -1
        : 0
    );
    // iterate trough team array and get user data from github api
    for (let j = 0; j < team.length; j++) {
      var team_member_data = {};
      await _notfoundnode_fetch_default()(`https://api.github.com/users/${team[j]}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(
              `The HTTP status of the reponse: ${res.status} (${res.statusText})`
            );
          }
        })
        .then((json) => {
          team_member_data = json;
        })
        .catch((err) => console.log(err));
      // add team member to humans.txt
      if (
        team_member_data.name !== "" &&
        team_member_data.name !== null &&
        team_member_data.name !== undefined
      ) {
        humans = humans + `\n${team_member_data.name}`;
      } else {
        humans = humans + `\n${team_member_data.login}`;
      }
      if (
        team_member_data.html_url !== "" &&
        team_member_data.html_url !== null &&
        team_member_data.html_url !== undefined
      ) {
        humans = humans + `\n${team_member_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (
        team_member_data.twitter_username !== "" &&
        team_member_data.twitter_username !== null &&
        team_member_data.twitter_username !== undefined
      ) {
        humans =
          humans +
          `\n${"https://twitter.com/" + team_member_data.twitter_username}`;
      }
      humans = humans + "\n";
    }

    // add contributors to humans.txt
    humans =
      humans +
      `\n
/* CONTRIBUTORS */
    `;
    var contributors_data = [];
    // iterate through all contributors and add to contributors array
    for (let i = 0; i < contributors.length; i++) {
      // find if contributor is already in humansAdded array
      var isAlreadyAdded = false;
      for (let j = 0; j < humansAdded.length; j++) {
        if (humansAdded[j] === contributors[i].username) {
          isAlreadyAdded = true;
        }
      }
      // if contributor is not already in humansAdded array, add to contributors array
      if (isAlreadyAdded === false) {
        await contributors_data.push(contributors[i].username);
        await humansAdded.push(contributors[i].username);
      }
    }
    // iterate through contributors array and get user data from github api
    for (let i = 0; i < contributors_data.length; i++) {
      var contributor_data = {};
      await _notfoundnode_fetch_default()(`https://api.github.com/users/${contributors_data[i]}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token} `,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(
              `The HTTP status of the reponse: ${res.status} (${res.statusText})`
            );
          }
        })
        .then((json) => {
          contributor_data = json;
        })
        .catch((err) => console.log(err));
      // add contributor to humans.txt
      if (
        contributor_data.name !== "" &&
        contributor_data.name !== null &&
        contributor_data.name !== undefined
      ) {
        humans = humans + `\n${contributor_data.name}`;
      } else {
        humans = humans + `\n${contributor_data.login}`;
      }
      if (
        contributor_data.html_url !== "" &&
        contributor_data.html_url !== null &&
        contributor_data.html_url !== undefined
      ) {
        humans = humans + `\n${contributor_data.html_url}`;
      } else {
        humans = humans + `\n${"https://github.com/orgs/codinasion/people"}`;
      }
      if (
        contributor_data.twitter_username !== "" &&
        contributor_data.twitter_username !== null &&
        contributor_data.twitter_username !== undefined
      ) {
        humans =
          humans +
          `\n${"https://twitter.com/" + contributor_data.twitter_username}`;
      }
      humans = humans + "\n";
    }

    await console.log(humans);

    // write humans.txt data to file
    const humansFileDir = "data";
    const humansFilePath = `${humansFileDir}/${"humans"}.txt`;
    await external_fs_default().writeFile(humansFilePath, String(humans), (err) => {
      if (err) throw err;
      console.log(`=> ${humansFilePath} succesfully saved !!!`);
    });

    //   collection complete
  } catch (error) {
    await console.log(`error occured !!! for ${owner} stats collect`);
    await console.log(error);
  }
}

;// CONCATENATED MODULE: ./index.js









const core = __nccwpck_require__(974);

// main function
(async () => {
  try {
    console.log("Hii there !!!");

    const owner = await core.getInput("owner");
    const token = await core.getInput("token");
    const PAT = await core.getInput("PAT");
    const programmeRepo = await core.getInput("programme-repo");
    const programmeBranch = await core.getInput("programme-branch");
    const dsaRepo = await core.getInput("dsa-repo");
    const dsaBranch = await core.getInput("dsa-branch");
    const collectProgramme = await core.getInput("collect-programme");
    const processProgramme = await core.getInput("process-programme");
    const collectDsa = await core.getInput("collect-dsa");
    const processDsa = await core.getInput("process-dsa");
    const collectTag = await core.getInput("collect-tag");
    const processTag = await core.getInput("process-tag");
    const collectStats = await core.getInput("collect-stats");
    const generateHumans = await core.getInput("generate-humans");

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

    if (generateHumans === "true") {
      await generateHumans_generateHumans(owner, token, PAT);
    }

    // end of action
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();

})();

module.exports = __webpack_exports__;
/******/ })()
;