import type { ReactNode } from "react"

type ModalProps = {
  children: ReactNode
  wide?: boolean
  onClose: () => void
}

export function Modal({ children, wide, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className={`modal-card ${wide ? "wide" : ""}`} onMouseDown={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
