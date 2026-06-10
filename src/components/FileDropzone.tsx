type FileDropzoneProps = {
  loaded: boolean
  onLoad: () => void
}

export function FileDropzone({ loaded, onLoad }: FileDropzoneProps) {
  return (
    <button type="button" className={`dropzone ${loaded ? "loaded" : ""}`} onClick={onLoad}>
      <span className="import-icon" aria-hidden="true">↥</span>
      <strong>{loaded ? "Patient file imported" : "Import patient file"}</strong>
      <small>{loaded ? "Information has been mapped into the planning form." : "Drag and drop or click to import file"}</small>
    </button>
  )
}
