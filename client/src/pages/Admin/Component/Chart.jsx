import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RevenuChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Monthly Revenue",
              data: [
                5000,
                2000,
                40000,
                5000,
                5000,
                5000,
                30000,
                5000,
                5000,
                5000,
                16000,
                20000,
              ],
              borderColor: "blue", // Color for the line
              borderWidth: 5, // Width of the line
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Amount in $",
              },
              ticks: {
                precision: 1, // Configure decimal precision for y-axis
              },
            },
            x: {
              title: {
                display: true,
                text: "Months",
              },
            },
          },
          plugins: {
            annotation: {
              annotations: {
                note: {
                  type: "line",
                  drawTime: "afterDatasetsDraw",
                  mode: "horizontal",
                  scaleID: "y",
                  value: 25000,
                  borderColor: "black",
                  borderWidth: 2,
                  label: {
                    backgroundColor: "black",
                    color: "white",
                    content:
                      "Net income after worker and facilities deductions",
                    enabled: true,
                  },
                },
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default RevenuChart;
