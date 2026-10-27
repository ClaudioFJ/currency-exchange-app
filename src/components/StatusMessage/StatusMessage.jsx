import styles from './StatusMessage.module.css'

function StatusMessage({ type = 'empty', message }) {
  return (
    <p
      className={`${styles.message} ${styles[type]}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {message}
    </p>
  )
}

export default StatusMessage