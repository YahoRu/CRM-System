import { COLOR_PALETTE } from '../colors'
import styles from './Button.module.scss'

export default function Button({ children, colorPaletteKey, ...props }) {
  const backgroundColor =
    COLOR_PALETTE[colorPaletteKey] || COLOR_PALETTE.primary

  return (
    <button style={{ backgroundColor }} className={styles.btnAdd} {...props}>
      {children}
    </button>
  )
}
