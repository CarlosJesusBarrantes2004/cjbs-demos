
function IcoSeal() {
  return (
    <svg viewBox="0 0 100 100" className="seal">
      <path id="curve" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
      <text fontSize="10" fill="currentColor" fontWeight="bold" letterSpacing="4">
        <textPath href="#curve" startOffset="0%">CAFÉ AROMAS • 100% ARTESANAL •</textPath>
      </text>
      <circle cx="50" cy="50" r="14" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
