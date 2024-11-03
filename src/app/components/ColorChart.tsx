"use client";

import { useEffect, useState } from "react";

import { Color } from "@/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ColorChartProps {
    /** Data to display in the chart. */
    data: Partial<Record<Color, number>>;
}

const ColorChart: React.FC<ColorChartProps> = ({ data }) => {
    const [chartProps, setChartProps] = useState<Highcharts.Options>();

    useEffect(() => {
        const options: Highcharts.Options = {
            chart: {
                type: "pie"
            },
            title: {
                text: "Color Counts"
            },
            xAxis: {
                categories: Object.keys(data)
            },
            yAxis: {
                title: {
                    text: "Count"
                }
            },
            legend: { enabled: false },
            series: [
                {
                    name: "Count",
                    type: "pie",
                    data: Object.keys(data).map((color) => ({
                        name: color,
                        y: data[color as Color],
                        color: color
                    }))
                }
            ],
            credits: {
                enabled: false
            }
        };
        setChartProps(options);
    }, [data]);

    return <HighchartsReact highcharts={Highcharts} options={chartProps} />;
};

export default ColorChart;
