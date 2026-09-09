const github = "https://github.com/AnshajMalhotra/";
export const projects = [
  {
    id: "locate",
    number: "01",
    title: "Locate-IQ",
    subtitle: "Making RTLS hardware easier to evaluate.",
    category: "IoT / RTLS",
    filters: ["IoT / RTLS", "Data / Web"],
    status: "Employer work · Public source",
    tags: ["React", "TypeScript", "NocoDB"],
    problem:
      "Comparing gateways, anchors and tags requires device specifications to be organized in one searchable place.",
    contribution:
      "Developed a hardware catalog with search, filters and device detail views during my DynaWo internship. Connected the interface to NocoDB REST APIs.",
    implementation:
      "React, TypeScript and Tailwind frontend; NocoDB records and linked metadata. The repository includes a Docker build and Nginx configuration.",
    validation:
      "Ran the public frontend locally with its four-device sample catalog and checked search, category filtering and device detail views. The screenshot shows that offline interface. The employer database and live deployment are not reproduced here.",
    limitation:
      "This case study describes employer work. The card diagram is a simplified architecture illustration. The screenshot uses repository sample records and an explicitly offline status label; it contains no employer database export.",
    repo: github + "Locate-IQ",
    evidence: github + "Locate-IQ/blob/main/src/App.tsx",
    evidenceLabel: "Inspect catalog implementation",
  },
  {
    id: "rtls",
    number: "02",
    title: "BLE / RTLS validation",
    subtitle: "From gateway messages to comparable trajectories.",
    category: "IoT / RTLS",
    filters: ["IoT / RTLS", "Embedded / Test"],
    status: "Employer work · Case study",
    tags: ["MQTT", "Node-RED", "RSSI"],
    problem:
      "Multi-gateway BLE observations need consistent filtering and timestamps before localization behavior can be compared with reference trajectories.",
    contribution:
      "Built MQTT/Node-RED data preparation pipelines and supported RSSI Location Engine testing at DynaWo. Prepared NDJSON output and compared behavior with LiDAR-SLAM reference data.",
    implementation:
      "BLE gateway ingestion → filtering → timestamp processing → NDJSON export → localization comparison. Hardware evaluation and documentation supported the testing work.",
    validation:
      "The output was structured localization-test data for comparison. No numerical accuracy improvement is claimed because an approved measurement baseline is unavailable.",
    limitation:
      "Employer code and datasets remain private. The flow shown here is an explanatory reconstruction, with no live telemetry or public demo.",
  },
  {
    id: "quality",
    number: "03",
    title: "Automotive measurement analytics",
    subtitle: "Turning measurement events into quality indicators.",
    category: "Data / Web",
    filters: ["Data / Web"],
    status: "Independent prototype · Synthetic data",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    problem:
      "Measurement-level pass rates and vehicle-level first-pass yield answer different quality questions. A useful analysis needs both.",
    contribution:
      "Created an independent manufacturing-data project with a synthetic measurement generator, ingestion API, PostgreSQL views and a Python quality summary.",
    implementation:
      "Python generator, Node-RED validation, FastAPI and PostgreSQL. Power BI DAX and Power Query documentation are included; a finished Power BI report is not claimed.",
    validation:
      "The repository sample summarizes 25,000 synthetic measurements across 3,572 vehicles: 498 out-of-spec measurements, 98.01% measurement pass rate and 86.93% vehicle first-pass yield. The chart displays that stored sample, not a live system.",
    limitation:
      "Independent project, not commissioned or endorsed by Mercedes-Benz or another manufacturer. The generator models improving variation intentionally; the trend is not a measured factory improvement. Full API/database deployment is not verified in this preview.",
    repo:
      github + "Automotive-Quality-Intelligence-Measurement-Analytics-Platform",
    evidence: "/quality-sample.json",
    evidenceLabel: "Read synthetic sample output",
  },
];

export const secondaryProjects = [
  {
    title: "Fuel-cell monitoring board",
    category: "Embedded / Test",
    description:
      "Academic hardware prototype. Public evidence includes KiCad PCB and schematic files; firmware and end-to-end cloud monitoring are not verified in this repository.",
    repo: github + "Fuel-Cell-Monitoring-",
  },
  {
    title: "FreeRTOS event-group lab",
    category: "Embedded / Test",
    description:
      "Learning exercise with ESP-IDF tasks, event bits and a blink example. Source available; no hardware test is claimed here.",
    repo: github + "Tech-Stack--FREERTOS",
  },
  {
    title: "CIFAR-10 image classifier",
    category: "Data / Web",
    description:
      "Academic prototype with a Streamlit upload interface and ONNX inference. Model files and MATLAB integration code are available; no new accuracy claim.",
    repo: github + "Cifar_10_python",
  },
];
