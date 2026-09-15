const modulePaths = [
  "M993 92 C1044 97 1132 88 1275 94 Q1292 116 1290 211 C1210 206 1095 215 998 209 Q986 151 993 92 Z",
  "M855 314 C927 322 1010 309 1092 314 Q1101 363 1094 432 C1021 427 920 437 858 429 Q848 375 855 314 Z",
  "M1032 546 C1110 552 1215 539 1314 547 Q1321 601 1315 670 C1224 664 1116 677 1034 667 Q1024 610 1032 546 Z",
];

const mobileModulePaths = [
  "M244 94 Q297 99 361 94 Q367 139 362 217 C324 211 277 220 243 214 Q238 153 244 94 Z",
  "M207 340 Q277 345 352 340 Q358 389 350 460 C305 455 248 467 210 456 Q202 399 207 340 Z",
  "M251 588 Q307 594 372 587 Q377 640 370 717 C329 710 280 723 254 713 Q246 655 251 588 Z",
];

export default function ConnectivityBackdrop() {
  return (
    <div className="connectivity-backdrop" aria-hidden="true">
      <svg className="connectivity-desktop" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          {modulePaths.map((path) => <path key={path} d={path} />)}
          <path d="M1116 210 C1125 253 1050 254 1051 314 M973 430 C970 478 1148 483 1164 547 M1168 671 C1173 735 1006 758 785 778" />
          <path d="M1071 149 L1130 149 M1101 121 L1101 179 M922 372 L974 372 M949 344 L949 402 M1134 603 C1158 568 1193 581 1204 610 C1199 636 1164 650 1140 624" />
          <path d="M997 209 C963 228 955 239 971 258 M856 429 C825 448 823 458 835 471 M1034 667 C998 683 987 696 999 712" strokeWidth="2" opacity=".55" />
        </g>
        <g className="connectivity-points" fill="var(--accent)">
          <circle cx="1051" cy="280" r="7" />
          <circle cx="1061" cy="483" r="7" />
          <circle cx="1055" cy="756" r="7" />
        </g>
      </svg>
      <svg className="connectivity-mobile" viewBox="0 0 390 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          {mobileModulePaths.map((path) => <path key={path} d={path} />)}
          <path d="M300 215 C310 267 236 280 250 341 M274 460 C268 523 350 527 325 588 M312 717 C310 790 188 814 80 829" />
          <path d="M274 151 L326 151 M300 126 L300 177 M249 400 L307 400 M277 372 L277 429 M285 645 C298 626 325 630 331 655 C327 680 300 690 285 668" />
        </g>
        <g className="connectivity-points" fill="var(--accent)">
          <circle cx="261" cy="287" r="6" />
          <circle cx="309" cy="530" r="6" />
          <circle cx="241" cy="800" r="6" />
        </g>
      </svg>
    </div>
  );
}
