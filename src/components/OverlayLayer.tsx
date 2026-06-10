import { overlayRegions } from "../data/demo"

type OverlayLayerProps = {
  color: string
  compact?: boolean
}

export function OverlayLayer({ color, compact }: OverlayLayerProps) {
  return (
    <svg className={`overlay-layer ${compact ? "compact" : ""}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {overlayRegions.map((region, index) => (
        <g key={region.id} style={{ animationDelay: `${index * 180}ms` }}>
          <polygon points={region.points} fill={color} stroke={color} />
          <polyline points={`${region.points} ${region.points.split(" ")[0]}`} fill="none" stroke={color} />
          {!compact ? (
            <text x={region.points.split(",")[0]} y={Number(region.points.split(",")[1]?.split(" ")[0]) - 3 || 30}>
              {region.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  )
}
