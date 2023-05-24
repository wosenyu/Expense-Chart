import React from "react"

import { Pie } from 'react-chartjs-2'

import { Chart as ChartJS } from "chart.js/auto"

function Chart({ chartData }) {
    return (
        <div>
            <Pie data={chartData} />

        </div>


    )
}
export default Chart