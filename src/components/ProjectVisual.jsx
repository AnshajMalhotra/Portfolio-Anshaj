const sample = [4.8, 2.85, 2.11, 1.25, 0.74, 0.67, 0.65];

export default function ProjectVisual({ id }) {
  if (id === "quality")
    return (
      <figure className="project-visual quality-visual">
        <div className="visual-top">
          <span>QUALITY / REFERENCE SAMPLE</span>
          <span>SYNTHETIC</span>
        </div>
        <div className="chart-label">
          Out-of-spec measurements <span>Weekly rate · %</span>
        </div>
        <div
          className="bar-chart"
          role="img"
          aria-label="Synthetic sample weekly failure rates: 4.8, 2.85, 2.11, 1.25, 0.74, 0.67 and 0.65 percent, weeks 31 to 37 of 2026."
        >
          {sample.map((value, i) => (
            <div className="bar-column" key={i}>
              <span>{value}%</span>
              <div style={{ height: value * 23 + "px" }} />
              <small>W{31 + i}</small>
            </div>
          ))}
        </div>
        <figcaption>Stored simulation output · 25,000 measurements</figcaption>
      </figure>
    );
  if (id === "rtls")
    return (
      <figure className="project-visual pipeline-visual">
        <div className="visual-top">
          <span>BLE / VALIDATION FLOW</span>
          <span>ILLUSTRATION</span>
        </div>
        <div className="pipeline">
          <div className="gateway-pair">
            <span>BLE GATEWAYS</span>
            <div aria-hidden="true">▥ &nbsp; ▥ &nbsp; ▥</div>
          </div>
          <span className="flow-arrow" aria-hidden="true">
            ↓
          </span>
          <div className="pipeline-node">
            MQTT <span>→</span> Node-RED
          </div>
          <div className="pipeline-processing">
            Filter · Align timestamps · Export
          </div>
          <span className="flow-arrow" aria-hidden="true">
            ↓
          </span>
          <div className="pipeline-result">
            NDJSON <span>↔</span> LiDAR-SLAM reference
          </div>
        </div>
        <figcaption>Explanatory reconstruction · No employer data</figcaption>
      </figure>
    );
  return (
    <figure className="project-visual locate-visual">
      <div className="visual-top">
        <span>LOCATE-IQ / ARCHITECTURE</span>
        <span>ILLUSTRATION</span>
      </div>
      <div className="catalog-diagram">
        <div className="catalog-chip">GATEWAYS</div>
        <div className="catalog-chip">ANCHORS</div>
        <div className="catalog-chip">TAGS</div>
        <div className="catalog-hub">
          <span className="hub-icon" aria-hidden="true">
            ⌘
          </span>
          <strong>Locate-IQ</strong>
          <span>Search · Filter · Evaluate</span>
        </div>
        <div className="catalog-store">
          REST API <span>↔</span> NocoDB
        </div>
      </div>
      <figcaption>Hardware evaluation · React + TypeScript</figcaption>
    </figure>
  );
}
