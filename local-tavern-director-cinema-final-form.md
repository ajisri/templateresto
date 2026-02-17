# Local Tavern — DIRECTOR CINEMA LEVEL (FINAL FORM)
## Cinematic Director Script • Perceptual Design Hacks • Attention Funnel • Anti‑Patterns • Heavy‑but‑Fast Formula

Dokumen ini adalah **final form** — level arahan yang biasanya hanya dipakai internal studio besar sebelum production lock.
Fokus utamanya:

> Mengarahkan pengalaman website seperti seorang sutradara film mengarahkan scene.

---

# 1️⃣ CINEMATIC DIRECTOR SCRIPT (SCENE & CAMERA LOGIC)

Website dianggap sebagai film interaktif.
Scroll = camera movement.

---

## SCENE 01 — OPENING SHOT (Hero)

### Camera Logic
- Wide establishing shot.
- Slow push-in (illusion via scale/parallax).

Visual:
- Ambience gelap, warm highlights.
- Minimal UI.

Director note:
Jangan langsung “jual”. Bangun mood dulu.

---

## SCENE 02 — TITLE REVEAL

Camera:
- Static frame.
- Typography enters like film title.

Rules:
- Tidak ada gerakan lain.
- Silence = power.

---

## SCENE 03 — TRANSITION TO STORY

Camera movement:
- Vertical pull upward saat scroll.

Effect:
User merasa masuk lebih dalam ke ruang.

---

## SCENE 04 — LEGACY FLASHBACK

Camera:
- Split narrative (left text, right visual).

Movement:
- Cross dissolve antar era lama → baru.

Psychology:
Membangun trust & authenticity.

---

## SCENE 05 — GOLDEN HOUR SHIFT (Day → Night)

Camera:
- Exposure slowly drops.
- Warm tones increase.

Rule:
Perubahan harus nyaris tidak terasa.

---

## SCENE 06 — MENU CLOSEUPS

Camera style:
- Macro / detail.
- Slow lateral movement.

Interaction:
User controls pace (hover).

---

## SCENE 07 — SOCIAL ENERGY

Camera:
- Multiple medium shots (gallery grid).

Movement:
- Staggered entry.

Goal:
Create social proof without noise.

---

## SCENE 08 — HERO PRODUCT / SIGNATURE MOMENT

Camera:
- Locked shot.
- Minimal motion.

Director principle:
Stillness after movement = premium.

---

## SCENE 09 — DECISION FRAME

Camera:
- Slight forward pull.

CTA appears as destination, not interruption.

---

## SCENE 10 — END CREDITS (Footer)

Lighting warm.
Motion minimal.
Closure feeling.

---

# 2️⃣ PERCEPTUAL DESIGN HACKS (HOW PREMIUM FEELS EXPENSIVE)

## Hack 01 — Temporal Weight Illusion

Objects that move slower feel heavier and more valuable.

Apply to:
- Headlines
- Hero transitions
- Signature imagery

---

## Hack 02 — Visual Silence

Space with almost no motion increases perceived luxury.

Use after high-interaction sections.

---

## Hack 03 — Controlled Imperfection

Add:
- Very subtle film grain
- Slight texture variation

Avoid clinical flatness.

---

## Hack 04 — Delayed Information

Do not reveal everything instantly.

Curiosity = engagement.

---

## Hack 05 — Layered Depth Without 3D

Use:
- foreground text
- midground imagery
- background gradient

Result:
Depth without performance cost.

---

## Hack 06 — Light Consistency

All images should feel lit from similar sources.
Inconsistent lighting kills premium feel instantly.

---

# 3️⃣ ATTENTION FUNNEL MAP (EYE CONTROL)

Goal:
Guide mata user dari impression → booking.

---

## Funnel Stages

### Stage 1 — Capture
Hero headline + strong visual anchor.

### Stage 2 — Stabilize
Legacy storytelling slows gaze.

### Stage 3 — Stimulate
Menu visuals activate appetite.

### Stage 4 — Validate
Gallery confirms social proof.

### Stage 5 — Direct
Single clear CTA path.

---

## Eye Flow Pattern (Ideal)

```
Center → Upper Left → Center → Lower Right (CTA)
```

Avoid random horizontal eye jumps.

---

## Attention Anchors

Every section must have exactly one:

- Headline
- Image focal point
- CTA

Never multiple equal anchors.

---

# 4️⃣ PRODUCTION ANTI‑PATTERNS (WHY PREMIUM FAILS)

## Anti‑Pattern 01 — Everything Animates
Result: chaos.

Fix:
Motion hierarchy.

---

## Anti‑Pattern 02 — Fast Scroll Reactions
Result: cheap/mobile-game feel.

Fix:
Add damping & inertia.

---

## Anti‑Pattern 03 — Overuse of Glass / Blur
Result: trendy but shallow.

Fix:
Use as accent only.

---

## Anti‑Pattern 04 — Too Many Fonts
Result: brand inconsistency.

Fix:
Max 2 families.

---

## Anti‑Pattern 05 — No Rest Zone
Result: cognitive fatigue.

Fix:
Insert calm sections.

---

## Anti‑Pattern 06 — CTA Appears Too Early
Feels aggressive.
Let narrative build first.

---

# 5️⃣ HEAVY‑BUT‑FAST FORMULA (NEXT.JS + GSAP)

## Principle

Visual heaviness should come from:
- Composition
- Timing
- Imagery

NOT from computational heaviness.

---

## Formula

### 1. Fake Complexity

Instead of:
Many moving layers

Use:
- One moving hero layer
- Static supporting elements

---

### 2. Layer Budget

At any frame:
- 1 cinematic motion layer
- 2 micro animated layers max

---

### 3. Deferred Animation Initialization

Initialize ScrollTriggers only when section enters viewport.

---

### 4. Reduced Mobile Timelines

Mobile:
- Disable scrub on heavy sections.
- Replace with simple fade-in.

---

### 5. Image Strategy

- AVIF/WebP formats.
- Responsive sizing.
- Preload hero only.

---

## Performance Mental Model

If user feels “smooth”:
they assume high quality.

---

# 6️⃣ DIRECTOR RULES FOR EXPENSIVE FEEL

Rule 1 — Calm Confidence  
Do less, but better.

Rule 2 — Narrative Momentum  
Each section should answer:
“What emotion comes next?”

Rule 3 — One Surprise Per Act  
Too many wow moments reduce impact.

Rule 4 — Typography Is the Brand Voice  
If typography weak → everything feels generic.

Rule 5 — Motion Should Respect User  
Stop when user stops.

---

# 7️⃣ FINAL PRE‑LAUNCH DIRECTOR QUESTIONS

Ask before shipping:

- Does the site feel like entering a place?
- Is there breathing room?
- Does every section have a reason to exist?
- Is booking the natural ending?
- Would the site still feel premium if animations were off?

If answer = yes → foundation is strong.

---

# 8️⃣ FINAL FORM PRINCIPLE

The best hospitality websites:

- do not shout,
- do not rush,
- do not overload.

They invite.

---

## END GOAL

User closes the website with one thought:

> “I want to experience this place in real life.”

---

END OF DIRECTOR CINEMA LEVEL — FINAL FORM
