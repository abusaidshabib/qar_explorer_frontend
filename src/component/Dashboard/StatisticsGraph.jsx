import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { DateRangePicker } from "@tremor/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useGetGraphDataQuery } from "../../redux/apis/graph";
import moment from "moment";

export const StatisticsGrpah = () => {
  const mode = useSelector((state) => state.global.mode);
  const [selected, setSelected] = useState("day");
  const [selectedDate, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });
  const { selectedTent } = useSelector((state) => state.tent);
  const { data, isLoading, isError, error } = useGetGraphDataQuery(
    {
      type: selected,
      tent_id: selectedTent?.id,
      start_date: moment(selectedDate?.from).format("DD-MM-yyyy"),
      end_date: moment(selectedDate?.to).format("DD-MM-yyyy"),
      date:
        selected === "month"
          ? moment(selectedDate?.from).format("MM-yyyy")
          : moment(selectedDate?.from).format("DD-MM-yyyy"),
    },
    {
      pollingInterval: 60000,
    }
  );
  console.log(data);
  const currentDay = moment().format("DD");
  const currentMonth = moment().format("MM-yyyy");
  const currentHour = moment().format("H");

  console.log(error);

  console.log(moment(selectedDate?.from).format("MM-yyyy"), currentMonth);

  const sumArray = (arr) => arr.reduce((acc, num) => acc + num, 0);

  const [total_in_month, setTotalInMonth] = useState(0);
  const [total_out_month, setTotalOutMonth] = useState(0);
  const [staying_month, setStayingMonth] = useState(0);

  useEffect(() => {
    if (selected === "month") {
      const total_in = sumArray(data?.total_in);
      const total_out = sumArray(data?.total_out);
      const staying = total_in - total_out;

      setTotalInMonth(total_in);
      setTotalOutMonth(total_out);
      setStayingMonth(staying);
    }
  }, [data, selected]);

  // use every variable in the args as useState variable. start
  // start data and end date for day data fetching and date for day pass date data
  // Pass Date in DD-MM-yyyy or MM-yyyy type

  const barChartDataWeeklyRevenue = [
    {
      name: "In",
      data:
        selected === "month"
          ? [total_in_month]
          : selected === "hour" &&
            moment(selectedDate?.from).format("DD") === currentDay
          ? (data?.total_in || []).slice(0, currentHour)
          : data?.total_in || [],
      color: "#74D5FB",
    },
    {
      name: "Out",
      data:
        selected === "month"
          ? [total_out_month]
          : selected === "hour" &&
            moment(selectedDate?.from).format("DD") === currentDay
          ? (data?.total_out || []).slice(0, currentHour)
          : data?.total_out || [],
      color: "#D85A62",
    },
    // {
    //   name: "Staying",
    //   data:
    //     selected === "month"
    //       ? [staying_month < 0 ? 0 : staying_month]
    //       : selected === "hour" &&
    //         moment(selectedDate?.from).format("DD") === currentDay
    //       ? (data?.staying || []).slice(0, currentHour).map((value) => (value < 0 ? 0 : value))
    //       : data?.staying.map((value) => (value < 0 ? 0 : value)),
    //   color: "#4318FF",
    // },
  ];

  const barChartOptionsWeeklyRevenue = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    // colors:['#ff3322','#faf']
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      theme: "dark",
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    xaxis: {
      categories:
        selected === "month"
          ? [moment(selectedDate?.from).format("MMM-yyyy")]
          : selected === "hour" &&
            moment(selectedDate?.from).format("DD") === currentDay
          ? (data?.labels || []).slice(0, currentHour)
          : data?.labels || [],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "black",
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },

    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: true,
          opacity: 0.3,
        },
      },
      row: {
        opacity: 0.3,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      // colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
      labels: {
        colors: "#",
      },
      show: true,
    },
    // colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: `${selected === "hour" ? "10px" : "12px"}`,
        fontWeight: "400",
        colors: [mode === "hajj" ? "#000" : "#fff"],
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "65%",
        endingShape: "rounded",
        dataLabels: {
          position: "top", // top, center, bottom
          orientation: 'vertical',
          
        },
      },
    },
  };

  const datePickerOptions = [
    { value: "tdy", text: "Today", startDate: new Date() },
    {
      value: "w",
      text: "Last 7 days",
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
    },
    {
      value: "t",
      text: "Last 30 days",
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
    },
  ];

  return (
    <div className="bg-bgalt rounded-2xl min-h-[400px]">
      <div className="flex gap-3 px-5 pt-5">
        <DateRangePicker
          dir="ltr"
          style={{ maxWidth: "350px" }}
          className={`max-w-sm justify-self-end ${mode === "hajj1" && "dark"}`}
          enableSelect={false}
          value={selectedDate}
          onValueChange={setDate}
          options={datePickerOptions}
          selectPlaceholder="Today"
          enableYearNavigation={true}
        />
        <Tabs
          className=""
          classNames={{
            tabList: "bg-background",
            cursor: "bg-secondary text-white",
            tabContent: "group-data-[selected=true]:text-white",
          }}
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="hour" title="Hour"></Tab>
          <Tab key="day" title="Day"></Tab>
          <Tab key="month" title="Month"></Tab>
        </Tabs>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Chart
          className="py-5 px-3"
          dir="ltr"
          options={barChartOptionsWeeklyRevenue}
          series={barChartDataWeeklyRevenue}
          type="bar"
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};
