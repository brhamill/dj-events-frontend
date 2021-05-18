import { useState, useEffect, FormEvent } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'
import { FunctionComponent } from 'react-dom/node_modules/@types/react'

type Props = {
  show: boolean
  onClose: () => void
  children: any
  title?: string
}

export const Modal: FunctionComponent<Props> = ({
  show,
  onClose,
  children,
  title,
}) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true), [])

  const handleClose = (e: FormEvent) => {
    e.preventDefault()
    onClose()
  }
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    )
  } else {
    return null
  }
}

// https://devrecipes.net/modal-component-with-next-js/
