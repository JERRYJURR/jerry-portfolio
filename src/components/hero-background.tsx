/**
 * Always-on ambient gradient mesh that sits behind the hero content.
 * Two oklab blobs (warm + cool) blurred 80px, drifting on the same 20s
 * loop as the case-study idle drift (180° phase offset). A radial-gradient
 * mask fades the mesh out into the page background. Reduced-motion
 * automatically pauses the drift via the .drift-a/.drift-b keyframe rules
 * in globals.css.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-0 overflow-hidden -z-10
        [mask-image:radial-gradient(ellipse_60%_70%_at_center,black_0%,transparent_85%)]
        [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_center,black_0%,transparent_85%)]
      "
    >
      {/* Blob A · warm · top-left */}
      <div
        className="drift-a absolute -top-[20%] -left-[15%] h-[80%] w-[60%] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, oklab(72.2% 0.107 0.081) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Blob B · cool · bottom-right */}
      <div
        className="drift-b absolute -bottom-[20%] -right-[15%] h-[80%] w-[60%] rounded-full opacity-[0.13]"
        style={{
          background:
            "radial-gradient(circle, oklab(46.4% 0.005 -0.168) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
