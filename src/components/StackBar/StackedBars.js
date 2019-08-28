import React from 'react';
import Chart from 'react-apexcharts'

/**
 * Set of stacked bars for weekly projects statistics. Combines independent bars into graph.
 * It is NOT typical stacked bar graph - data for it are from different sources
 */
export class StackedBars extends React.Component {
    render() {
        if (this.props.data.length !== 0) {
            return (
                this.props.data.map((obj, index) => {
                    return <BarChart key={index} data={obj} size={this.props.height}/>
                })
            )
        } else {
            return (
                <div>There could be your project, but you did not send it...</div>
            )
        }
    }
}

/**
 * Single bar for projects and statistic for it's users (contributors)
 * From apex-charts
 * Documentation: https://apexcharts.com/react-chart-demos/bar-charts/stacked/
 */
class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    stacked: true,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,

                    },
                    dataLabels: {
                        hideOverflowingLabels: false,
                    },
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'middle',
                    style: {
                        fontSize: '1em',
                        colors: ['#000']
                    },
                    formatter: function (value, {seriesIndex, w}) {
                        return w.config.series[seriesIndex].name + ":  " + value
                    },
                    offsetX: 0,
                    offsetY: 0,

                },

                stroke: {
                    width: 1,
                    colors: ['#fff']
                },

                title: {
                    text: [this.props.data['project']],
                    offsetX: '5px',
                    floating: true,
                    style: {
                        fontSize: '20px',
                        color: '#000',

                    }
                },
                xaxis: {
                    categories: [this.props.data['users'].reduce((a, b) => a + (b['commits'] || 0), 0)],
                    labels: {
                        formatter: function (val) {
                            return Math.floor(val) + " commits"
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: undefined
                    },

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " commits"
                        }
                    }
                },
                fill: {
                    opacity: 1

                },

                legend: {
                    show: false,
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            series:
                this.props.data['users'].map((obj) => {
                    return {name: obj['contributor'], data: [obj['commits']]}
                })
        }
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar"
                       height={this.props.size}/>
            </div>
        );
    }
}


