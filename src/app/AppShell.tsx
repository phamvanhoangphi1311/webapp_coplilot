import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { AICopilot } from "../screens/AICopilot"
import { Evaluation } from "../screens/Evaluation"
import { Home } from "../screens/Home"
import { Planning } from "../screens/Planning"
import type { AppTab, PlanningMode } from "../data/demo"

const tabs: { id: AppTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "planning", label: "Surgical Planning" },
  { id: "copilot", label: "AI Copilot" },
  { id: "evaluation", label: "Evaluation" },
]

export function AppShell() {
  const [tab, setTab] = useState<AppTab>("home")
  const [direction, setDirection] = useState(1)
  const [mode, setMode] = useState<PlanningMode>("new")
  const [overlayColor, setOverlayColor] = useState("#e73535")
  const [copilotFullScreen, setCopilotFullScreen] = useState(true)
  const reduceMotion = useReducedMotion()

  const go = (next: AppTab) => {
    const currentIndex = tabs.findIndex((item) => item.id === tab)
    const nextIndex = tabs.findIndex((item) => item.id === next)
    setDirection(nextIndex >= currentIndex ? 1 : -1)
    setTab(next)
    setCopilotFullScreen(next === "copilot")
  }

  const startPlanning = (nextMode: PlanningMode) => {
    setMode(nextMode)
    go("planning")
  }

  return (
    <div className={`app-shell ${tab === "copilot" && copilotFullScreen ? "is-copilot-fullscreen" : ""}`}>
      <header className="tabbar">
        <div className="app-mark">
          <img src="/cardiovis-logo.png" alt="CardioVis" />
        </div>
        <nav>
          {tabs.map((item) => (
            <button key={item.id} className={item.id === tab ? "active" : ""} onClick={() => go(item.id)}>
              {item.id === tab ? <span className="tab-indicator" /> : null}
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.main
          className={`screen-host dir-${direction}`}
          key={tab}
          custom={direction}
          initial={reduceMotion ? false : { opacity: 0, x: direction * 28, scale: 0.992 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -18, scale: 0.996 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {tab === "home" ? <Home onStart={startPlanning} /> : null}
          {tab === "planning" ? (
            <Planning
              mode={mode}
              overlayColor={overlayColor}
              onModeChange={setMode}
              onOverlayColor={setOverlayColor}
              onStartCopilot={() => go("copilot")}
            />
          ) : null}
          {tab === "copilot" ? (
            <AICopilot
              activeTab={tab}
              fullScreen={copilotFullScreen}
              overlayColor={overlayColor}
              tabs={tabs}
              onCustomize={() => go("planning")}
              onEvaluation={() => go("evaluation")}
              onNavigate={go}
            />
          ) : null}
          {tab === "evaluation" ? <Evaluation /> : null}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
