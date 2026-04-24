# Emily Lam — Portfolio

This file stores all design decisions, content, and configuration so we can continue work across sessions.

---

## Personal Info

- **Name:** Emily Lam
- **Email:** emlam1099@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/emilylam1099
- **Tagline:** "Designing for the person on the other side of the screen."

---

## Bio

Hi, I'm Emily! I currently work at Badger Meter, designing for BEACON and EyeOnWater, where I partner closely with product and engineering teams to make sure every detail holds up from concept to launch. Collaboration is one of my favorite parts of this work — I really believe the best solutions come from being in the room with your team, asking the right questions, and building things together.

My design background was initially primarily in print design. I started off in high school in the yearbook committee, which led to me spending some time at UC Davis in a student run magazine, Inprint. I eventually became the art director there, spending most of my time obsessing over layouts long before I ever touched a prototype tool. Towards the end of my college career, I found myself drawn to the space where design and technology intersect, and that curiosity pulled me into UX. I also had the chance to mentor students at UC Davis's first student-run UX consultancy, Design Interactive, which really cemented how much I love helping others grow in this field.

When I step away from the screen, you'll find me attempting snowboard runs (emphasis on attempting), baking sourdough for friends and family, or finding the perfect spot for a picnic.

---

## Skills & Tools

Figma, Adobe Suite, UX Design, UI Design, Wireframing, UX Research

---

## Projects

1. **Water Budgets for EyeOnWater**
   - One-liner: Increasing conservation efforts by creating Water Targets for users
   - Case study file: `case-study-eyeonwater.html`

2. **MFA Configuration**
   - One-liner: Implementing MFA configuration for our users
   - Case study file: `case-study-mfa.html`

---

## Design System

### Color Palette

#### Base Colors (CSS variables)
- `--cream: #FBF7F4` — page background (warm off-white)
- `--rose: #F2B6C8` — dusty rose / primary gradient blob color
- `--periwinkle: #C2C9F5` — soft blue-purple / secondary gradient blob color
- `--peach: #F8D0BA` — warm peach / tertiary gradient blob color
- `--sky: #B8DEFF` — soft blue / fourth gradient blob color
- `--text-dark: #2A2020` — headings, primary text; also used as nav link color
- `--text-mid: #6B5555` — body text
- `--text-light: #A89090` — captions, labels

#### Star / Accent Colors (more saturated, used for sparkles, borders, and interactive elements)
- `#C4607E` — star rose
- `#7B86C8` — star periwinkle
- `#D4875A` — star peach
- `#5B9FCC` — star sky

#### Dark Page (after-hours.html uses `body.dark-page`)
- Nav logo, links, hamburger: `#F0EBF5` (light lavender-white)
- Nav links at rest: `rgba(240,235,245,0.55)`
- Section divider line: `rgba(255,255,255,0.12)`, star: `rgba(255,255,255,0.35)`

### Typography
- **Display/Headings:** Bricolage Grotesque (Google Fonts) — editorial, high contrast serif
- **Body/UI:** DM Sans (Google Fonts) — clean, friendly, legible
- **Nav logo (text fallback):** Bricolage Grotesque

### Logo
- File: `images/em-logo2.svg`
- Displayed via `<img class="nav-logo-img">` inside `.nav-logo` anchor
- Size: `height: 48px; width: auto`
- On dark page: `filter: brightness(0) invert(1)` to flip to white

### Motifs & Decorative Elements

#### 4-Pointed Sparkle Stars
- Used as hero decorative accents, card corner decorations, section dividers, and skill list bullets
- Path: `M12,0 C12,1 12.4,10.5 19,12 C12.4,13.5 12,23 12,24 C12,23 11.6,13.5 5,12 C11.6,10.5 12,1 12,0Z`
- Two animation types: `twinkle` (scale + opacity pulse, for decorative sparkles) and `twinkle-solid` (scale only, for card corner stars)

#### Orbital Rings (home page hero only)
- Three concentric tilted ellipses (periwinkle, rose, peach) with traveling sparkle stars
- One star per ring, travels via SVG `animateMotion` + `<mpath>`
- Rings precess (rotate) and tilt (scaleY oscillation) to simulate 3D Saturn-like orbits
- CSS: `.ring-a/b/c-wrap` for precession, `.ring-a/b/c` for tilt — both share `transform-origin: 720px 450px`
- Speeds: ring A 38s, ring B 54s (counter-clockwise), ring C 72s; stars 22s, 30s, 38s
- Intentionally kept to home page only — creates a strong first impression there

#### Section Dividers
- Hairline SVG rule with a centered 4-pointed star
- `viewBox="0 0 800 30"`, `preserveAspectRatio="none"` so line always spans full container width
- Light pages: `stroke: rgba(42,32,32,0.12)`, star: `rgba(42,32,32,0.4)`
- Dark page: `stroke: rgba(255,255,255,0.12)`, star: `rgba(255,255,255,0.35)`
- Used between all major sections; footer separation handled by `border-top` on `footer#contact`

### Aesthetic
- Whimsical but muted
- Soft grainy gradients (CSS morphing blobs with grain overlay via SVG feTurbulence)
- 4-pointed sparkle stars as primary decorative motif
- Thin fine lines as secondary motif
- Colors morph and blend — blobs animate slowly with CSS keyframes
- No harsh lines, no stock photos

### Interactions
- Custom sparkle cursor trail on mousemove
- IntersectionObserver scroll fade-in (`reveal` / `reveal-delay-1/2` classes)
- Card hover: lift + subtle gradient shift
- Nav: frosted glass effect on scroll
- Smooth scroll for anchor nav links
- Button hover: fill animation

---

## Page Notes

### index.html (Home)
- Orbital rings in hero (home page only)
- One section divider between hero and work sections
- Footer `border-top` handles separation from last section (no star divider before footer)

### about.html
- No orbital rings
- Dividers: bio→skills, skills→ask-me-about (first hero→bio divider removed)
- **Ask Me About card gradient borders:** white fill, 1.5px transparent border using `padding-box / border-box` CSS gradient trick
  - Each card has a unique color pair matching its two corner sparkle stars:
    - Badger Meter: rose → periwinkle (stars: `#C4607E` TL, `#7B86C8` BR)
    - Sourdough: peach → rose (stars: `#D4875A` TL, `#C4607E` BR)
    - Dumplings: sky → rose (stars: `#5B9FCC` TL, `#C4607E` BR)
    - Picnic spots: periwinkle → sky (stars: `#7B86C8` TL, `#5B9FCC` BR)
    - Boba: rose → peach (stars: `#C4607E` TL, `#D4875A` BR)
    - Travel tips: periwinkle → peach (stars: `#7B86C8` TL, `#D4875A` BR)
  - Gradient at 135° so rose end aligns with TL sparkle, second color with BR sparkle
  - Gradient opacity ~55% for softness; full saturation hex colors for stars

### after-hours.html
- `body.dark-page` class — dark background, light text
- No orbital rings (rings are home page only)
- Two section dividers: hero→hobbies, hobbies→on-repeat
- Miffy peeking illustration anchored above footer

---

## File Structure

```
my-portfolio/
├── CLAUDE.md
├── index.html
├── about.html
├── after-hours.html
├── case-study-eyeonwater.html
├── case-study-mfa.html
├── gradient-border-preview.html  (preview file, not part of portfolio)
├── motif-preview.html            (preview file, not part of portfolio)
├── css/
│   └── styles.css
├── images/
│   ├── em-logo2.svg              (current nav logo)
│   ├── em-logo.svg               (previous nav logo)
│   ├── miffy.png
│   └── me.JPG
├── js/
│   └── main.js
└── artdirection/
    └── (reference images: reference1–7.jpg, motif1–5.jpg)
```

---

## Session Notes

- Art direction references are in `./artdirection/` (reference1.jpg through reference7.jpg, motif1.jpg through motif5.jpg)
- References show: grainy pastel gradient blobs, 4-pointed sparkle motifs, dreamy/ethereal quality; motif images show orbital ring and hairline divider concepts
- Referenced site: https://warm-naiad-cf0694.netlify.app/light (morphing gradient blobs aesthetic)
- No Dribbble/Behance/GitHub links provided — only email + LinkedIn
- Preview server workaround: `python3 -m http.server 3000` from `/Users/emilylam/Desktop/my-portfolio` (run via Bash, not preview_start, due to sandbox CWD restriction)
