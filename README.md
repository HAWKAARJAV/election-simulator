# One Nation One Election — Election Synchronization Feasibility & Impact Simulator

Interactive web application to explore the feasibility and potential impacts of synchronizing national and state elections.

Overview
- Purpose: Model and visualize outcomes from different election synchronization policies (current staggered system, partial synchronization, full synchronization).
- Audience: researchers, students, policy analysts, and election administrators.

Main features
- Configure simulation inputs (time horizon, turnout, vote swing, synchronization level, costs).
- Run simulations and compare scenario outcomes (seats, cost estimates, administrative load).
- Visualize results with charts and side-by-side comparisons.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
# open http://localhost:8080
```

3. Build for production

```bash
npm run build
```

Project layout
- `src/` — React + TypeScript source (pages, components, hooks, libs)
- `public/` — static assets (logo, favicon)
- `package.json` — scripts and dependencies

Contributing
- Open issues or submit pull requests. Keep changes small and focused.

Tech stack
- Vite, React, TypeScript, Tailwind CSS, shadcn-ui primitives

Notes
- Results are for exploratory, educational, and research purposes — validate assumptions before using for policy recommendations.

Contact
- Create an issue or PR for questions, feedback, or collaboration.
# Election Simulator

## Project info

This repository contains the source for the Election Simulator application (Vite + React + TypeScript).

## How to run locally

Requirements: Node.js and npm (or pnpm).

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
# One Nation One Election — Election Synchronization Feasibility & Impact Simulator

**Domain:** One Nation One Election

## Project summary

This repository contains the Election Synchronization Feasibility & Impact Simulator — a data-driven web application that models the constitutional, administrative, financial, and governance impacts of implementing a One Nation One Election policy across national, state, and local bodies.

### Problem statement

How can a data-driven simulation tool be developed to analyze the constitutional, administrative, financial, and governance impact of implementing One Nation One Election across states and local bodies?

This project provides an interactive UI to configure assumptions, run simulations, and compare outcomes across scenarios (current system vs. partial synchronization vs. full synchronization).

## Features

- Configure simulation inputs: election scope, synchronization type, time horizon, cost assumptions, MCC duration, participating states.
- Run deterministic simulations and view summarized results (cost, MCC days, governance score, administrative load).
- Side-by-side comparisons and charts to visualize scenario impacts.
- Exportable results and lightweight data persistence using `sessionStorage` for quick workflows.

## How to run locally

Requirements: Node.js and npm (or pnpm).

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

Open the site at http://localhost:8080/ (default port configured in `vite.config.ts`).

## Project structure

- `src/` — application source (pages, components, hooks, lib)
- `public/` — static assets (favicon, logo)
- `package.json` — dependencies & scripts

## Running the simulator

- Start dev server: `npm run dev` (defaults to http://localhost:8080)
- Configure parameters on the `Simulate` page and click **Run Simulation**.
- Results are stored in `sessionStorage` and shown on the `Results` page.

## Logo / branding

Place your `logo.png` in `public/logo.png`. The header will use `/logo.png` if present. If you want me to add the supplied image, reply “Add logo” and I will convert and commit it as `public/logo.png` and adjust header styling.

## Testing & linting

- Lint: `npm run lint`

## Notes on sanitization

This repo was scaffolded with an automated starter. I removed obvious generator traces from the UI and metadata, but if you want commit messages scrubbed from history I can prepare a safe `git filter-repo` workflow — note this rewrites history and requires coordination with collaborators.

## License & credits

Add a `LICENSE` file if you want to publish under a chosen license. This project is intended for academic and policy analysis.

---

If you'd like me to add your supplied image as `public/logo.png` now, reply “Add logo” and I'll convert and commit it.
