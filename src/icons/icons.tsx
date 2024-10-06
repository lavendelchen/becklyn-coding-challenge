import styles from "./icons.module.css"

export function LinkIcon() {
  return (
    <svg className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="192 -768 528 528">
      <path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"></path>
    </svg>
  )
}

export function LocationIcon() {
  return (
    <svg className={styles.jobInfoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="168 -864 624 768">
      <path d="M480.21-480Q510-480 531-501.21t21-51Q552-582 530.79-603t-51-21Q450-624 429-602.79t-21 51Q408-522 429.21-501t51 21ZM480-191q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323.03-227.11 245.51-339.55 168-452 168-549q0-134 89-224.5T479.5-864q133.5 0 223 90.5T792-549q0 97-77 209T480-96Zm0-456Z"></path>
    </svg>
  )
}

export function TypeIcon() {
  return (
    <svg className={styles.jobInfoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="96 -864 768 768">
      <path d="m614-310 51-51-149-149v-210h-72v240l170 170ZM480-96q-79.38 0-149.19-30T208.5-208.5Q156-261 126-330.96t-30-149.5Q96-560 126-630q30-70 82.5-122t122.46-82q69.96-30 149.5-30t149.55 30.24q70 30.24 121.79 82.08 51.78 51.84 81.99 121.92Q864-559.68 864-480q0 79.38-30 149.19T752-208.5Q700-156 629.87-126T480-96Zm0-384Zm.48 312q129.47 0 220.5-91.5Q792-351 792-480.48q0-129.47-91.02-220.5Q609.95-792 480.48-792 351-792 259.5-700.98 168-609.95 168-480.48 168-351 259.5-259.5T480.48-168Z"></path>
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="195 -693 570 426">
      <path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z"/>
    </svg>
  )
}
