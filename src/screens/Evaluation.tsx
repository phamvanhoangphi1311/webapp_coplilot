import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { reports, type Report } from "../data/demo"

function ReportColumn({ report, onView }: { report: Report; onView: () => void }) {
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const started = performance.now()
    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - started
      setProgress(Math.min(100, Math.round((elapsed / report.duration) * 100)))
    }, 160)
    const statusTimer = window.setInterval(() => {
      setStatusIndex((index) => (index + 1) % report.toolStatuses.length)
    }, 1550)
    return () => {
      window.clearInterval(progressTimer)
      window.clearInterval(statusTimer)
    }
  }, [report.duration, report.toolStatuses.length])

  const complete = progress >= 100

  return (
    <article className={`report-column ${complete ? "complete" : ""}`}>
      <div className="report-title-block">
        <span>{complete ? "Ready" : "Generating"}</span>
        <h2>{report.title}</h2>
      </div>
      {!complete ? (
        <div className="report-progress">
          <span className="tool-dots"><i /><i /><i /></span>
          <p>{report.toolStatuses[statusIndex]}</p>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <b>{progress}%</b>
        </div>
      ) : (
        <div className="report-ready">
          <p>{report.detail}</p>
          <div className="report-actions">
            <a className="btn btn-secondary" href="/demo/sample_report.pdf" download><span>Download PDF</span></a>
            <Button variant="primary" onClick={onView}>View PDF</Button>
          </div>
        </div>
      )}
    </article>
  )
}

export function Evaluation() {
  const [pdfOpen, setPdfOpen] = useState(false)

  return (
    <section className="screen evaluation-screen">
      <div className="screen-header">
        <div>
          <p className="eyebrow">Evaluation</p>
          <h1>Post-surgery report generation</h1>
        </div>
      </div>
      <div className="reports-grid">
        {reports.map((report) => <ReportColumn key={report.id} report={report} onView={() => setPdfOpen(true)} />)}
      </div>
      {pdfOpen ? (
        <Modal wide onClose={() => setPdfOpen(false)}>
          <button className="modal-close" onClick={() => setPdfOpen(false)}>×</button>
          <h2>Sample report PDF</h2>
          <iframe className="pdf-frame" src="/demo/sample_report.pdf" title="Sample report PDF" />
        </Modal>
      ) : null}
    </section>
  )
}
