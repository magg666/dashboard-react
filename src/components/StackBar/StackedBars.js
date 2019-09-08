import React from 'react';
import Chart from 'react-apexcharts'

/**
 * Set of stacked bars for weekly projects statistics. Combines independent bars into graph.
 * It is NOT typical stacked bar graph - data for it are from different sources
 */
export class StackedBars extends React.Component {

    /**
     * Count projects which have users with commits. It's used to fit height of chart on page
     * @param data - all projects for indicated module
     * @returns {number}
     */
    countActiveProjects(data) {
        let counter = 0;
        // eslint-disable-next-line
        for (let project of data) {
            if (project['users'].length > 0) {
                counter += 1
            }
        }
        return counter

    }

    render() {
        if (this.props.data.length !== 0) {
            let counter = this.countActiveProjects(this.props.data);
            return (
                this.props.data.map((obj, index) => {
                    if (obj.users.length !== 0) {
                        return <BarChart key={index} data={obj} amount={counter}/>
                    } else {
                        return null
                    }
                })
            )
        } else {
            return null
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
                    height: (0.7 * window.innerHeight) / this.props.amount
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
                        fontSize: '1rem',
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
                    margin: 0,
                    style: {
                        fontSize: '20px',
                        color: '#000',

                    }
                },
                xaxis: {
                    show: false,
                    showAlways: false,
                    // categories: [this.props.data['users'].reduce((a, b) => a + (b['commits'] || 0), 0)],
                    labels: {
                        show: false
                        // formatter: function (val) {
                        //     return Math.floor(val) + " commits"
                        // },
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false

                    }
                },
                yaxis: {
                    crosshairs: {
                        show: false
                    },
                    labels: {
                        show: false
                    },
                    show: false,
                    showAlways: false,
                    title: {
                        text: undefined
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false

                    }

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " commits"
                        }
                    },
                    x: {
                        show: false
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
                },
                responsive: [{
                    breakpoint: 1060,
                    options: {
                        title: {
                            text: [this.props.data['project']],
                            offsetX: '0',
                            floating: true,
                            margin: 0,
                            style: {
                                fontSize: '15px',
                                color: '#000',

                            },
                        },

                    },
                }]

            },
            series:
                this.props.data['users'].map((obj) => {
                    return {name: obj['contributor'], data: [obj['commits']]}
                })
        }
    }

    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar"
                   height={(this.state.options.chart.height)}/>
        );
    }
}


