import { useMemo } from "react";
import { useIncidents } from "../useIncidents";
import { Pie } from "react-chartjs-2";
import type { EChannel } from "../../../models/backend";
import type { ChartData } from "chart.js";
import Loading from "../../../shared/loading";

export default function IncidentPieChart() {
  const { data, isLoading, error } = useIncidents();

  const chartData: ChartData<"pie", number[], string> = useMemo(() => {
    const counts: Record<EChannel, number> = {
      WEB: 0,
      CALL_CENTER: 0,
      WHATSAPP: 0,
      EMAIL: 0,
      COMERCIAL: 0,
    };

    data?.forEach((d) => (counts[d.canal] += 1));

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: [
            "#3b82f6",
            "#22c55e",
            "#f97316",
            "#ef4444",
            "#8b5cf6",
          ],
        },
      ],
    };
  }, [data]);

  if (isLoading) return <Loading />;
  if (error || !data) return <p>Error loading data</p>;

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}
