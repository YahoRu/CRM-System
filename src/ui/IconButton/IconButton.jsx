import { COLOR_PALETTE } from '../colors'
import styles from './IconButton.module.scss'

export default function IconButton({ children, colorPaletteKey, ...props }) {
  const backgroundColor =
    COLOR_PALETTE[colorPaletteKey] || COLOR_PALETTE.primary

  return (
    <button style={{ backgroundColor }} className={styles.btn} {...props}>
      {children}
    </button>
  )
}
