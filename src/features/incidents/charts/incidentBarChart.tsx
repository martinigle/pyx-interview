import type { ChartData } from "chart.js";
import { useIncidents } from "../useIncidents";
import { useMemo } from "react";
import { EServiceStates, type TServiceState } from "../../../models/backend";
import { Bar } from "react-chartjs-2";
import Loading from "../../../shared/loading";

export default function IncidentBarChart() {
  const { data, isLoading, error } = useIncidents();

  const chartData: ChartData<"bar", number[], string> = useMemo(() => {
    const counts = Object.values(EServiceStates).reduce(
      (acc, state) => {
        acc[state] = 0;
        return acc;
      },
      {} as Record<TServiceState, number>,
    );

    data?.forEach((d) => (counts[d.estadoActual] += 1));

    const filteredEntries = Object.entries(counts).filter(
      ([, value]) => value > 0,
    );

    return {
      labels: filteredEntries.map(([state]) => {
        return state.replace("_", " ");
      }),
      datasets: [
        {
          data: filteredEntries.map(([, value]) => value),
          backgroundColor: ["#3b82f6"],
        },
      ],
    };
  }, [data]);

  if (isLoading) return <Loading />;
  if (error || !data) return <p>Error loading data</p>;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
