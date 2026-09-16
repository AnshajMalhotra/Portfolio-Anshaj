import { useEffect, useState } from "react";

export default function QualityDemo() {
  const [sample, setSample] = useState(null);
  const [failed, setFailed] = useState(false);
  const [period, setPeriod] = useState("all");
  const [threshold, setThreshold] = useState(2);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/quality-sample.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Sample unavailable");
        return response.json();
      })
      .then(setSample)
      .catch((error) => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, []);
  if (failed) return <p className="demo-note">The sample could not load. <a href="/quality-sample.json">Open the stored sample</a> to inspect it directly.</p>;
  if (!sample) return <p className="demo-note" role="status">Loading the synthetic sample…</p>;
  const rows = sample.weekly_quality.filter((week) => period === "all" || week.week === period);
  const measurements = rows.reduce((sum, row) => sum + row.measurements, 0);
  const defects = rows.reduce((sum, row) => sum + row.defects, 0);
  const passRate = ((measurements - defects) / measurements) * 100;
  const flagged = rows.filter((row) => row.defects / row.measurements * 100 > threshold).length;
  return (
    <section className="quality-demo" aria-labelledby="quality-demo-title">
      <div className="demo-heading"><span className="sample-badge">Interactive · Synthetic data</span><h3 id="quality-demo-title">Explore the measurement sample</h3><p>Change the period and review threshold. Counts and rates are calculated from the public repository’s stored sample.</p></div>
      <div className="sample-controls">
        <label>Measurement period<select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="all">All seven weeks</option>{sample.weekly_quality.map((week) => <option value={week.week} key={week.week}>{week.week}</option>)}</select></label>
        <label>Flag weeks above {threshold.toFixed(1)}% failure<input type="range" min="0.5" max="5" step="0.5" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} aria-valuetext={`${threshold.toFixed(1)} percent failure`} /></label>
      </div>
      <div className="demo-kpis" aria-live="polite" aria-atomic="true">
        <div><strong>{measurements.toLocaleString("en-US")}</strong><span>Measurements</span></div><div><strong>{defects.toLocaleString("en-US")}</strong><span>Out of specification</span></div><div><strong>{passRate.toFixed(2)}%</strong><span>Measurement pass rate</span></div>
      </div>
      <div className="quality-chart" aria-label="Weekly measurement failure rates; each bar uses a zero to five percent scale">
        <div className="quality-chart-heading"><span>Failure rate by week</span><span>0–5% scale</span></div>
        {rows.map((row) => {
          const rate = row.defects / row.measurements * 100;
          const above = rate > threshold;
          return <div className={`quality-chart-row${above ? " needs-review" : ""}`} key={row.week}><span>{row.week.replace("2026-", "")}</span><div className="quality-chart-track"><span style={{ width: `${rate / 5 * 100}%` }} /><i style={{ left: `${threshold / 5 * 100}%` }} aria-hidden="true" /></div><strong>{rate.toFixed(2)}%</strong><span className="quality-review-label">{above ? "Review" : "Within threshold"}</span></div>;
        })}
      </div>
      <p className="quality-review-summary" role="status">{flagged} of {rows.length} {rows.length === 1 ? "week exceeds" : "weeks exceed"} the {threshold.toFixed(1)}% review threshold. Changing this threshold flags weeks; it does not change the measurements.</p>
      <details className="demo-method"><summary>How the numbers are calculated</summary><p>Measurement pass rate = (measurements − out-of-spec measurements) ÷ measurements × 100. Rates for multiple weeks use total counts, rather than averaging the weekly percentages.</p><p>The complete sample reports {sample.first_pass_yield_pct}% vehicle first-pass yield across {sample.vehicles.toLocaleString("en-US")} vehicles. Vehicle-level records are not included here, so a per-week vehicle yield cannot be calculated.</p><p>The generator intentionally models improving variation. These results are synthetic and do not represent a factory improvement. The review threshold is a demo control, not an industry standard.</p><a href="/quality-sample.json" target="_blank" rel="noreferrer">Inspect the source sample ↗</a></details>
    </section>
  );
}
