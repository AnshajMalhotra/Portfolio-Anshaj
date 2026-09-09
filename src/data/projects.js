const github = "https://github.com/AnshajMalhotra/";
export const projects = [
  {
    id: "locate",
    number: "01",
    title: "Locate-IQ",
    subtitle: "Making RTLS hardware easier to evaluate.",
    category: "IoT / RTLS",
    filters: ["IoT / RTLS", "Data / Web"],
    status: "Employer work · Case study",
    tags: ["React", "TypeScript", "NocoDB"],
    problem:
      "Comparing gateways, anchors and tags requires device specifications to be organized in one searchable place.",
    contribution:
      "Developed a hardware catalog with search, filters and device detail views during my DynaWo internship. Connected the interface to NocoDB REST APIs.",
    implementation:
      "React, TypeScript and Tailwind frontend; NocoDB records and linked metadata, with Docker and Nginx deployment configuration.",
    validation:
      "Validated the frontend with a four-device offline sample catalog, checking search, category filtering and device detail views. The employer database, codebase and live deployment are not published here.",
    limitation:
      "This case study describes employer work. The card diagram is a simplified architecture illustration. The screenshot uses offline sample records and contains no employer database export.",
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
    title: "Fuel-cell monitoring PCB",
    image: "/projects/pcb.webp",
    imageAlt: "KiCad 3D view of the fuel-cell monitoring PCB",
    imageCaption: "PCB DESIGN",
    category: "Embedded / Test",
    description:
      "Custom fuel-cell monitoring PCB with KiCad schematics for measurement, signal isolation and ESP32-S3 integration. Academic hardware prototype.",
    repo: github + "Fuel-Cell-Monitoring-",
  },
  {
    title: "FreeRTOS event-group lab",
    imageCaption: "FREERTOS / LEARNING LAB",
    category: "Embedded / Test",
    description:
      "ESP-IDF tasks, event bits and synchronization, explored through a compact FreeRTOS firmware learning exercise.",
    repo: github + "Tech-Stack--FREERTOS",
  },
  {
    title: "CIFAR-10 image classifier",
    image: "/projects/cifar.webp",
    imageAlt: "Examples of the ten CIFAR-10 image classes",
    imageCaption: "DATASET EXAMPLES",
    category: "Data / Web",
    description:
      "An image-classification workflow combining Streamlit uploads, ONNX inference and MATLAB integration. Academic prototype.",
    repo: github + "Cifar_10_python",
  },
  {
    title: "Zhhoop bike-pooling app",
    category: "Product / Design",
    image: "/projects/zhhoop.webp",
    imageAlt: "Zhhoop ride-sharing app identity",
    imageCaption: "STARTUP CONCEPT",
    description:
      "A campus bike-pooling concept shaped through student research, solution design and pitching with a four-person team.",
    details:
      "Zhhoop explored fixed-destination ride sharing for campus commutes. My work covered problem research, product positioning and pitching. The project received AICTE seed funding as reported in my records. The visual is project branding; no public live app or verified user-count claim is offered here.",
  },
  {
    title: "Cineplex / CINE_FUN",
    category: "Data / Web",
    image: "/projects/cineplex.webp",
    imageAlt: "Console views from the Cineplex booking and management project",
    imageCaption: "APPLICATION SCREENSHOTS",
    description:
      "A cinema booking and management application with admin and user modes, seat selection and pricing workflows.",
    repo: github + "Cineplex-Management-System",
  },
  {
    title: "Efficycle · CAD & CAE",
    category: "Product / Design",
    image: "/projects/efficycle.webp",
    imageAlt: "GS Racers team vehicle at Efficycle",
    imageCaption: "TEAM GS RACERS",
    description:
      "Transmission design and manufacturing with GS Racers. Best Project Plan team award and reported All-India Rank 5.",
    repo: "https://www.linkedin.com/posts/anshaj-malhotra-19023514a_teamgsracers-activity-6803117842733633536-Yhso",
    actionLabel: "View project post",
  },
];
