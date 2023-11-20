import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import useFetch from "../../../hooks/useFetch";

const LineChart = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    ("0" + (new Date().getMonth() + 1)).slice(-2)
  );
  const [response, setResponse] = useState();
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
    series: [{ type: "line", data: [] }],
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}€",
    },
  });

  const { performFetch } = useFetch(
    `/admin/sum-daily-cost/${selectedMonth}/${selectedYear}`,
    (res) => {
      setOption({
        ...option,
        series: [{ type: "line", data: res.resultArray }],
      });
      setResponse(res);
    }
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (response && Array.isArray(response.resultArray)) {
      setOption({
        ...option,
        series: [{ type: "line", data: response.resultArray }],
      });
    }
  }, [response]);

  return (
    <div style={{ width: "1000px", height: "1200px" }}>
      <select
        onChange={(e) => setSelectedMonth(e.target.value)}
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
