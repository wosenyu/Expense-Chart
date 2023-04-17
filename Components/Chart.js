import React from "react"

import { Pie, Bar } from 'react-chartjs-2'

import { Chart as ChartJS } from "chart.js/auto"

function Chart({ chartData }) {
    return (
        <Pie data={chartData} />
    )
}
export default Chart