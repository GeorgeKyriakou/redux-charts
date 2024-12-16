import styles from "./LoadingSpinner.module.css"

export const LoadingSpinner = () => {
  return (
    <div className={styles.ldsCircle}>
      <div></div>
    </div>
  )
}
