import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import useFetch from "../../../hooks/useFetch";

const LineChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [option, setOption] = useState({
    xAxis: {
      type: "category",
      data: Array.from({ length: 30 }, (_, i) => i + 1),
      name: "Days",
    },
    yAxis: {
      type: "value",
      name: "Amount en €",
    },
    series: [
      {
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: "{b}:{c}",
    },
  });

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    (currentMonth + 1).toString()
  );

  const { performFetch } = useFetch(
    `/admin/sum-daily-cost/${selectedMonth}/${selectedYear}`
  );

  const handleMonthChange = (m) => {
    setSelectedMonth(m);
  };
  const fetchData = async () => {
    try {
      const response = await performFetch({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response === undefined) {
        throw new Error("Error fetching data: Response iseagfw undefined");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.resultArray && data.resultArray.length > 0) {
        setOption((prevOption) => ({
          ...prevOption,
          series: [
            {
              ...prevOption.series[0],
              data: data.resultArray,
            },
          ],
        }));
      } else {
        throw new ("Error fetching data: Data structure is not as expected",
        data)();
      }
    } catch (error) {
      throw new error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear]);

  return (
    <div style={{ width: "1000px", height: "1200px" }}>
      <select
        onChange={(e) => handleMonthChange(e.target.value)}
        value={selectedMonth}
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <label htmlFor="year">Year: </label>
      <select
        id="year"
        onChange={(e) => setSelectedYear(e.target.value)}
        value={selectedYear}
      >
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
      <ReactEcharts option={option} />
    </div>
  );
};

export default LineChart;
