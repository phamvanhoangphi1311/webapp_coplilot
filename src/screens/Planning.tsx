import { useMemo, useState } from "react"
import { Button } from "../components/Button"
import { Dropdown } from "../components/Dropdown"
import { FileDropzone } from "../components/FileDropzone"
import { Modal } from "../components/Modal"
import { OverlayLayer } from "../components/OverlayLayer"
import { loadedPatientFields, planningFields, surgicalTimeline, swatches, type PlanningField, type PlanningMode } from "../data/demo"

type PlanningProps = {
  mode: PlanningMode
  overlayColor: string
  onModeChange: (mode: PlanningMode) => void
  onOverlayColor: (color: string) => void
  onStartCopilot: () => void
}

export function Planning({ mode, overlayColor, onModeChange, onOverlayColor, onStartCopilot }: PlanningProps) {
  const [loaded, setLoaded] = useState(mode === "load")
  const [fields, setFields] = useState<PlanningField[]>(mode === "load" ? loadedPatientFields : planningFields)
  const [timelineReady, setTimelineReady] = useState(mode === "load")
  const [calibrating, setCalibrating] = useState(false)
  const [popup, setPopup] = useState<"success" | "customize" | null>(null)

  const complete = useMemo(() => fields.every((field) => !field.required || field.value), [fields])

  const switchMode = (nextMode: PlanningMode) => {
    setLoaded(nextMode === "load")
    setFields(nextMode === "load" ? loadedPatientFields : planningFields)
    setTimelineReady(nextMode === "load")
    onModeChange(nextMode)
  }

  const updateField = (id: string, value: string) => {
    setFields((items) => items.map((field) => (field.id === id ? { ...field, value } : field)))
  }

  const importFile = () => {
    setLoaded(true)
    setFields(loadedPatientFields)
    setTimelineReady(false)
    window.setTimeout(() => setTimelineReady(true), 900)
  }

  const calibrate = () => {
    setCalibrating(true)
    window.setTimeout(() => {
      setCalibrating(false)
      setPopup("success")
    }, 2300)
  }

  return (
    <section className="screen planning-screen">
      <div className="screen-header">
        <div>
          <p className="eyebrow">Surgical Planning</p>
          <h1>{mode === "new" ? "New planning workspace" : "Load patient workspace"}</h1>
        </div>
        <button className="mode-link" type="button" onClick={() => switchMode(mode === "new" ? "load" : "new")}>
          Switch to {mode === "new" ? "Load" : "New"}
        </button>
      </div>

      <div className={`planning-grid ${mode === "load" ? "with-import" : ""}`}>
        {mode === "load" ? <FileDropzone loaded={loaded} onLoad={importFile} /> : null}
        <div className={`form-panel ${mode === "load" && !loaded ? "muted-panel" : ""}`}>
          <div className="form-grid">
            {fields.map((field) => (
              <Dropdown key={field.id} label={field.label} required={field.required} value={field.value} options={field.options} onChange={(value) => updateField(field.id, value)} />
            ))}
          </div>
          <div className="form-actions">
            <Button>Save Draft</Button>
            <Button variant="primary" loading={calibrating} disabled={!complete} onClick={calibrate}>Save and Calibration</Button>
          </div>
          {!complete ? <p className="hint">Complete required fields to start calibration.</p> : null}
          {mode === "load" && loaded ? (
            <div className={`timeline ${timelineReady ? "ready" : ""}`}>
              <div className="timeline-head">
                <strong>Surgical Timeline Planning</strong>
                {!timelineReady ? <span>Predicting...</span> : <span>Ready</span>}
              </div>
              <div className="timeline-axis">
                {surgicalTimeline.map((item, index) => (
                  <div className={`timeline-item ${index % 2 === 0 ? "top" : "bottom"}`} key={item.time} style={{ transitionDelay: `${index * 90}ms` }}>
                    <div className="timeline-copy">
                      <b>{item.time}</b>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </div>
                    <span className="timeline-pin" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {calibrating ? (
        <div className="calibration-float">
          <span className="orbital" />
          <strong>Predicting and calibrating overlay model</strong>
        </div>
      ) : null}

      {popup === "success" ? (
        <Modal onClose={() => setPopup(null)}>
          <button className="modal-close" onClick={() => setPopup(null)}>×</button>
          <p className="eyebrow">Calibration complete</p>
          <h2>Planning and calibration finished successfully.</h2>
          <p className="modal-text">The case is ready for overlay configuration or direct AI Copilot start.</p>
          <div className="modal-actions">
            <Button onClick={() => setPopup("customize")}>Customize</Button>
            <Button variant="primary" onClick={onStartCopilot}>Start AI Copilot</Button>
          </div>
        </Modal>
      ) : null}

      {popup === "customize" ? (
        <Modal wide onClose={() => setPopup("success")}>
          <div className="customize-head">
            <div>
              <p className="eyebrow">Customize overlay</p>
              <h2>Overlay settings</h2>
              <p>Changes apply live to the AI Copilot segmentation layer.</p>
            </div>
            <button className="modal-close" onClick={() => setPopup("success")}>×</button>
          </div>
          <div className="setting-card">
            <div>
              <strong>Overlay color</strong>
              <small>Controls stroke and fill tint for detected regions.</small>
            </div>
            <div className="swatches">
              {swatches.map((color) => (
                <button key={color} className={color === overlayColor ? "active" : ""} style={{ background: color }} onClick={() => onOverlayColor(color)} aria-label={color} />
              ))}
              <input value={overlayColor} onChange={(event) => onOverlayColor(event.target.value)} />
            </div>
            <div className="setting-preview">
              <OverlayLayer color={overlayColor} compact />
            </div>
          </div>
          {[1, 2].map((index) => (
            <div className="setting-card placeholder-setting" key={index}>
              <div><strong>[CUNG CẤP SAU]</strong><small>[CUNG CẤP SAU]</small></div>
              <div className="placeholder-control">[CUNG CẤP SAU]</div>
              <div className="setting-preview"><OverlayLayer color={overlayColor} compact /></div>
            </div>
          ))}
          <div className="modal-actions">
            <Button onClick={() => setPopup("success")}>Back</Button>
            <Button variant="primary" onClick={onStartCopilot}>Start AI Copilot</Button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}
