import { useEffect, useRef, useState } from "react"

type DropdownProps = {
  label: string
  value?: string
  options: string[]
  required?: boolean
  onChange: (value: string) => void
}

export function Dropdown({ label, value, options, required, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return (
    <div className="field dropdown" ref={ref}>
      <label>
        {label}
        {required ? <span>*</span> : null}
      </label>
      <button type="button" className={`dropdown-trigger ${open ? "is-open" : ""}`} onClick={() => setOpen((next) => !next)}>
        <span>{value || "Select information"}</span>
        <i aria-hidden="true" />
      </button>
      <div className={`dropdown-menu ${open ? "is-open" : ""}`}>
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={option === value ? "selected" : ""}
            onClick={() => {
              onChange(option)
              setOpen(false)
            }}
          >
            <span>{option}</span>
            {option === value ? <b aria-hidden="true">✓</b> : null}
          </button>
        ))}
      </div>
    </div>
  )
}
