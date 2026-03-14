import styles from './confirm.toast.module.css'

export type ConfirmModalProps = {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function ConfirmModal({
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: ConfirmModalProps) {

  return (
    <div className={styles.modal}>
      <h3 className='text-danger'>{title}</h3>

      <p>{message}</p>

      <div className={styles.modalActions}>
        <button onClick={onCancel} className='btn btn-outline-danger'>
          {cancelText}
        </button>

        <button onClick={onConfirm} className='btn btn-success'>
          {confirmText}
        </button>
      </div>
    </div>
  )
}
