import React from "react";
import SimpleTable from "../SimpleTable/SimpleTable";
import {fetchGitHubData} from "./GitHubTable_container";

/**
 * Table with statistic from GitHub for CodeCool20171
 */
// todo - add spinner-loading functionality
class GitHubTable extends React.Component {
    /**
     * Initial parameters for GitHubTable state
     * @type {{columns: *[], title: string, rows: []}}
     */
    state = {
        title: "CodeCool Github Statistic",
        columns: [
            {title: 'Name', field: 'name'},
            {title: 'Language', field: 'language'},
            {title: 'Created', field: 'created_at'},
            {title: 'Last commit', field: 'pushed_at'},
            {title: 'Amount of branches', field: 'branch'},
            {title: 'Contributors', field: 'contributors'},
            {title: 'Main branch committed:', field: 'total'},
        ],
        rows: []
    };

    // todo add interval
    /**
     * Fetches data on mounting component
     */
    componentDidMount() {
        fetchGitHubData()
            .then(res => this.setState({rows: res}))
            .catch(err => console.log(err))
    }

    /**
     * On un-mounting resets timer
     */
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**
     * render SimpleTable component with GitHubTable data
     * @returns {*}
     */
    render = () => <SimpleTable columns={this.state.columns} rows={this.state.rows} title={this.state.title}/>
}

export default GitHubTable