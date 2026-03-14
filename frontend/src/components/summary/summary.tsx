import styles from './summary.module.css'

export function SummaryContainer({ children }: { children: React.ReactNode }) {
  return (
    <ul className={styles.summary}>
      {children}
    </ul>
  )
}