import React from 'react';
import Chart from 'react-apexcharts'


export default class BarChart extends React.Component {

    getData(json, firstParam, secondParam) {
        if (Array.isArray(json)) {
            return json.map(obj => {
                return obj[firstParam].map(pr => {
                    return pr[secondParam]
                })
            })[0]
        }
    }

    data = [{
        "module": "Advanced Module",
        "projects": [
            {
                "project": "Dashboard Api",
                "total": [
                    {
                        "commits": 29,
                        "additions": 267,
                        "deletions": 230
                    }
                ]
            },
            {
                "project": "Medicalspring",
                "total": [
                    {
                        "commits": 6,
                        "additions": 781,
                        "deletions": 34
                    }
                ]
            },
            {
                "project": "Dashboard Django",
                "total": [
                    {
                        "commits": 14,
                        "additions": 866,
                        "deletions": 13
                    }
                ]
            },
            {
                "project": "Smartest",
                "total": [
                    {
                        "commits": 5,
                        "additions": 723,
                        "deletions": 2
                    }
                ]
            }
        ]
    }];


    constructor(props) {
        super(props);

        this.state = {

            series: [

                {
                    name: 'Column A',
                    type: 'column',
                    data: [21.1, 23, 33.1, 234, 44.1, 44.9, 1156.5, 58.5]
                },
                {
                    name: "Column B",
                    type: 'column',
                    data: [2781, 19, 27, 1426, 534, 135, 40, 38]
                },
                {
                    name: "Line C",
                    type: 'line',
                    data: [1.4, 29, 2.5, 1.5, 18, 2.8, 3.8, 49]
                },
            ],


            options: {
                chart: {
                    height: 350,
                    type: "line",
                    stacked: false
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [2],

                    style: {
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        colors: ['#000']
                    },
                },
                colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],

                stroke: {
                    width: [4, 4, 4]
                },


                markers: {
                    size: 6,
                    opacity: 0.9,
                    colors: ["#FFA41B"],
                    strokeColor: "#fff",
                    strokeWidth: 2,

                    hover: {
                        size: 7,
                    }
                },

                plotOptions: {
                    bar: {
                        columnWidth: "20%"
                    }
                },
                xaxis: {
                    categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
                },
                yaxis: [
                    {
                        seriesName: 'Column A',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: "Columns"
                        }
                    },
                    {
                        seriesName: 'Column A',
                        show: false
                    }, {
                        opposite: true,
                        seriesName: 'Line C',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: "Line"
                        }
                    }
                ],
                tooltip: {
                    shared: false,
                    intersect: true,
                    x: {
                        show: false
                    }
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 40
                }
            }
        }
    }

    render() {
        return (

            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height="350"/>

            </div>

        )
    }
}