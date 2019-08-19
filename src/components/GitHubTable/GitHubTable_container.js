import {sortBy, formatDate} from "../utils";

/**
 *
 * @param repoData
 * @returns {*[]}
 */
export function formatRepositoryData(repoData) {
    let data = [];
    const result_amount = 10;

    Array.from(repoData).map(repo => {
        let d = {};
        d["id"] = repo["id"];
        d["name"] = repo["name"];
        d["created_at"] = formatDate(repo["created_at"]);
        d["pushed_at"] = formatDate(repo["pushed_at"]);
        d["language"] = repo["language"];
        return data.push(d)
    });
    sortBy(data, {
        prop: "pushed_at",
        desc: true,
        parser: function (item) {
            return new Date(item);
        }
    });
    return data.slice(0, result_amount)

}

/**
 * Get url to fetch data
 * @param {optional} repositoryName
 * @returns {object} with key: values as {name of url} : {url as string}
 */
let url = (repositoryName = null) => {
    return {
        repository: 'https://api.github.com/users/CodecoolWAW20171/repos',
        branch: `https://api.github.com/repos/CodecoolWAW20171/${repositoryName}/branches`,
        contributor: `https://api.github.com/repos/CodecoolWAW20171/${repositoryName}/contributors`,
        commit: `https://api.github.com/repos/CodecoolWAW20171/${repositoryName}/stats/commit_activity`,
    }
};

/**
 * Options for fetching data from GitHub
 * @type {init}
 */
let options = {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.github.inertia-preview+json',
        'Authorization': process.env.REACT_APP_GITHUB_KEY
    }
};

/**
 * Sums values of "total" for commits for each project
 * @param {object} response
 * @returns {number} sum of all commits
 */
function countCommits(response) {
    let sum = 0;
    for (let commit of response) {
        sum += commit.total
    }
    return sum
}

/**
 * Gets names of all project from repositories data
 * @param {object} data
 * @returns {list} projects names
 */
let getProjectsNames = (data) => {
    return data.map(({name}) => name);
};

/**
 * Gets main data for CodeCool20171 about repositories
 * @returns {Promise<any>}
 */
function fetchRepositoryData() {
    return fetch(url().repository, options)
        .then(res => res.json())
        .catch(err => console.log(err))
}

/**
 *Fetches data from all urls and joins into list
 * @returns {Promise<*[]>}
 */
export async function fetchGitHubData() {
    // fetch data from main url
    let repositoryResponse = await fetchRepositoryData().catch(err => console.log(err));
    let repositoryData = formatRepositoryData(repositoryResponse);
    let projectsNames = getProjectsNames(repositoryData);

    //iterates through records of list created from main url data
    for (let i = 0; i < projectsNames.length; i++) {

        // get branches info
        let branchResponse = await fetch(url(projectsNames[i]).branch, options)
            .then(res => res.json());


        // get contributors info
        let contributorsResponse = await fetch(url(projectsNames[i]).contributor)
            .then(res => res.json());


        // get commits info
        let commitResponse = await fetch(url(projectsNames[i]).commit)
            .then(res => res.json());

        if (repositoryData[i].name === projectsNames[i]) {
            repositoryData[i]["branch"] = branchResponse.length;
            repositoryData[i]["contributors"] = contributorsResponse.length;
            repositoryData[i]["total"] = countCommits(commitResponse)
        }
    }
    return repositoryData
}
