---
name: EcoAventura
description: Official website of the EcoAventura pixel-art platformer, built as the game's whole journey from its own sprites, level layers and HUD.
colors:
  sky-blue: "#3366ff"
  cloud-white: "#eff3ff"
  cloud-blue: "#cadfff"
  cloud-shade: "#b3d1ff"
  sand: "#ffd080"
  sand-mid: "#ffaf4d"
  sand-deep: "#ff9933"
  desert-sky: "#ffeb57"
  desert-sun: "#fff3a6"
  desert-dune: "#e69c69"
  jungle-light: "#d3f9bc"
  jungle: "#6c9551"
  jungle-deep: "#36581e"
  frozen-night: "#0d0f20"
  ice-light: "#86b6d4"
  ice-white: "#e6f4f9"
  castle-light: "#89aece"
  sprite-ink: "#394373"
  ink-deep: "#232a4d"
  ink-night: "#1a1f3b"
  hud-green: "#1a3826"
  hud-green-raised: "#2a5636"
  hud-gold: "#e8b921"
  hud-cream: "#f1ebc8"
  coin-gold: "#ffcd1e"
  coin-highlight: "#fff359"
  coin-shadow: "#ff9500"
  warning-red: "#db3d33"
  paper-white: "#ffffff"
  bin-plastic: "#ffd11a"
  bin-cardboard: "#3b85ed"
  bin-metal: "#a6adb8"
  bin-glass: "#45ad54"
  bin-hazard: "#db3d33"
  bin-special: "#996bd9"
typography:
  display:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 1.8rem + 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "0.01em"
  scene-title:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.3rem + 5vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.95
  headline:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3.2vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 1.6vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.05
  subtitle:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
  lead:
    fontFamily: "Lexend, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.45
  body:
    fontFamily: "Lexend, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    letterSpacing: "0.02em"
  label:
    fontFamily: "Pixelify Sans, Lexend, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 500
    letterSpacing: "0.03em"
rounded:
  none: "0"
spacing:
  s-1: "0.5rem"
  s-2: "1rem"
  s-3: "1.5rem"
  s-4: "2rem"
  s-5: "3rem"
  s-6: "4.5rem"
  s-7: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.coin-gold}"
    textColor: "{colors.ink-night}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.55em 1.3em"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.hud-green-raised}"
    textColor: "{colors.hud-cream}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.55em 1.3em"
    height: "52px"
  button-small:
    padding: "0.35em 0.9em"
    height: "44px"
  button-large:
    padding: "0.6em 1.6em"
    height: "64px"
  hud-toggle:
    backgroundColor: "{colors.hud-green-raised}"
    textColor: "{colors.hud-cream}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.75rem"
    height: "44px"
  hud-toggle-on:
    backgroundColor: "{colors.coin-gold}"
    textColor: "{colors.ink-night}"
  hud-panel:
    backgroundColor: "{colors.hud-green}"
    textColor: "{colors.hud-cream}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  zone-chip:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.ink-night}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.15rem 0.7rem"
  boss-card:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.cloud-white}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem 1.5rem"
  filter-chip:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.sprite-ink}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.85rem"
    height: "44px"
  filter-chip-on:
    backgroundColor: "{colors.sprite-ink}"
    textColor: "{colors.paper-white}"
  trash-tile:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    width: "84px"
  shop-item:
    backgroundColor: "{colors.hud-green}"
    textColor: "{colors.hud-cream}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.1rem"
  key-cap:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.sprite-ink}"
    rounded: "{rounded.none}"
    height: "48px"
  faq-item:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.sprite-ink}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1.5rem"
  nav-hud:
    backgroundColor: "{colors.hud-green}"
    textColor: "{colors.hud-cream}"
    height: "64px"
---

# Design System: EcoAventura

## Overview

**Creative North Star: "The First Level"**, extended into **the whole run**.

The site is the game itself, not a page about the game. The visitor starts on the daylight beach of Isla Verde, with the real pixel sky and parallax clouds, and the game's own HUD serves as the navigation. Night falls into the trailer "cinema". The visitor then travels the five real zones (beach, desert, jungle, frozen kingdom, castle), meets the bosses and the trash register, and faces the princess cliffhanger in the castle. The run ends at dawn with the download. Every colour is sampled from the Godot project: level layers, sprite outlines, the EcoMoneda coin and the `arcade_theme.tres` HUD theme. Every image is a real sprite, layer or in-game capture (see `img/PROCEDENCIA.md`).

Density is generous and kid-readable. Body copy is large Lexend with high contrast, and every target is at least 44px. Pixelify Sans carries the game's voice. Section surfaces follow the time of day (sand, cloud, HUD green, ink, night), and the seams between them are stepped pixel edges, so the page reads as one continuous level.

The page rejects the category default for game sites: neon on near-black, emoji icons, rows of equal rounded feature cards and stock "gamer" chrome.

**Key Characteristics:**
- Palette taken only from the game's sprites, level layers and HUD theme. Each zone brings its own sampled palette.
- Real pixel art at integer-feeling scale with nearest-neighbour rendering.
- Stepped (notched) pixel corners on every framed object. No border-radius anywhere.
- Two typefaces: Pixelify Sans for the game voice, Lexend for reading.
- Motion borrowed from the game: steps() sprite loops, zone wipes, letter drops, letterbox bars. Every motion has a reduced-motion path.

## Colors

A day-to-night journey palette. Saturated sky blue and warm sand open the page, four sampled zone palettes carry the middle, and ice and castle night close it. A navy sprite ink outlines everything, and the HUD's deep green and gold form the interface layer.

### Primary
- **EcoMoneda Gold** (coin-gold): the only primary-action colour (the "Ver el tráiler" and download buttons, the trailer play button, the sound toggle when on, pressed toggles, the current map node). It is also the wordmark fill and the heading colour on dark surfaces. On light surfaces it never carries text; it only fills controls that carry ink-night text.
- **Coin Highlight / Coin Shadow** (coin-highlight, coin-shadow): only the top and bottom bevel rows of gold frames, the three-band fill of the ISLA EXPLORADA bar, the button glint and the click sparks. Coin highlight also lights the princess crystal edge when it cracks. Neither is a flat surface fill.

### Secondary
- **HUD Green** (hud-green): the arcade-theme panel colour. Used for the fixed nav, HUD panels, the ManyPig section, the boss sheet, shop items and the level map (at 0.92 alpha over the scene).
- **HUD Green Raised** (hud-green-raised): the face of secondary buttons, the sound toggle, animation and clip toggles, boss links, and visited map nodes.
- **HUD Gold** (hud-gold): the HUD border. Used for panel and gold frames, the nav's bottom rule, map node borders, and stat borders (0.5 alpha). It is also used for in-panel dividers (0.35 alpha).
- **HUD Cream** (hud-cream): text on HUD green, the outer frame of green buttons, and the trash-slot tiles in level panels.

### Tertiary
- **Level Sky** (sky-blue): the beach scene behind the parallax layers, the dawn download scene and the ManyPig portrait backdrop.
- **Sand / Sand Mid / Sand Deep** (sand, sand-mid, sand-deep): sand is a light section surface and the default zone-chip fill. Mid and deep appear only in the mission ground strip.
- **Desert** (desert-sky, desert-sun, desert-dune): desert-sky is the desert zone backdrop and its chip colour. Desert-sun and desert-dune appear only in the sun glow, the boss light and the wind-sand particles.
- **Jungle** (jungle-light, jungle, jungle-deep): jungle-light is the jungle backdrop and chip colour. Jungle and jungle-deep appear only as falling-leaf particles.
- **Frozen kingdom** (frozen-night, ice-light, ice-white): frozen-night is the frozen backdrop and the "noche" section surface (the bosses section). Ice-light is the frozen chip colour, the crystal glint and the moon light. Ice-white is the text colour of the princess finale and the crystal outline.
- **Castle** (castle-light): the castle chip colour and boss light. The castle backdrop itself is the near-black `#05080c`, which is currently written as a literal and not as a custom property.
- **Warning Red** (warning-red): the game's red "!" that flags a boss attack, and the bullets of harmful-effect lists in the trash register.
- **Recycling bins** (bin-plastic, bin-cardboard, bin-metal, bin-glass, bin-hazard, bin-special): the six in-game container colours. Use them only for register filter swatches, the bin strip under each trash tile and the container chip. Cardboard, glass, hazard and special chips take white text. Plastic and metal take ink-night text.

### Neutral
- **Sprite Ink** (sprite-ink): the game's "black", the outline colour of every sprite. It is the default text colour on light surfaces, all 3–5px borders on light surfaces, the pressed filter chip, key-cap outlines and the wordmark stroke.
- **Ink Deep** (ink-deep): the gallery section surface, the boss card face and the centre of the gold frame.
- **Ink Night** (ink-night): the page and body background, the cinema ("cine") section under a faint sky-blue glow, the journey stage, the footer, the exploration track, text on gold and on zone chips, and the borders of chips on dark surfaces.
- **Cloud White / Cloud Blue / Cloud Shade** (cloud-white, cloud-blue, cloud-shade): cloud-white is the cloud section surface and the text colour on ink. Cloud-blue is the muted text on ink (captions, data labels, the footer). Cloud-shade is the key-cap bevel.
- **Paper White** (paper-white): FAQ cards, key caps, filter chips, trash tiles and capture captions. It is also the text colour over the sky scene, where it always has an ink stroke.

### Named Rules
**The Sampled-Only Rule.** Every colour comes from a game asset. Before you add a colour, find it in a sprite, a level layer or `arcade_theme.tres`, and declare it in `:root` in `css/estilos.css`. If it is not in the game, it does not go on the page.

**The Gold-Is-Action Rule.** A gold-filled pixel control means "do the main thing" or "this is on". Secondary actions are HUD green. Never put two gold buttons side by side.

**The Zone-Owns-Its-Colour Rule.** A zone colour appears only where that zone is present: its scene, its chips, its boss light, its particles, or the nav readout while that zone is on screen (via `--zona-acento` and `--chapa`). Zone colours are never generic UI colours.

**The Red-Means-Danger Rule.** Warning red marks only an imminent attack or harm (the boss "!", harmful-effect bullets, the hazard bin). It never decorates.

## Typography

**Display Font:** Pixelify Sans (fallback Lexend, system-ui), self-hosted as `fonts/pixelify-latin.woff2`, weights 400–700.
**Body Font:** Lexend (fallback system-ui, Segoe UI), self-hosted as `fonts/lexend-latin.woff2`, weights 400–700.

**Character:** Pixelify Sans is the game's own menu and HUD voice. Lexend was designed for reading ease, so it suits young readers. Pixel type speaks and Lexend explains.

### Hierarchy
- **Display** (700, 3.4rem to 6rem fluid, line-height 0.92): the ECO / AVENTURA wordmark only, on two lines. It has a gold fill, a sprite-ink stroke of 0.14em (`paint-order: stroke fill`) and a hard 0.09em ink drop. It is fixed at 3.1rem under 640px.
- **Scene title** (700, 2.6rem to 5.6rem fluid, line-height 0.95): titles set directly on a full scene. These are the journey title (to 5rem, white) and the princess finale (ice-white, second line gold). Both use a 0.12em ink stroke and a 0.08em ink drop. The finale is fixed at 2.5rem under 640px.
- **Headline** (700, 2.25rem to 3.75rem fluid, line-height 1.02): one h2 per section. Ink on light surfaces, gold on dark ones.
- **Title** (700, 2rem to 2.75rem fluid, line-height 1.05, gold): level names, the final boss and the boss sheet name. Boss card names use 1.65rem, and register and mission names use 1.6rem.
- **Subtitle** (600, 1.6rem to 2.25rem fluid, line-height 1.1): sub-blocks within a section. Small in-panel headings use 1.25–1.3rem gold.
- **Lead** (Lexend 500, 1.25rem to 1.5rem fluid, line-height 1.45): the opening paragraph after a headline. The finale line uses 1.15–1.35rem.
- **Body** (Lexend 400, 1.125rem, 1.0625rem under 640px, line-height 1.6): paragraphs capped at 68ch, intros at 60ch. Emphasis uses weight 600. Secondary copy in cards and panels goes down to 0.98–1rem. Notes and captions use 0.9–0.95rem.
- **Button** (Pixelify 600, 1.2rem, uppercase, 0.02em): default buttons. Small buttons use 1rem and large ones 1.45rem (1.2rem under 640px).
- **Label** (Pixelify 500–700, 0.75rem to 1.05rem, uppercase, 0.03–0.06em): HUD readouts and the exploration bar (0.8rem), map node names (0.85rem, 0.75rem on phones), stat and data terms (0.8–0.85rem), zone and container chips (0.85–0.95rem), the sound toggle (0.95rem), filter chips (1rem) and boss links (1.05rem). Numbers in readouts, stats and prices are tabular.

### Named Rules
**The Two-Voice Rule.** Pixelify Sans is for things the game would say: titles, buttons, HUD readouts, chips and labels. Lexend is for anything a child must read as a sentence. Never set a paragraph in Pixelify.

**The Outlined-Over-Scene Rule.** Text placed directly on a scene (sky, journey stage, castle) has a stroke in sprite ink or ink night (`paint-order: stroke fill`), the same as the sprite outlines. Use the stroke only on type of 1.5rem or larger. Longer copy over a scene goes inside a HUD panel instead.

## Layout

Content sits in a centred container of `min(1200px, 100% − 3rem)`. The nav bar is wider (`min(1360px, 100% − 2rem)`). Sections are full-bleed bands with 7rem vertical padding (4.5rem under 640px). Inside a section, layouts are asymmetric two-column grids (4/8, 5/6, 4/7, 6/5 fr). Spacing follows the `s-1`…`s-7` scale (0.5rem to 7rem).

The page order follows the story and the time of day: beach hero (day), cinema trailer (night), sand story, the journey, night bosses, HUD ManyPig, cloud register, sand controls and shop, ink gallery, castle finale, dawn download, cloud FAQ, ink footer.

- **Scenes:** the hero and download are full-height scenes. The hero stacks five parallax layers (sky, three cloud bands, ocean, sand) at the pixel scale `--k` (4px, or 3px under 640px). Sprites sit on the sand line in units of `--k`. The hero layers and ManyPig follow the pointer in depth (`--px`/`--py`), and a veil darkens the beach toward ink night as it scrolls away.
- **The journey ("viaje"):** a sticky 100svh stage holds the real layers of all five zones. The level articles (each at least 100svh, alternating sides) scroll over it. Inactive level panels drop to 0.35 opacity. The level map is pinned at the bottom of the stage, `min(760px, 100% − 3rem)` wide.
- **Bosses:** a 6-column grid. Each card spans 2 and the final boss spans 4 in a horizontal layout. It goes to 2 columns under 1100px and 1 under 640px.
- **Register:** the filters sit on top, with the tile grid (`auto-fill, minmax(84px, 1fr)`) beside a sticky detail panel.
- **Finale:** at least `max(100svh, 760px)`, with the crystal (240 × 340px) beside the text.
- The scroll offset is the fixed nav height (88px, or 84px under 1240px).

Breakpoints:
- **1240px**: the nav collapses into a "MENÚ" pixel button with a drop-down HUD sheet. The sound control stays in the bar.
- **1100px**: the mission path goes to 2 columns, each step with its own ground strip. The boss grid goes to 2 columns. The register stacks (filters, detail, list).
- **960px**: all two-column grids stack, level panels stop alternating, and the gallery goes to 2 columns. The finale centres, and the crystal shrinks to 180 × 255px.
- **640px**: `--k` drops to 3px. The wordmark text in the nav, the sound status text and the exploration label hide. Map node names show only for the current node. Single-column grids, and the large buttons go full width.

## Elevation & Depth

Depth comes from three things: world layering (parallax scenes, the sticky journey stage, then sections), hard pixel offsets inside the art, and a soft ambient drop under raised objects. Surfaces themselves are flat colour bands. The boss cards add a slight 3D tilt toward the pointer, with the sprite lifted on `translateZ`.

### Shadow Vocabulary
- **Raised button** (`filter: drop-shadow(0 4px 6px rgb(26 31 59 / 0.28))`; hover `0 8px 10px … / 0.3` with a −3px lift; active `0 1px 2px` with a +1px press): all `.btn` pixel buttons.
- **Framed capture** (`filter: drop-shadow(0 10px 18px rgb(26 31 59 / 0.25))`): screenshots in ink frames on light surfaces.
- **Scene frame** (`filter: drop-shadow(0 24px 40px rgb(0 0 0 / 0.45))` for the trailer; `0 18px 30px … / 0.45` for level clips): gold-framed video on dark surfaces.
- **Boss card** (`filter: drop-shadow(0 14px 22px rgb(0 0 0 / 0.4))`; hover and focus `0 24px 34px … / 0.55`).
- **Gallery hover** (`filter: drop-shadow(0 14px 20px rgb(0 0 0 / 0.35))` with a −4px lift).
- **HUD bar** (`box-shadow: 0 6px 16px rgb(10 20 14 / 0.25)`; the open mobile sheet uses `0 16px 24px … / 0.35`): nav only.
- **Pixel offsets** (hard, zero blur): the ink drops under the wordmark and scene titles, the mission ground strip, and the coin-shadow inset on boss-sheet bullets. These belong to the pixel-art world and are drawn like sprite shading.

### Named Rules
**The Notch-Safe Shadow Rule.** A notched frame takes its shadow from `filter: drop-shadow`, never from `box-shadow`. A box-shadow would redraw the square corners that the stepped frame removes.

## Shapes

All corners are square or stepped. There is no border-radius in the system. Even the range-slider thumb is forced to `border-radius: 0`. Framed objects use 3×3 or 5×5 SVG tiles with `shape-rendering: crispEdges` as a `border-image` with `fill`. This removes one pixel at each corner, like a game UI frame. Every frame pairs with a `padding-box` background colour, so the shape still reads if the border-image fails.

Frame family (custom properties in `:root`):
- **HUD frame** (`--marco-hud`, gold on green): panels, the level map, the boss sheet, shop items, the trailer notice and the lightbox.
- **Ink frame** (`--marco-tinta`, sprite-ink on white): captures on light surfaces and FAQ cards.
- **Gold frame** (`--marco-oro`, gold on ink-deep): the trailer screen (8px), level clips, boss cards, gallery thumbnails, the ManyPig stage, the mission portal and the nav portrait.
- **Gold button** (`--boton-oro`, ink outline, three-band coin bevel): primary buttons, the trailer play button and every "on" toggle.
- **Green button** (`--boton-verde`, cream outline, three-band green bevel): secondary buttons, the sound toggle, the menu button, boss links, clip and animation toggles, and lightbox controls.
- **Key cap** (`--tecla`, ink outline, white face, cloud-shade bottom row): keyboard keys.

Plain 2–4px solid borders (not notched) are used for flat data pieces: ODS chips, zone and container chips, level stats, filter chips, trash tiles, map nodes and the mission ground strip. Section seams are a 12px stepped crenellation (24px period) in the colour of the section below. The princess crystal is an inline SVG drawn on a 24×34 pixel grid.

## Components

### Buttons
Tactile arcade buttons that lift on hover and press down on click.
- **Shape:** stepped 6px frame (5px small, 4px for toggles and HUD controls, 8px for the trailer play button), no radius.
- **Primary:** coin-gold face, ink-night text, Pixelify 600 uppercase, with a pixel icon (inline SVG on an 8×8 grid). Sizes are small (44px), default (52px) and large (64px). The hero primary carries a coin glint (`--oro-claro` bar crossing every 4.2s). Clicks throw gold pixel sparks.
- **Secondary:** hud-green-raised face with hud-cream text.
- **Hover / Focus:** −3px lift with a deeper drop, using `0.18s cubic-bezier(0.16, 1, 0.3, 1)`. Focus is a 3px outline offset by 4px, coloured through `--foco`: ink on light surfaces, gold on dark ones, white on the hero sky.
- **Disabled:** `aria-disabled="true"` with `grayscale(0.85) opacity(0.75)` and no lift. The download button uses this with "PRÓXIMAMENTE" until the build exists.
- **Toggles** (sound, animation picker, clip play/pause): a green button that switches to the gold frame when on (`aria-pressed="true"` or `.activo`).

### Chips
- **Zone / level chip:** a flat block in the zone colour (`--chapa`/`--zona-chapa`, default sand) with ink-night Pixelify uppercase text. On light surfaces it has a 3px ink-night border.
- **Container chip:** the same chip, filled with the bin colour.
- **Filter chip:** white, with a 3px ink border, a 14px bin-colour swatch and 44px height. Pressed is ink with white text. Hover lifts it 2px.
- **ODS chip:** translucent white (0.55) with a 3px ink border, plus an ink number block with gold Pixelify text.
- **Level stat:** an ink-night block with a 2px gold (0.5) border, a cloud-blue label term and a tabular gold value.

### Cards / Containers
- **HUD panel:** hud-green inside the HUD frame, cream text and 1rem × 1.5rem padding. This is the container for copy over a scene.
- **Framed capture:** a real 16:9 screenshot in the ink or gold frame. On light surfaces it has a white Lexend 500 caption band.
- **Boss card:** an ink-deep face inside the gold frame. On top is a 16:10 scene from that zone's real layers with the boss sprite. Below are the gold name, the zone chip, a Lexend line and a gold "ver ficha" label. On hover or focus the sprite plays its real attack sheet and the red "!" pops in. A zone-tinted light follows the pointer, and the card tilts. The final boss spans two columns, horizontal.
- **Trash tile:** a square white tile with a 3px ink border, the real trash sprite (max 52px) and an 8px bin-colour strip at the bottom. Hover lifts it 3px on cloud-blue. Selected is gold with an outer ink outline.
- **Shop item:** a HUD-framed row with a gold Pixelify name, a Lexend description and a tabular gold price on an ink-night block with the coin sprite.

### Inputs / Fields
- **Key cap:** 48px tall (120px minimum for wide keys), white face, ink Pixelify 600. Keys are displays, not controls.
- **Volume slider:** 88px wide (64px on phones), with an 8px ink-night track, a 2px gold border and a square gold thumb with an ink border.

### Navigation
- **HUD bar:** fixed, hud-green, with a 4px hud-gold bottom rule. It holds the ManyPig portrait and the gold "ECO AVENTURA" mark, Lexend 500 links in cream (0.98rem), the sound control and a small gold download button. Hover and the active section show gold text with a 3px gold underline.
- **Sound control:** off by default. It is a green toggle with a pixel speaker. When on, it turns gold, shows a three-bar `steps(3)` equaliser and reveals the volume slider.
- **Mobile:** under 1240px a green "MENÚ" button (pixel hamburger) opens a stacked HUD sheet. ESC closes it.

### ISLA EXPLORADA bar (signature)
This copies the game's "% de zona limpia". It shows a zone readout chip in the current zone's accent, a 10px ink-night track with a 2px HUD-gold border, a three-band coin fill scaled by scroll progress, and a tabular gold percentage. It sits under the nav links on every viewport.

### Journey stage and level map (signature)
The sticky stage shows one zone at a time. Each zone is built from its real Godot layers, and the strips pan horizontally with scroll. The next zone wipes in from the right (`clip-path` inset, 1s, with a 0.9s fade), and the particle canvas switches to that zone's weather. The level map is a HUD-framed strip of five 32px numbered nodes on an ink-night path with a gold progress fill. ManyPig (1.25×) walks to the current node. Visited nodes turn green, and the current node is gold and scaled 1.12.

### Boss sheet
A native `<dialog>` with a 0.9 frozen-night backdrop and the HUD frame. It has two columns: the zone scene with the boss at 4× and idle/attack toggles, then the gold name, zone chip, gold subheads, coin-square bullets and an optional clip. Previous/next controls sit below a gold divider.

### Trailer frame
A 16:9 screen in the 8px gold frame with scanlines. Until a YouTube link is set in `js/config.js`, it shows the dimmed menu capture under a HUD-framed notice. The notice holds a gold "PRÓXIMAMENTE" chip with a blinking gold outline (`steps(2)`) and a cream line. With a link, it shows a 104px gold play button, which loads the iframe on click.

### Princess finale
A castle scene with an exterior layer, moon glow, two fog strips, a shadowed Verdugo sprite and crystal particles. Black letterbox bars grow to 7vh when the section enters. The scene title rises line by line from behind a mask. The princess sprite sits inside the pixel SVG crystal with a pale light beam, and the crystal pulses in brightness. Its edge turns coin-highlight when it cracks.

### Download (dawn)
The beach scene again, under a coin-shadow-to-sand dawn gradient, with a centred HUD panel, the large primary button and a cream Pixelify status line.

### Sprites and particles
The real sprite sheets are animated with `steps(frames)` at scales from 0.75× to 7×, always with `image-rendering: pixelated`. A pixel particle canvas (2–5px squares in sampled colours) gives each scene its weather: hero sparkles, beach glints, desert wind sand, jungle leaves, snow, castle motes, crystal shards.

### Lightbox
A native `<dialog>` with the HUD frame, an ink-night backdrop at 0.88, green 48px arrow and close buttons, and a Pixelify counter.

### Motion grammar
One easing everywhere: `--salida` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Wordmark:** each letter drops in and bounces once (0.7s, 0.055s stagger). The rest of the hero follows in sequence, and ManyPig runs in once (1.7s).
- **Reveals:** content starts visible (opacity 0.15, +24px), never hidden, and settles over 0.7s. Captures wipe top-down (0.9s), and boss cards stagger by 0.09s.
- **State changes:** zone wipes, map walker (0.9s), letterbox bars (1.1s).
- **Ambient loops:** cloud drift (95–220s), sun-ray rotation (140s), fog (45–80s).
- **Gate:** all of it runs only under `.js-movimiento`. Under `prefers-reduced-motion` all animation and transition is cut. Zones and level panels then cross-fade in 0.3s with no clip, and the boss tilt is removed.

## Do's and Don'ts

### Do:
- **Do** sample every new colour from a game sprite, level layer or `arcade_theme.tres`, and add it as a custom property in `css/estilos.css`.
- **Do** render every sprite, layer and capture with `image-rendering: pixelated`. Size sprites in whole multiples of their frame (`--frame × --e`), and size scene art in units of `--k`.
- **Do** frame new boxes with the existing stepped border-images plus a matching `padding-box` background fallback.
- **Do** use only real game captures, layers and sprites, and log each new raster in `img/PROCEDENCIA.md`.
- **Do** keep targets at least 44px tall and body copy at 1.0625rem or larger. Labels may go down to 0.75rem only when uppercase Pixelify on a solid HUD or chip background.
- **Do** set focus colour through `--foco`: ink on light surfaces, gold on dark ones.
- **Do** give every looping or moving piece a reduced-motion path, and start reveals from a visible state.
- **Do** keep sound off until the visitor turns it on.

### Don't:
- **Don't** use border-radius or rounded cards. Corners are square or stepped.
- **Don't** blur, smooth or non-uniformly stretch pixel art.
- **Don't** use emoji or icon-font glyphs. Icons are inline SVG drawn on a pixel grid with `shape-rendering: crispEdges`.
- **Don't** use neon-on-black "gamer" styling or rows of identical feature cards.
- **Don't** put `box-shadow` on a notched frame. Use `filter: drop-shadow`.
- **Don't** use mock, AI-generated or invented screenshots. Every capture comes from the Godot project.
- **Don't** add credits of people, team or authors to the page (owner decision).
