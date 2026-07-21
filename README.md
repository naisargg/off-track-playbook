# The Off-Track Playbook

Seven studies in Formula 1 business operations — a capstone portfolio on how an F1
team makes money off-track. Built from publicly available information only; all
financial figures are third-party estimates unless a company disclosed them.

**Live:** https://naisargg.github.io/off-track-playbook/

## The seven studies

| # | Study | Function | Status |
|---|-------|----------|--------|
| 1 | [Sponsorship Activation Audit & ROI Dashboard — Ferrari × HP](projects/sponsorship-roi.html) | Commercial Partnerships | **Flagship** — interactive 4-layer dashboard + Italian executive summary |
| 2 | [Sea-Freight Transition Simulator](projects/sea-freight.html) | Logistics & Supply Chain | Interactive — 17 toggleable freight legs, 3 strategy presets |
| 3 | [Net Zero Progress Tracker](projects/net-zero.html) | ESG & Sustainability | Interactive — category scorecard + 2030 scenario projection |
| 4 | [Merchandise & Collab Strategy Teardown](projects/merch-collabs.html) | Licensing & Merchandise | Analysis — positioning map + 3 collab proposals + pop-up forecasting |
| 5 | [Paddock Club Exclusivity Redesign](projects/paddock-club.html) | Trackside Hospitality | Concept — access matrix + matchmaking demo |
| 6 | [Grid Sponsorship Atlas](projects/sponsorship-atlas.html) | Commercial Partnerships, grid-wide | Interactive — tenure timeline, category matrix, team selector |
| 7 | [Know RACE — Ferrari as a Company](projects/know-race.html) | Corporate briefing | FY2024 financials, revenue mix, electrification, interview drill |

## Structure

- `index.html` — landing page (title-deal chart, study tiles)
- `projects/` — one page per study, interactive components in vanilla JS
- `research/` — source-cited research notes feeding the studies
- `assets/` — shared design system (Cipher-style node-frame, components)

Plain static HTML/CSS/JS, no build step — deployed on GitHub Pages.

## Method

Public data only: press releases, company channels, trade press (BlackBook
Motorsport, SportsPro), Relo Metrics / Ampere public reports, F1 published
sustainability reporting. Every estimate is labeled as an estimate.
