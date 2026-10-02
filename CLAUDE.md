# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 12 front-end **prototype** for an intelligent street-lighting control solution, with mock data for two cities: Solna (default) and Daugavpils. It is UI-focused: there is no real backend. Services return mock data, either imported from in-memory TypeScript fixtures or fetched as static GeoJSON assets. When something is missing, fill in with dummy data rather than wiring up an API.

## Commands

```bash
npm start          # ng serve (Node 17+ needs NODE_OPTIONS=--openssl-legacy-provider) — dev server at http://localhost:4200/ (hash routing, so URLs look like /#/management)
npm run build      # ng build → dist/intelligent-street-lighting (add -- --prod for production)
npm test           # ng test — Karma + Jasmine (Chrome), watch mode
npm run lint       # ng lint — TSLint (deprecated toolchain, Angular 12 era)
npm run e2e        # ng e2e — Protractor

ng test --include='**/device.service.spec.ts'   # run a single spec
```

Note: components scaffold with SCSS by default (`ng generate component <name>`).

## Architecture

**Routing & module structure.** `AppRoutingModule` lazy-loads `ManagementModule` at `/management` (the default redirect) using `SelectivePreloadingStrategyService`. `ManagementModule` wraps everything in `NavigationComponent` (toolbar/shell) and lazy-loads three feature modules — `admin`, `devices`, `profiles` — alongside eager routes for dashboard, reports, initialise, and user-profile. **All `AuthGuard`/`AdminAuthGuard` bindings are commented out**, so every route is currently open; auth is a dummy implementation (`auth/auth.service.ts`).

**Data layer.** Services in `src/app/services/` are the single source of truth and expose data as RxJS `Observable`s via getters (e.g. `DeviceService.Devices`, `UserService.Users`). Two patterns coexist:
- In-memory fixtures imported from `src/assets/data/*.ts` and wrapped with `of(...)` (e.g. `USERS`, `PROFILES`), or read per city through `CityService.data`.
- Each city's `devices.geojson`, fetched once over `HttpClient` by `DeviceService` and shared: `Devices` maps features to properties plus `lat`/`lng`, and `DevicesGeoJson` hands the raw collection to the map.

**Cities.** `CityService` owns the city list, the active city (`activeCity$`, remembered in `localStorage`) and `setCity`. City-specific fixtures live in `src/assets/data/<city>/`, and each folder's `index.ts` bundles them into one `CityData` object (see `types.ts`). Services read the active city's fixture with `cityService.data('<key>')`, which falls back to `DEFAULT_CITY_ID`; components go through services rather than importing fixtures (e.g. `ReportService`, `AreaService`). Fixtures that aren't tied to a place (`users.ts`, `profiles.ts`, `profile-time-options.ts`, `device-models.ts`) sit directly in `src/assets/data/` and are wrapped with `of(...)`. Adding a city means adding its folder (fixtures, `index.ts`, `devices.geojson`), an entry in `CITIES` and an entry in `CITY_DATA`, both in `city.service.ts`.

To change displayed data, edit the corresponding file under `src/assets/data/`. Domain interfaces (`Device`, `DeviceGroup`, `Task`, `User`, `DeviceMetrics`, etc.) live in `src/app/types.ts`.

**Map subsystem.** Device maps are built on **Leaflet** (`leaflet`, `leaflet.markercluster`) with **d3** for scaling/visuals, centered in `management/devices/map/`. Responsibilities are split across services: `MarkerService` (markers from `DeviceService`'s GeoJSON), `PopupService` (marker popups), `IconService` (SVG icons from `src/assets/icons/`). Leaflet CSS and its marker images are wired in via `angular.json` assets/styles — don't expect them from component SCSS.

**Other cross-cutting services.** `AppStateService` exposes `isHandset` (responsive breakpoints via CDK). `MessageService` is a simple log sink. `DialogService` + Angular Material dialogs drive the many `*-dialog` shared components. `LoadingService` tracks in-flight state.

## Conventions

- **Path alias:** `~local/*` → `src/app/*` (see `tsconfig.json`). Existing imports reach fixtures via `~local/../assets/data/...`.
- Angular Material is centralized in `src/app/material-module.ts`; global styles in `src/styles/`.
- PWA: service worker is enabled (`ngsw-config.json`, `manifest.webmanifest`).
- `.spec.ts` files exist next to most services but are mostly default scaffolding.
