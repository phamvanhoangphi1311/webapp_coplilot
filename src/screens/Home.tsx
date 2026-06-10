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
          <p>[CUNG CẤP SAU]</p>
          <div className="home-actions home-actions-left">
            <Button variant="primary" onClick={() => onStart("new")}>New case</Button>
            <Button onClick={() => onStart("load")}>Load case</Button>
          </div>
          <footer className="home-footnote">
            <span>CardioVis Copilot demo MVP</span>
            <span>[CUNG CẤP SAU]</span>
          </footer>
        </div>
        <div className="home-center">
          <div className="pulse-preview">
            <div className="preview-topbar">
              <span>Live console preview</span>
              <b>Ready</b>
            </div>
            <div className="preview-field">
              <span className="preview-region region-a" />
              <span className="preview-region region-b" />
              <span className="preview-region region-c" />
              <div className="preview-focus" />
            </div>
            <div className="preview-footer">
              <strong>Segmentation workspace</strong>
              <small>[CUNG CẤP SAU]</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
