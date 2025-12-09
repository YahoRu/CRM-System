import styles from './Tab.module.scss'

export default function Tab({ children, ...props }) {
  return (
    <div role='tablist' className={styles.tablist} {...props}>
      {children}
    </div>
  )
}
