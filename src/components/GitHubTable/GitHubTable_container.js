import {sortBy, formatDate} from "../utils";

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
        d["contributors_url"] = repo["contributors_url"];
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
