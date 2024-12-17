import { useEffect, useRef } from "react"
import styles from "./ChartStats.module.css"
import HighchartsReact from "highcharts-react-official"
import Highcharts, { type SeriesOptionsType } from "highcharts"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useDetectClick } from "../../utils/hooks/useDetectClick"
import { toggleStatisticsModal } from "../../utils/reducers/uiStateSlice"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { useGetChartStatiscsOptions } from "../../utils/hooks/useGetChartStatiscsOptions"

export function CharactersStatisticsModal() {
  const dispatch = useAppDispatch()
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const isStatisticsModalOpen = useAppSelector(
    state => state.uiState.isStatisticsModalOpen,
  )
  const { seriesData, chartSettings, isError, isLoading } =
    useGetChartStatiscsOptions()
  const modalRef = useRef<HTMLDivElement>(null)
  const onClose = () => dispatch(toggleStatisticsModal())
  useDetectClick(modalRef, onClose)

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.series[0].update(
        seriesData as SeriesOptionsType,
      )
    }
  }, [seriesData])

  if (!isStatisticsModalOpen || isError) return null

  if (isLoading) {
    return (
      <div className={styles.spinnerOverlay}>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartSettings}
          ref={chartComponentRef}
        />
      </div>
    </div>
  )
}
