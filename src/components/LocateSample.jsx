import { useState } from "react";

const devices = [
  { id: "GW-01", name: "BLE gateway", type: "Gateway", technology: "BLE", purpose: "Collects nearby tag observations" },
  { id: "AN-01", name: "UWB anchor", type: "Anchor", technology: "UWB", purpose: "Provides a fixed positioning reference" },
  { id: "TG-01", name: "BLE tag", type: "Tag", technology: "BLE", purpose: "Broadcasts a device identifier" },
  { id: "TG-02", name: "UWB tag", type: "Tag", technology: "UWB", purpose: "Participates in ranging exchanges" },
];

export default function LocateSample({ compact = false }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const visible = devices.filter((device) =>
    (category === "All" || device.type === category) &&
    `${device.name} ${device.technology} ${device.id}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className={`locate-sample${compact ? " is-compact" : ""}`}>
      <div className="locate-sample-header">
        <div><span className="sample-wordmark">Locate<span>IQ</span></span><p>Hardware explorer</p></div>
        <span className="sample-badge">Offline sample</span>
      </div>
      {!compact && <p className="demo-note">An illustrative reconstruction made for this portfolio. These four generic records demonstrate the workflow; they are not an employer catalog or product specifications.</p>}
      {!compact && (
        <div className="sample-controls">
          <label>Search sample devices<input type="search" placeholder="Try BLE or gateway…" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} /></label>
          <label>Device category<select value={category} onChange={(event) => { setCategory(event.target.value); setSelected(null); }}><option>All</option><option>Gateway</option><option>Anchor</option><option>Tag</option></select></label>
        </div>
      )}
      <div className="sample-device-grid">
        {visible.map((device) => {
          const content = <><span className="sample-device-symbol" aria-hidden="true">{device.type === "Gateway" ? "▤" : device.type === "Anchor" ? "⌖" : "◈"}</span><span className="sample-device-name">{device.name}</span><span className="sample-device-meta">{device.id} · {device.technology}</span></>;
          return compact ? <div className="sample-device" key={device.id}>{content}</div> : <button type="button" className="sample-device" key={device.id} onClick={() => setSelected(device)} aria-pressed={selected?.id === device.id}>{content}<span className="sample-device-open">View sample →</span></button>;
        })}
      </div>
      {!compact && <p className="sample-count" role="status">{visible.length} of {devices.length} sample devices{visible.length === 0 ? " — try another search or category." : ""}</p>}
      {selected && <div className="sample-detail" role="status"><strong>{selected.name} · {selected.id}</strong><p>{selected.purpose}.</p><span>Generic {selected.type.toLowerCase()} example · {selected.technology}</span></div>}
      {compact && <p className="sample-caption">Search. Compare. Inspect device details.</p>}
    </div>
  );
}
