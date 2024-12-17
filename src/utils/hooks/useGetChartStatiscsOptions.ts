import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { useGetDisneyCharactersQuery } from "../../features/disneyCharacters/disneyCharactersApiSlice"
const initOptions = {
  chart: {
    type: "pie",
  },
  title: {
    text: "Number of films each character participates in",
  },
  tooltip: {
    valueSuffix: "film(s)",
  },

  plotOptions: {
    series: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: [
        {
          enabled: true,
          distance: 20,
        },
        {
          enabled: true,
          distance: -40,
          format: "{point.percentage:.1f}%",
          style: {
            fontSize: "1.2em",
            textOutline: "none",
            opacity: 0.7,
          },
          filter: {
            operator: ">",
            property: "percentage",
            value: 10,
          },
        },
      ],
    },
  },
  series: [
    {
      data: [],
    },
  ],
}
export function useGetChartStatiscsOptions() {
  const [options, setOptions] = useState(initOptions)
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
      setOptions(
        o =>
          ({
            ...o,
            series: [
              {
                data: characters.map(character => ({
                  name: character.name,
                  y: character.films.length,
                })),
              },
            ],
          }) as any,
      )
    }
  }, [data, isStatisticsModalOpen])

  return { options, isLoading, isError }
}
