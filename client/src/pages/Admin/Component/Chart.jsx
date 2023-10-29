import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const RevenueChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      new Chart(chartRef.current, {
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
                3300,
                5500,
              ],
              borderColor: "blue",
              borderWidth: 5,
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
                precision: 1,
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
                },
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div style={{ width: "50%", height: "500px" }}>
      <canvas ref={chartRef} />
      <p
        style={{
          backgroundColor: "#f7f7f7",
          borderLeft: "5px solid black",
          padding: "10px",
          fontStyle: "italic",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "10px",
          width: "400px",
          marginTop: "50px",
        }}
      >
        Note: The revenue chart is calculated after deducting worker and
        facilities payments.
      </p>
    </div>
  );
};

export default RevenueChart;
