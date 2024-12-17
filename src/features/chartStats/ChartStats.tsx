import { useRef } from "react"
import styles from "./ChartStats.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useDetectClick } from "../../utils/hooks/useDetectClick"
import { toggleStatisticsModal } from "../../utils/reducers/uiStateSlice"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"

import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useGetChartStatiscsOptions } from "../../utils/hooks/useGetChartStatiscsOptions"

export function CharactersStatisticsModal() {
  const dispatch = useAppDispatch()
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const isStatisticsModalOpen = useAppSelector(
    state => state.uiState.isStatisticsModalOpen,
  )
  const { options, isError, isLoading } = useGetChartStatiscsOptions()
  const modalRef = useRef<HTMLDivElement>(null)
  const onClose = () => dispatch(toggleStatisticsModal())
  useDetectClick(modalRef, onClose)

  if (!isStatisticsModalOpen || isError) return null

  if (isLoading) {
    return (
      <div className={styles.modalOverlay}>
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
          options={options}
          ref={chartComponentRef}
        />
      </div>
    </div>
  )
}
