import { useEffect, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { useGetDisneyCharactersQuery } from "@/features/disneyCharacters/disneyCharactersApiSlice"

const chartSettings = {
  chart: {
    height: 500,
    type: "pie",
  },
  title: {
    text: "Number of films each character participates in",
  },
  tooltip: {
    valueSuffix: " film(s)",
  },

  plotOptions: {
    pie: {
      size: 300,
    },
  },
  series: [
    {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 50,
        },
        {
          enabled: true,
          distance: -30,
          format: "{point.percentage:.1f}%",
        },
      ],
      data: [],
    },
  ],
}
export function useGetChartStatiscsOptions() {
  const [seriesData, setSeriesData] = useState({
    data: [] as { name: string; y: number }[],
  })

  const { charactersPerPage, currentPage } = useAppSelector(
    state => state.uiState.pagination,
  )

  const isStatisticsModalOpen = useAppSelector(
    state => state.uiState.isStatisticsModalOpen,
  )
  const { data, isError, isLoading } = useGetDisneyCharactersQuery({
    index: currentPage,
    pageSize: charactersPerPage,
  })

  useEffect(() => {
    if (data && isStatisticsModalOpen) {
      const characters = data.data
      setSeriesData({
        data: characters.map(character => ({
          name: character.name,
          y: character.films.length,
        })),
      })
    }
  }, [data, isStatisticsModalOpen])

  return { seriesData, chartSettings, isLoading, isError }
}
