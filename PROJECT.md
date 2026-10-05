# Mbyte Technologies — Project Reference

> Snapshot of architecture, content, and integration details.
> Update this file whenever structural or strategic decisions change.

---

## Company Identity

| Field | Value |
|---|---|
| Name | Mbyte Technologies Sdn Bhd |
| Contact email (site) | reagan@mbyte.my — set in `src/components/home/shared.tsx` |
| Stage | Pre-seed · TRL 4 · Pahang, Malaysia |
| Positioning | Self-driving indoor mobility — one navigation stack (Map → Detect → Navigate → Move) for many bodies |
| Logo (light) | `/public/logo-mark.png` (cropped from `logo(white).jpg`) |
| Logo (dark, legacy docs) | `/public/img_rb.png` |

### Strategic Position (Oct 2026)

**Focus:** selling the self-driving system. First body: autonomous wheelchair. Next: airport passenger pod, mall shopping pod.
**Legacy:** Voice PaaS (mbyte_audio_robot) — docs kept online at `/docs` for existing users, hidden from the navbar.

**Never put on the public site:** funding ask, investor returns, pricing/unit cost/margins, TAM/SAM/SOM, named target facilities or pilot partners (e.g. KPJ, KLIA), competitor names.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript (`.tsx`) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme` block) |
| Animation | `motion/react` — import from `motion/react`, **not** `framer-motion` |
| Routing | React Router DOM (`BrowserRouter` in `main.tsx`) |
| Icons | `lucide-react` |
| Fonts | Inter (everything on the homepage) · Orbitron (legacy docs pages only) |

### Homepage Style (light, minimal)

| Purpose | Classes / Values |
|---|---|
| Backgrounds | `bg-white`, alternating with `bg-[#f6f6f4]` |
| Text | `text-neutral-950` headings, `text-neutral-500` body |
| Accent (only one) | `violet-700` |
| Headings | `font-semibold tracking-[-0.035em]` (h1 `-0.045em`) |
| Small labels | `font-mono text-xs uppercase tracking-[0.16em]` (`Eyebrow`) |
| Media frames | `rounded-2xl` / hero `rounded-[32px]` |
| Buttons | `PrimaryButton` (black pill) · `SecondaryButton` (outline pill) |
| Scroll reveal | `Reveal` component in `home/shared.tsx` |

The navbar switches between light and dark per route (`LIGHT_ROUTES` in `Navbar.tsx`); the footer takes `variant="light" | "dark"`.

---

## Project Structure

```
mbyte---ai-robot-brain-paas/
├── public/
│   ├── logo-mark.png            # Light-theme logo (navbar, footer, favicon)
│   ├── hero-wheelchair.jpg      # Hero image (concept design render)
│   ├── img_rb.png               # Dark logo (legacy docs pages)
│   ├── wiring_diagram2.jpeg     # Pin Diagram docs
│   └── ELECTRIC_circuit.png     # Pin Diagram docs
├── src/
│   ├── App.tsx                  # Routes (+ redirects for retired pages)
│   ├── components/
│   │   ├── Navbar.tsx           # Floating pill; links to homepage sections
│   │   ├── Footer.tsx           # light/dark variants
│   │   ├── Logo.tsx
│   │   ├── ScrollToTop.tsx      # Scrolls to #hash target or top on navigation
│   │   └── home/                # Homepage sections
│   │       ├── shared.tsx       # Contact constants, Reveal, Eyebrow, buttons
│   │       ├── Hero.tsx         # HERO_IMAGE_SRC, HERO_LOOP_SRC, FILM_YOUTUBE_ID
│   │       ├── Problem.tsx
│   │       ├── HowItWorks.tsx   # 4 steps; `clip` per step, SVG fallback animations
│   │       ├── WhyMbyte.tsx
│   │       ├── Platform.tsx     # One system → three bodies diagram
│   │       ├── Demos.tsx        # PROTOTYPE (Shorts) + SIMULATION YouTube lists
│   │       └── ContactCTA.tsx
│   └── pages/
│       ├── LandingPage.tsx
│       ├── DocsPage.tsx             # Legacy Voice AI SDK
│       └── ArduinoLibraryDocsPage.tsx
```

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `LandingPage` | Light theme |
| `/docs` | `DocsPage` | Legacy, footer link "Developers" only |
| `/docs/arduino-library` | `ArduinoLibraryDocsPage` | Legacy |
| `/autopilot`, `/about`, `*` | redirect → `/` | Retired Oct 2026 |

---

## Pages

### LandingPage (`/`)

1. **Hero** — "Self-driving indoor mobility." + Partner / Investment CTAs; concept image with "Watch the film" (YouTube `cZkbTn7aY0Q`)
2. **Problem** (`Problem`) — caregiver shortage, mobility friction; 805,509 PWD + 2.6M aged 65+ (DOSM 2024)
3. **How it works** (`#how-it-works`) — Map · Detect · Navigate · Move
4. **Why Mbyte** — context-aware AI, no IT work, no upfront cost (RaaS), dignity
5. **Platform** (`#platform`) — Wheelchair (Now · In development), Passenger Pod (Next), Shopping Pod (Next)
6. **Demos** (`#demos`) — prototype Shorts `nErha_yIe4M`, `-R_qoC6G1cI`; simulation `qK0F5SAb7Xg`, `2M_RCnrJXfY`
7. **Contact** (`#contact`) — Partner with us / Contact for investment (mailto with subject)
8. **Footer** (light)

### DocsPage (`/docs`)

- Sidebar (desktop) + horizontal tab strip (mobile)
- Track type: `'Arduino IDE' | 'Python' | 'ROS'`
- Default active: `'Arduino IDE'`
- **Arduino IDE** → `ArduinoReadyPanel` with "Available now" badge and two buttons:
  - "View Full Documentation" → `Link to="/docs/arduino-library"`
  - "Download Library" → `https://github.com/mbyte2026/mbyte_audio_robot/releases/download/v1.0.0/mbyte_audio_robot-v1.0.0.zip`
- **Python / ROS** → Coming Soon placeholder (skeleton code + pulsing dots)

---

### ArduinoLibraryDocsPage (`/docs/arduino-library`)

10-section sidebar docs for the `mbyte_audio_robot` ESP32-S3 Arduino library.

| # | Section ID | Label |
|---|---|---|
| 1 | `overview` | Overview |
| 2 | `installation` | Installation |
| 3 | `settings` | IDE Settings |
| 4 | `pins` | Pin Diagram |
| 5 | `quickstart` | Quick Start |
| 6 | `firstboot` | First Boot Setup |
| 7 | `wifi` | Changing WiFi / ID |
| 8 | `api` | API Reference |
| 9 | `troubleshooting` | Troubleshooting |
| 10 | `changelog` | Changelog |

**Download URL** (used in page header + DocsPage):
```
https://github.com/mbyte2026/mbyte_audio_robot/releases/download/v1.0.0/mbyte_audio_robot-v1.0.0.zip
```

**Required Arduino IDE settings:**

| Setting | Value |
|---|---|
| Board | `ESP32S3 Dev Module` |
| Partition Scheme | `Huge APP (3MB No OTA/1MB SPIFFS)` ← most common build failure cause |
| Flash Size | Match board (commonly 4MB or 8MB) |
| PSRAM | Enable if supported |

**Pin wiring — Microphone (I2S, e.g. INMP441):**

| Component | Pin (ESP32) |
|---|---|
| Mic SCK | GPIO 6 |
| Mic WS | GPIO 5 |
| Mic SD | GPIO 4 |
| Mic L/R | GND |
| Mic GND | GND |
| Mic VDD | 3.3V |

**Pin wiring — Speaker amp (I2S, e.g. MAX98357A):**

| Component | Pin (ESP32) |
|---|---|
| Speaker BCLK | GPIO 12 |
| Speaker LRC | GPIO 13 |
| Speaker DIN | GPIO 11 |
| Speaker GAIN | 3.3V |
| Speaker SD | --- |
| Speaker GND | GND |
| Speaker VIN | 3.3V |

**Diagram images** (shown above tables in Pin Diagram section):
- `/wiring_diagram2.jpeg` — Wiring Diagram
- `/ELECTRIC_circuit.png` — Circuit Diagram

**API Reference:**

```cpp
mbyte.setMicPin(ws=GPIO5, sck=GPIO6, din=GPIO4)             // call before begin()
mbyte.setSpeakerPin(dout=GPIO11, bclk=GPIO12, lrck=GPIO13)  // call before begin()
mbyte.setMicSens(int sensitivity)  // 1 = normal, 0 = less sensitive
mbyte.begin(const char* deviceId = nullptr)  // starts WiFi + cloud + audio pipeline
mbyte.run()                        // call once in loop(), runs forever internally
```

---

---

## Environment Variables

| Variable | Value |
|---|---|
| `VITE_FORMSPREE_URL` | `https://formspree.io/f/xnjynboe` (currently unused — the feedback form was removed) |

Declare in `src/vite-env.d.ts`:

```ts
interface ImportMetaEnv {
  readonly VITE_FORMSPREE_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## Known Quirks & Gotchas

- **Animation import:** use `motion/react`, not `framer-motion`
- **Tailwind v4:** uses `@import "tailwindcss"` + `@theme {}` — there is no `tailwind.config.js`
- **Vite env vars:** must have `VITE_` prefix; `import.meta.env` requires the `vite-env.d.ts` declaration
- **Scroll animations:** always use `viewport={{ once: true }}` to prevent re-triggering
- **Arduino partition scheme:** "Huge APP" is mandatory — the default causes a "Sketch too big" compile error
- **Placeholder animations:** the How-it-works visuals are pure SVG/SMIL — set a step's `clip` to swap in a video
