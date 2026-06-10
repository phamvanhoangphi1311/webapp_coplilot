export type AppTab = "home" | "planning" | "copilot" | "evaluation"
export type PlanningMode = "new" | "load"

export type PlanningField = {
  id: string
  label: string
  required?: boolean
  value?: string
  options: string[]
}

export type TimelineItem = {
  time: string
  title: string
  detail: string
}

export type OverlayRegion = {
  id: string
  label: string
  points: string
}

export type Report = {
  id: string
  title: string
  duration: number
  detail: string
  toolStatuses: string[]
}

const options = ["Info 1", "Info 2", "Info 3"]

export const planningFields: PlanningField[] = [
  { id: "patient", label: "Patient profile", required: true, options },
  { id: "procedure", label: "Procedure plan", required: true, options },
  { id: "imaging", label: "Imaging package", required: true, options },
  { id: "risk", label: "Risk notes", options },
  { id: "team", label: "Surgical team", options },
  { id: "device", label: "Device setup", options },
]

export const loadedPatientFields: PlanningField[] = planningFields.map((field, index) => ({
  ...field,
  value: options[index % options.length],
}))

export const surgicalTimeline: TimelineItem[] = [
  { time: "00:00", title: "[CUNG CẤP SAU]", detail: "Patient context lock." },
  { time: "04:30", title: "[CUNG CẤP SAU]", detail: "Imaging alignment." },
  { time: "08:30", title: "[CUNG CẤP SAU]", detail: "Calibration window." },
  { time: "13:10", title: "[CUNG CẤP SAU]", detail: "AI overlay checkpoint." },
  { time: "17:45", title: "[CUNG CẤP SAU]", detail: "Planning verification." },
  { time: "24:20", title: "[CUNG CẤP SAU]", detail: "Procedure milestone." },
  { time: "31:10", title: "[CUNG CẤP SAU]", detail: "Quality assurance." },
  { time: "38:00", title: "[CUNG CẤP SAU]", detail: "Post-surgery handoff." },
]

export const overlayRegions: OverlayRegion[] = [
  { id: "r1", label: "[CUNG CẤP SAU]", points: "35,34 55,28 72,42 68,62 46,67 29,52" },
  { id: "r2", label: "[CUNG CẤP SAU]", points: "51,50 77,53 86,73 69,86 45,80 39,63" },
  { id: "r3", label: "[CUNG CẤP SAU]", points: "18,62 36,54 48,73 39,90 18,86 9,73" },
]

export const reports: Report[] = [
  {
    id: "education",
    title: "Educational pilot teaching",
    duration: 14500,
    detail: "[CUNG CẤP SAU] Teaching summary placeholder for the pilot workflow.",
    toolStatuses: [
      "Loading teaching rubric tool",
      "Mapping key surgical moments",
      "Extracting decision points",
      "Drafting pilot lesson notes",
      "Formatting education PDF",
    ],
  },
  {
    id: "note",
    title: "Summarizing surgical note (post-surgery)",
    duration: 20500,
    detail: "[CUNG CẤP SAU] Post-surgery note placeholder generated from the case.",
    toolStatuses: [
      "Calling surgical-note composer",
      "Reading planning timeline",
      "Structuring operative narrative",
      "Checking note completeness",
      "Rendering post-surgery PDF",
    ],
  },
  {
    id: "qa",
    title: "Evaluating error & quality assurance",
    duration: 17800,
    detail: "[CUNG CẤP SAU] Error and quality assurance placeholder.",
    toolStatuses: [
      "Starting QA analyzer tool",
      "Scanning overlay confidence",
      "Comparing quality checkpoints",
      "Scoring potential deviations",
      "Packaging QA report PDF",
    ],
  },
]

export const swatches = ["#e73535", "#f05a48", "#ff7a1a", "#1f9a6a", "#2563eb", "#931717"]
