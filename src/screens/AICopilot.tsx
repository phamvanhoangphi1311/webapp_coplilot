import { useState } from "react"
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { SurgicalVideo } from "../components/SurgicalVideo"
import { surgicalTimeline, type AppTab } from "../data/demo"

type AICopilotProps = {
  activeTab: AppTab
  fullScreen: boolean
  overlayColor: string
  tabs: { id: AppTab; label: string }[]
  onCustomize: () => void
  onEvaluation: () => void
  onNavigate: (tab: AppTab) => void
}

export function AICopilot({ activeTab, fullScreen, overlayColor, tabs, onCustomize, onEvaluation, onNavigate }: AICopilotProps) {
  const [panel, setPanel] = useState(false)
  const [menu, setMenu] = useState(false)
  const [done, setDone] = useState(false)

  return (
    <section className={`screen copilot-screen ${panel ? "panel-mode" : ""} ${fullScreen ? "full-video-mode" : ""}`}>
      <aside className="surgical-side">
        <p className="eyebrow">Surgical plan</p>
        <h2>Timeline Planning</h2>
        {surgicalTimeline.map((item) => (
          <div className="side-item" key={item.time}>
            <span className="side-dot" />
            <div>
              <b>{item.time}</b>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </div>
          </div>
        ))}
      </aside>
      <div className="copilot-main">
        <div className={`copilot-left-controls ${menu ? "menu-open" : ""}`}>
          <button className="hamburger" onClick={() => setMenu((next) => !next)} aria-label="Open AI Copilot menu" aria-expanded={menu}>
            <Menu size={20} strokeWidth={2.4} />
          </button>
          <button className={`panel-fab ${panel ? "on" : ""}`} type="button" onClick={() => setPanel((next) => !next)} aria-label={panel ? "Hide planning panel" : "Show planning panel"}>
            {panel ? <PanelLeftClose size={19} strokeWidth={2.3} /> : <PanelLeftOpen size={19} strokeWidth={2.3} />}
          </button>
        </div>
        <div className={`copilot-menu ${menu ? "open" : ""}`}>
          <div className="copilot-menu-brand">
            <i aria-hidden="true" />
            <span>AI Copilot</span>
          </div>
          <div className="copilot-menu-tabs">
            {tabs.map((item) => (
              <button
                key={item.id}
                className={item.id === activeTab ? "active" : ""}
                type="button"
                onClick={() => {
                  setMenu(false)
                  onNavigate(item.id)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="copilot-menu-actions">
            <button type="button" onClick={onCustomize}>Customize overlay</button>
            <button type="button" onClick={() => setDone(true)}>End surgery</button>
          </div>
        </div>
        <SurgicalVideo overlayColor={overlayColor} onEnded={() => setDone(true)} />
      </div>
      {done ? (
        <Modal onClose={() => setDone(false)}>
          <button className="modal-close" onClick={() => setDone(false)}>×</button>
          <p className="eyebrow">Surgery complete</p>
          <h2>Post-surgery reports are ready to generate.</h2>
          <div className="post-surgery-row">
            <span>Educational pilot teaching</span>
            <span>Summarizing surgical note (post-surgery)</span>
            <span>Evaluating error & quality assurance</span>
          </div>
          <div className="modal-actions">
            <Button variant="primary" onClick={onEvaluation}>Go to Evaluation</Button>
          </div>
        </Modal>
      ) : null}
    </section>
  )
}
