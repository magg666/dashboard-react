import React from "react";
import Paper from "@material-ui/core/Paper";
import './SimpleTable_style.css'

class SimpleTable extends React.Component {
    tableTitle = () => {
        return (
            <div className="table-title">
                <div className="col-12">
                    <h2 className="text-center"><strong>{this.props.title}</strong></h2>
                </div>
            </div>
        )
    };

    tableHeaders = () => {
        return (
            <thead>
            <tr>
                {this.props.columns.map(column => {
                    return <th key={column.title}>{column.title}</th>
                })}
            </tr>
            </thead>
        )
    };

    tableBody = () => {
        return (
            <tbody>
            {this.props.rows.map((row) => {
                return <tr key={row.id}>
                    {this.props.columns.map((column) => {
                        return <td key={column.field + row.id}>{row[column.field]}</td>
                    })}
                </tr>
            })}
            </tbody>
        )
    };

    render() {
        return (
            <Paper className="table-wrapper">
                {this.tableTitle()}
                <table className="table table-bordered table-hover">
                    {this.tableHeaders()}
                    {this.tableBody()}
                </table>
            </Paper>
        )
    }
}

export default SimpleTable