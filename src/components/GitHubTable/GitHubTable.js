import React from "react";
import SimpleTable from "../SimpleTable/SimpleTable";
import {formatRepositoryData} from "./GitHubTable_container";

class GitHubTable extends React.Component {

    state = {
        title : "CodeCool Github Statistic",
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Language', field: 'language'},
            {title: 'Created', field: 'created_at'},
            {title: 'Last commit', field: 'pushed_at'},
            {title: 'Amount of branches', field: 'branch'},
            {title: 'Contributors', field: 'contributors'},
            {title: 'Main branch commited:', field: 'total'},
        ],
        rows: []
    };

    async fetchGitHubData() {
        let repoResponse = await fetch('https://api.github.com/users/CodecoolWAW20171/repos', {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.inertia-preview+json',
                'Authorization': process.env.REACT_APP_GITHUB_KEY
            }
        });
        let repoData = await repoResponse.json();
        let repoList = formatRepositoryData(Array.from(repoData));

        let nameList = [];
        for (let i = 0; i < repoList.length; i++) {
            nameList.push(repoList[i].name);
        }
        for (let i = 0; i < nameList.length; i++) {
            let branchesResponse = await fetch(`https://api.github.com/repos/CodecoolWAW20171/${nameList[i]}/branches`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.inertia-preview+json',
                    'Authorization': process.env.REACT_APP_GITHUB_KEY
                }
            });
            let branches = await branchesResponse.json();
            repoList[i].branch = branches.length
        }
        for (let i = 0; i < nameList.length; i++) {
            let contributorResponse = await fetch(`https://api.github.com/repos/CodecoolWAW20171/${nameList[i]}/contributors`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.inertia-preview+json',
                    'Authorization': process.env.REACT_APP_GITHUB_KEY
                }
            });
            let contributors = await contributorResponse.json();
            repoList[i].contributors = contributors.length
        }
        for (let i = 0; i < nameList.length; i++) {
            let commitResponse = await fetch(`https://api.github.com/repos/CodecoolWAW20171/${nameList[i]}/stats/commit_activity`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.inertia-preview+json',
                    'Authorization': process.env.REACT_APP_GITHUB_KEY
                }
            });
            let commits = await commitResponse.json();
            let commitsList = Array.from(commits);
            let total = 0;
            commitsList.forEach(function (commit) {
                total += commit.total;
                return total
            });
            repoList[i].total = total;
            this.setState({rows: repoList})
        }
    }

    componentDidMount() {
        this.fetchGitHubData()
            .catch(err => console.log(err));
        this.timer = setInterval(() => this.fetchGitHubData(), 3600000)
    }

    componentWillUnmount() {
        this.timer = null;
        clearInterval()
    }

    render = () => <SimpleTable columns={this.state.columns} rows={this.state.rows} title={this.state.title}/>
}

export default GitHubTable