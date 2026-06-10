import { OverlayLayer } from "./OverlayLayer"

type SurgicalVideoProps = {
  overlayColor: string
  onEnded?: () => void
}

export function SurgicalVideo({ overlayColor, onEnded }: SurgicalVideoProps) {
  return (
    <div className="video-stage">
      <video className="surgery-video" src="/demo/surgery-demo.mp4" autoPlay muted playsInline onEnded={onEnded} />
      <div className="video-fallback">
        <div className="scanline" />
        <div className="surgical-field" />
      </div>
      <OverlayLayer color={overlayColor} />
    </div>
  )
}
