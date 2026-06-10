import { ArrowRight } from "lucide-react"
import { Button } from "../components/Button"
import type { PlanningMode } from "../data/demo"

type HomeProps = {
  onStart: (mode: PlanningMode) => void
}

export function Home({ onStart }: HomeProps) {
  return (
    <section className="screen home-screen">
      <div className="brand-panel">
        <div className="brand-copy">
          <p className="eyebrow">CardioVis Copilot</p>
          <h1>AI guidance for the surgical console.</h1>
          <p>Plan the case, calibrate segmentation overlays, and generate post-surgery reports from one focused operating-room workspace.</p>
          <div className="home-actions home-actions-left">
            <Button variant="primary" className="btn-with-arrow" onClick={() => onStart("new")}>
              New case
              <i aria-hidden="true"><ArrowRight size={16} strokeWidth={2.25} /></i>
            </Button>
            <Button onClick={() => onStart("load")}>Load case</Button>
          </div>
          <footer className="home-footnote">
            <span>CardioVis Copilot demo MVP</span>
            <span>Built for surgical planning and AI-assisted review</span>
          </footer>
        </div>
        <div className="home-center">
          <div className="pulse-preview">
            <div className="preview-topbar">
              <span>Surgical console preview</span>
              <b>Case ready</b>
            </div>
            <div className="preview-field">
              <span className="preview-region region-a" />
              <span className="preview-region region-b" />
              <span className="preview-region region-c" />
              <div className="preview-focus" />
            </div>
            <div className="preview-footer">
              <strong>Segmentation workspace</strong>
              <small>Planning to AI Copilot</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
