import styles from './Logo.module.css'

function Logo({ size = 44 }) {
  return (
    <svg
      className={styles.logo}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <rect className={styles.badge} width="48" height="48" rx="12" />
      {/* seta de cima: vai para a direita */}
      <path className={styles.arrow} d="M13 18h20m-6-6 6 6-6 6" />
      {/* seta de baixo: volta para a esquerda */}
      <path className={styles.arrowSoft} d="M35 30H15m6-6-6 6 6 6" />
    </svg>
  )
}

export default Logo