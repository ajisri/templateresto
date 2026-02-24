import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Lightship.module.css';

/**
 * TEMPLATE 5 — THE DIRECTOR'S CUT
 * Fully aligned with "DIRECTOR CINEMA LEVEL (FINAL FORM)"
 *
 * SCENE 01: Opening Shot (Hero) — Wide establishing, slow push-in
 * SCENE 02: Title Reveal — Static frame, typography enters like film title
 * HEAVY-BUT-FAST OPTIMIZATIONS:
 * - Fetchpriority="high" for Hero
 * - Content-visibility: auto for off-screen sections
 * - Lazy loading for menu/gallery
 * - Layout stability (aspect-ratio containers)
 * SCENE 03: Transition to Story — Vertical pull upward
 * SCENE 04: Legacy Flashback — Split narrative
 * SCENE 05: Golden Hour Shift — Imperceptible bg color change (NOT a section)
 * SCENE 06: Menu Closeups — Macro, slow lateral, user controls pace
 * SCENE 07: Events — Local energy, live feed
 * SCENE 08: Social Energy — Gallery grid, staggered entry
 * SCENE 09: Signature Moment — Locked shot, stillness
 * SCENE 10: Decision Frame — CTA as destination
 * SCENE 11: End Credits — Footer
 */

// ─── UTILS: LAZY IMAGE WITH SHIMMER ──────────────────────────
// ─── UTILS: DUST PARTICLES (Hack 03: Controlled Imperfection) ──────
const ParticleField = () => {
    return (
        <div className={styles.particleContainer}>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className={styles.particle}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0
                    }}
                    animate={{
                        y: ["-5%", "105%"],
                        x: [Math.random() * 100 + "%", (Math.random() * 100) + 5 + "%"],
                        opacity: [0, 0.25, 0]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}
        </div>
    );
};

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = ({ progress }: { progress: any }) => {
    const scenes = [
        { id: "01", label: "ESTABLISH", range: [0, 0.05] },
        { id: "02", label: "UNVEIL", range: [0.05, 0.20] },
        { id: "03", label: "TRANSITION", range: [0.20, 0.24] },
        { id: "04", label: "LEGACY", range: [0.24, 0.29] },
        { id: "05", label: "ATMOS_SHIFT", range: [0.29, 0.34] },
        { id: "06", label: "MENU_SELECT", range: [0.34, 0.41] },
        { id: "07", label: "RITUALS", range: [0.41, 0.54] },
        { id: "08", label: "ATMOSPHERE", range: [0.54, 0.61] },
        { id: "09", label: "PRECISION", range: [0.61, 0.65] },
        { id: "10", label: "DEPTH", range: [0.65, 0.80] },
        { id: "11", label: "DESTINATION", range: [0.80, 0.99] },
        { id: "12", label: "FOOTER", range: [0.99, 1.0] }
    ];
    return (
        <div className={styles.sceneTracker}>
            {scenes.map((s, i) => {
                const [start, end] = s.range;
                const mid1 = start + (end - start) * 0.1;
                const mid2 = start + (end - start) * 0.9;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [start, mid1, mid2, end], [0.1, 1, 1, 0.1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(progress, [start, mid1, mid2, end], [0.8, 1.1, 1.1, 0.8]);

                return (
                    <motion.div key={i} className={styles.trackerNode} style={{ opacity, scale }}>
                        <span className={styles.trackerLabel}>{s.id} // {s.label}</span>
                        <div className={styles.trackerDot} />
                    </motion.div>
                );
            })}
        </div>
    );
};

const CinematicImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    return (
        <div className={`${styles.cinematicImageWrap} ${className || ""}`}>
            <motion.img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                    const img = e.currentTarget;
                    img.style.opacity = "1";
                }}
                whileHover={{ scale: 1.08, filter: "brightness(1.1)" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: 0, width: "100%", height: "100%", objectFit: "cover", transform: "translateZ(0)" }}
            />
            <div className={styles.lightSweep} />
        </div>
    );
};

// ─── GRAIN & DEPTH HACKS (Hack 03 + 05) ─────────────────────────
const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── SCENE 01 — OPENING SHOT ──────────────────────────────────────
// Wide establishing shot. Slow push-in via scale on scroll.
// Director note: "Jangan langsung jual. Bangun mood dulu."
const Scene01_Opening = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.8]);
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 150]);

    return (
        <section ref={ref} className={styles.scene01}>
            <motion.div className={styles.heroMedia} style={{ scale, y: yHero }}>
                <img
                    src="/images/template5/hero-bg.jpg"
                    alt="The Tavern — establishing shot"
                    className={styles.heroImage}
                    fetchPriority="high"
                />
                <img
                    src="/images/template5/hero-ambience.jpg"
                    alt="Tavern warm ambience"
                    className={styles.heroImageAlt}
                    decoding="async"
                />
                <ParticleField />
                <motion.div className={styles.heroOverlay} style={{ opacity: overlayOpacity }} />
            </motion.div>
            <div className={styles.heroMinimalUI}>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>REC [●] // LIVE_FEED</span>
                    <span className={styles.hudValue}>06:44:32</span>
                </div>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>CAM_01 // 35MM_PRIME</span>
                    <span className={styles.hudValue}>ISO_800 // F1.4</span>
                </div>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>PROTOCOL_STATUS</span>
                    <span className={styles.hudValue}>INITIATED // AUTH_LEVEL_1</span>
                </div>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>COORDS</span>
                    <span className={styles.hudValue}>-7.0142 / 110.4215</span>
                </div>
            </div>
            <div className={styles.heroScrollIndicator}>
                <motion.div
                    className={styles.scrollDot}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span>PULL_DOWN_TO_ENTER</span>
            </div>
            <div className={styles.heroSceneTag}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2, duration: 2 }}
                    className={styles.sceneTag}
                >
                    SCENE 01 // ESTABLISHING
                </motion.span>
            </div>
        </section>
    );
};

// ─── SCENE 02 — TITLE REVEAL ──────────────────────────────────────
// Static frame. Typography enters like film title.
// Rule: "Tidak ada gerakan lain. Silence = power."
const Scene02_TitleReveal = () => {
    const titleLines = ["THE", "TAVERN"];
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowVideo(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.scene02}>
            {/* BACKGROUND LAYER (Total Black) */}
            <div className={styles.scene02BlackWall} />

            {/* VIDEO PROJECTOR (Only visible through the multiply mask) */}
            <div className={styles.videoProjectorContainer}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.videoInTextBody}
                    src="/videos/template4-steak.mp4"
                    style={{ opacity: showVideo ? 0.9 : 0 }}
                />
            </div>

            {/* THE MULTIPLY MASK (White = Pass, Black = Block) */}
            <div className={`${styles.textMaskMasterLayer} ${showVideo ? styles.maskActive : ''}`}>
                <div className={styles.cinematicHeaderCenter}>
                    {titleLines.map((line, i) => (
                        <div key={i} className={styles.titleLineWrap}>
                            {line.split("").map((char, j) => (
                                <motion.span
                                    key={j}
                                    className={styles.heroTitleChar}
                                    initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{
                                        duration: 1.5,
                                        delay: i * 0.4 + j * 0.08,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    ))}
                    <motion.p
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, letterSpacing: "1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
                        transition={{ duration: 2, delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        EST. MCMXCII // SEMARANG
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 03 — TRANSITION TO STORY ──────────────────────────────
// Camera: Vertical pull upward. User merasa masuk lebih dalam ke ruang.
const Scene03_Transition = () => {
    return (
        <section className={styles.scene03}>
            <div className={styles.scene03Inner}>
                <motion.div
                    className={styles.pullLine}
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.p
                    className={styles.sceneTag}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0.5, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    ENTERING THE STORY
                </motion.p>
            </div>
        </section>
    );
};

// ─── SCENE 04 — LEGACY FLASHBACK ─────────────────────────────────
// Camera: Split narrative (left text, right visual).
// Cross dissolve. Psychology: Trust & authenticity.
const Scene04_Legacy = () => {
    return (
        <section className={styles.scene04}>
            <div className={styles.container}>
                <div className={styles.legacyGrid}>
                    <motion.div
                        className={styles.legacyStory}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.sceneTag}>THE GENESIS</span>
                        <h2 className={styles.sectionTitle}>
                            A Century in<br />the Making.
                        </h2>
                        <p className={styles.sectionDesc}>
                            We started with a single hearth in 1924. A place where warmth
                            was engineered as precisely as flavor. Today, we continue that line—
                            where the physics of the stars meets the nostalgia of home.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.legacyVisual}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img
                            src="/images/template5/legacy.jpg"
                            className={styles.legacyImg}
                            alt="Legacy — the original kitchen"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 05 — GOLDEN HOUR SHIFT ───────────────────────────────
// Camera: Exposure slowly drops. Warm tones increase. 
// "Perubahan harus nyaris tidak terasa."
const Scene05_GoldenHour = () => {
    return (
        <section className={styles.scene05}>
            <motion.div
                className={styles.lightBeam}
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    x: ["-55%", "-45%", "-55%"]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className={styles.tableSurface} />
            <div className={styles.container}>
                <motion.div
                    className={styles.goldenContent}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 3 }}
                >
                    <span className={styles.sceneTag}>PHASE 05 // LIGHT EVOLUTION</span>
                    <h2 className={styles.sectionTitle}>Where Light<br />Meets the Table.</h2>
                    <p className={styles.sectionDesc} style={{ margin: '0 auto' }}>
                        The golden hour at Semarang's most iconic corner. A moment of silence before the evening rush—where every table tells a generational story.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
// Camera: Macro / detail. Slow lateral movement. User controls pace (hover).

const MENU_DATA: Record<string, { name: string; price: string; desc: string; img: string }[]> = {
    "Starter": [
        { name: "Oriental Smoked Salmon Salad", price: "40", desc: "Smoked salmon, carrot, onion, cucumber, tomato, mesclun, sesame seed, soy sauce dressing", img: "/images/template5/starter-salad.jpg" },
        { name: "Caesar Salad", price: "37.5", desc: "Grilled chicken, romaine lettuce, boiled egg, croutons, parmesan cheese, caesar dressing", img: "/images/template5/starter-salad.jpg" },
        { name: "Cream of Mushroom Soup", price: "40", desc: "Creamy and velvety mushroom soup, garlic bread", img: "/images/template5/starter-soup.jpg" },
        { name: "Baked Potato Soup", price: "40", desc: "Cream of chicken, chunky baked potatoes, cheddar cheese, smoked beef", img: "/images/template5/starter-soup.jpg" },
        { name: "Mozzarella Stick", price: "47.5", desc: "Crispy mozzarella cheese, marinara sauce", img: "/images/template5/starter-calamari.jpg" },
        { name: "Calamari", price: "49.5", desc: "Crispy calamari, tartar sauce, lime", img: "/images/template5/starter-calamari.jpg" },
        { name: "Buttermilk Chicken Finger", price: "50", desc: "Crispy buttermilk chicken fillet, fries, cheese sauce", img: "/images/template5/starter-wings.jpg" },
        { name: "Chicken Wings", price: "45", desc: "Fried chicken wings — BBQ, Hot BBQ, Buffalo, or Garlic Parmesan", img: "/images/template5/starter-wings.jpg" },
        { name: "Fish & Chips", price: "50", desc: "Beer battered fish finger, fries, tartar sauce", img: "/images/template5/grill-salmon.jpg" },
        { name: "Onion Rings", price: "37.5", desc: "Crispy golden-brown onion rings, ranch dressing", img: "/images/template5/starter-fries.jpg" },
        { name: "Tostados Nachos", price: "50", desc: "Oven baked tortilla chips, beef ragout, jalapeño, mozzarella & cheddar cheese, tomato salsa", img: "/images/template5/starter-nachos.jpg" },
        { name: "Spicy Garlic Fries", price: "42.5", desc: "Fries, spicy garlic seasoning, ranch dressing", img: "/images/template5/starter-fries.jpg" },
        { name: "Potato Skin", price: "37.5", desc: "Baked potato skin, cheddar sauce, smoked beef, scallion, BBQ aioli", img: "/images/template5/starter-nachos.jpg" },
        { name: "The Tavern Snacks Platter", price: "102.5", desc: "Chicken wings, calamari, fish finger, mozzarella stick, onion rings, fries, tartar sauce & marinara", img: "/images/template5/starter-platter.jpg" },
    ],
    "Grilled": [
        { name: "The Tavern Beef Fillet Steak", price: "165", desc: "Aus tenderloin 180 gr cut", img: "/images/template5/grill-steak.jpg" },
        { name: "Wagyu Ribeye Steak", price: "155", desc: "Aus wagyu ribeye 180 gr cut", img: "/images/template5/grill-wagyu.jpg" },
        { name: "Ribeye Steak", price: "115", desc: "Aus ribeye 180 gr cut", img: "/images/template5/grill-steak.jpg" },
        { name: "New York Strip", price: "135", desc: "Striploin 180 gr cut", img: "/images/template5/grill-wagyu.jpg" },
        { name: "Black Angus Beef Short Ribs", price: "145", desc: "Slow cooked beef short ribs, grilled with hickory BBQ sauce", img: "/images/template5/grill-ribs.jpg" },
        { name: "Grilled Chicken Chop", price: "52.5", desc: "Chicken leg, BBQ sauce", img: "/images/template5/grill-chicken.jpg" },
        { name: "Grilled Chicken Breast", price: "57.5", desc: "Chicken breast, thyme and garlic", img: "/images/template5/grill-chicken.jpg" },
        { name: "Grilled Norwegian Salmon Steak", price: "110", desc: "Norwegian salmon 160 gr skin on", img: "/images/template5/grill-salmon.jpg" },
    ],
    "Indo-Asian": [
        { name: "Beef Satay Maranggi", price: "75.5", desc: "Beef striploin skewer maranggi style, fried rice, acar", img: "/images/template5/indo-satay.jpg" },
        { name: "Bebek Kalio", price: "85", desc: "Crispy half duck, kalio sauce, long bean & sprout bumbu kalas, steam rice, sambal ijo", img: "/images/template5/indo-duck.jpg" },
        { name: "Soto Tangkar", price: "67.5", desc: "Slow cooked beef shank, spicy coconut milk, tomato, potato, scallion, steamed rice", img: "/images/template5/starter-soup.jpg" },
        { name: "Barramundi Sambal Matah", price: "67.5", desc: "Grilled barramundi, steamed rice, sambal matah, lime, acar, emping crackers", img: "/images/template5/grill-salmon.jpg" },
        { name: "Moroccan Lamb Fried Rice", price: "57.5", desc: "Moroccan spice lamb fried rice, fried egg, acar, emping crackers", img: "/images/template5/indo-friedrice.jpg" },
        { name: "Chicken Ham Fried Rice", price: "50", desc: "Chinese style fried rice, smoked chicken, chicken sausage, fried egg", img: "/images/template5/indo-friedrice.jpg" },
    ],
    "Western": [
        { name: "The Tavern Fried Chicken", price: "62.5", desc: "Crispy fried chicken 2 pcs, fries, gravy sauce, salad — original or spicy hot Nashville style", img: "/images/template5/western-friedchicken.jpg" },
        { name: "Giant House Burger Melt", price: "62.5", desc: "Patty burger 180 gr, melting cheddar cheese, gherkin, lettuce, tomato, brioche bun, fries", img: "/images/template5/western-burger.jpg" },
        { name: "Mushroom Burger", price: "67.5", desc: "Patty burger 180 gr, cheddar cheese, sautéed mushroom, tartar dressing, brioche bun, fries", img: "/images/template5/western-burger.jpg" },
        { name: "Fish Fillet Sandwich", price: "52.5", desc: "Fried fish fillet, tomato, gherkin, onion, lettuce, tartar sauce, brioche bun, fries", img: "/images/template5/grill-salmon.jpg" },
        { name: "Cheesy Beef Quesadilla", price: "57.5", desc: "Sautéed sliced beef striploin, melting cheddar, jalapeño, bell pepper, tomato salsa, grilled tortilla", img: "/images/template5/western-quesadilla.jpg" },
        { name: "Beef Stroganoff", price: "80", desc: "Sautéed sliced beef striploin, mushroom & bell pepper, creamy beef gravy, mashed potato", img: "/images/template5/western-stroganoff.jpg" },
        { name: "Swedish Meatball with Gravy", price: "67.5", desc: "Homemade Swedish meatball, mushroom, mashed potato, gravy", img: "/images/template5/western-meatball.jpg" },
    ],
    "Pasta": [
        { name: "Aglio Olio", price: "55", desc: "Smoked chicken, garlic, chilli, olive oil", img: "/images/template5/pasta-aglio.jpg" },
        { name: "Alfredo", price: "57.5", desc: "Smoked beef, mushroom, cream sauce, parmesan cheese", img: "/images/template5/pasta-alfredo.jpg" },
        { name: "Italian Meatball", price: "65", desc: "Italian meatball, basil tomato sauce, parmesan cheese, virgin olive oil", img: "/images/template5/pasta-meatball.jpg" },
        { name: "Basil Garlic Pesto Cream", price: "57.5", desc: "Grilled chicken with creamy garlic, basil pesto", img: "/images/template5/pasta-aglio.jpg" },
    ],
    "Pizza": [
        { name: "Margherita", price: "65", desc: "Fresh tomato, basil, tomato sauce, mozzarella cheese, olive oil", img: "/images/template5/pizza-margherita.jpg" },
        { name: "Carnivore", price: "70", desc: "Ground beef, pepperoni, beef franks, smoked beef, tomato sauce, mozzarella cheese", img: "/images/template5/pizza-carnivore.jpg" },
        { name: "Hawaiian BBQ Chicken", price: "70", desc: "Smoked chicken, chicken sausage, mushroom, onion, bell pepper, hawaiian BBQ sauce, mozzarella", img: "/images/template5/pizza-carnivore.jpg" },
        { name: "Meat Lover", price: "75", desc: "Smoked chicken, chicken sausage, mushroom, onion, bell pepper, BBQ sauce, mozzarella cheese", img: "/images/template5/pizza-margherita.jpg" },
    ],
    "Dessert": [
        { name: "Basque Burnt Cheesecake", price: "42.5", desc: "Traditional burnt cheesecake basque style, sea salt caramel", img: "/images/template5/dessert-cheesecake.jpg" },
        { name: "Vanilla Panna Cotta", price: "37.5", desc: "Italian dessert, sweetened vanilla ice cream, raspberry sauce, strawberry ice cream", img: "/images/template5/dessert-pannacotta.jpg" },
        { name: "Chocolate Avalanche", price: "37.5", desc: "Chocolate lava cake, vanilla ice cream", img: "/images/template5/dessert-lava.jpg" },
    ],
    "Family Platter": [
        { name: "Original Family Platter", price: "400", desc: "Chef's selection of our best-sellers, served for 4-6 people", img: "/images/template5/platter.jpg" },
        { name: "Signature 1 Platter", price: "550", desc: "Cheesy beef quesadilla, wagyu ribeye, smoked brisket, grilled chicken, green salad", img: "/images/template5/starter-platter.jpg" },
        { name: "Signature 2 Platter", price: "550", desc: "Black angus short ribs, smoked brisket, the tavern fried chicken, green salad", img: "/images/template5/starter-platter.jpg" },
        { name: "Munchies Platter", price: "200", desc: "Buttermilk chicken, sausages, sliders, buffalo wings, mozzarella sticks, calamari", img: "/images/template5/starter-platter.jpg" },
    ],
    "Signature Cocktails": [
        { name: "Grass Popper", price: "100", desc: "Vodka, White Rum, Peppermint Liqueur, Vanilla & Chocolate Blanc", img: "/images/template5/cocktail-1.jpg" },
        { name: "Smooky Pooky", price: "100", desc: "Rum, Passion, Housemade cinnamon tea syrup, citrus, ginger beer", img: "/images/template5/cocktail-2.jpg" },
        { name: "Dae-Ju", price: "100", desc: "Soju, Vodka, Yakult, Lychee & Splash of Lemon Lime Soda", img: "/images/template5/cocktail-1.jpg" },
        { name: "Monkey Wrench", price: "100", desc: "Spiced Rum, White Chocolate, Peanut sauce with banana Milk", img: "/images/template5/cocktail-2.jpg" },
        { name: "Clementine Mule", price: "100", desc: "Vodka, Tangerine, Citrus & Ginger Ale", img: "/images/template5/mocktail-1.jpg" },
        { name: "Floral Gin & Tonic", price: "100", desc: "Gin, Elderflower syrup with tonic water", img: "/images/template5/cocktail-1.jpg" },
        { name: "Lychee Beer Sangria", price: "100", desc: "Beer, Lychee Liqueur, Citrus & Fruits", img: "/images/template5/cocktail-2.jpg" },
        { name: "Old Fashioned", price: "120", desc: "Bourbon Whisky, Aromatic Bitter, Sugar", img: "/images/template5/cocktail-1.jpg" },
    ],
    "Indo-Alternative": [
        { name: "Cendol No. 1", price: "37.5", desc: "Black grass jelly, pearl sago, jack fruit, singaraja syrup, vanilla ice cream", img: "/images/template5/drink-cendol.jpg" },
        { name: "Butter Beer", price: "37.5", desc: "Homemade caramel sauce, butterscotch, carbonated drink, whipped cream", img: "/images/template5/drink-butterbeer.jpg" },
        { name: "Es Palu Butung", price: "35", desc: "Banana, coconut pandan, fresh milk, kolang kaling, sago", img: "/images/template5/drink-cendol.jpg" },
        { name: "Es Marem", price: "35", desc: "Cocopandan, peanut, fresh milk, kelapa muda, jackfruit, tape", img: "/images/template5/drink-cendol.jpg" },
        { name: "Buko Pandan", price: "35", desc: "Fresh milk, santan, pandan, kelapa muda, nata de coco", img: "/images/template5/drink-cendol.jpg" },
    ],
    "Sharing Drinks": [
        { name: "Summer Season", price: "45", desc: "Peach, mango, strawberry, orange & citrus, mix fruit topping", img: "/images/template5/drink-sharing.jpg" },
        { name: "Bloody Winter", price: "50", desc: "Strawberry, pineapple, lychee & citrus, mix fruit topping", img: "/images/template5/drink-sharing.jpg" },
    ],
};

const CATEGORIES = Object.keys(MENU_DATA);

const Scene06_Menu = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
    const items = MENU_DATA[activeCategory];

    return (
        <section className={styles.scene06Full}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.sceneTag}>SCENE 06 // THE MENU</span>
                    <h2 className={styles.sectionTitle}>What We Serve.</h2>
                </motion.div>

                {/* ── Category Tabs ── */}
                <div className={styles.menuTabs}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.menuTab} ${activeCategory === cat ? styles.menuTabActive : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Menu Grid ── */}
                <motion.div
                    key={activeCategory}
                    className={styles.menuGrid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={`${activeCategory}-${i}`}
                            className={styles.menuGridCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                        >
                            <div className={styles.menuGridMedia}>
                                <CinematicImage
                                    src={item.img}
                                    alt={item.name}
                                />
                            </div>
                            <div className={styles.menuGridInfo}>
                                <div className={styles.menuGridHeader}>
                                    <h3 className={styles.menuGridName}>{item.name}</h3>
                                    <span className={styles.menuGridPrice}>Rp {item.price}K</span>
                                </div>
                                <p className={styles.menuGridDesc}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// ─── SCENE 07 — EVENTS (THE RITUALS) ─────────────────────────────
const Scene07_Events = () => {
    const events = [
        {
            name: "JAZZ NOIR NIGHT",
            date: "EVERY FRIDAY",
            time: "20:00 — LATE",
            img: "/images/template5/gallery-4.jpg",
            desc: "The saxophone bleeds into the shadows. A ritual of rhythm and smoke for the nocturnal elite.",
            meta: "ISO_MAX // LOW_LIGHT_SESSION"
        },
        {
            name: "WINE PAIRING SERIES",
            date: "MONTHLY",
            time: "19:00 — 22:00",
            img: "/images/template5/gallery-5.jpg",
            desc: "Ancient grapes meet modern steel. A systematic approach to the art of the vintage.",
            meta: "AGED_OAK // TANIN_STRIKE"
        },
        {
            name: "THE PRIVATE TABLE",
            date: "BY APPOINTMENT",
            time: "CUSTOM",
            img: "/images/template5/hero-ambience.jpg",
            desc: "Sanctuary for the few. A bespoke narrative crafted for your most vital milestones.",
            meta: "VVIP_PROTOCOL // SECLUDED"
        }
    ];

    return (
        <section className={styles.scene07EventsCinematic}>
            <div className={styles.container}>
                <motion.div
                    className={styles.ritualsHeader}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className={styles.sceneTag}>TECHNICAL_RITE // 07</span>
                    <h2 className={styles.ritualsTitle}>The Rituals.</h2>
                    <div className={styles.ritualsDivider} />
                </motion.div>

                <div className={styles.ritualsStoryboard}>
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            className={styles.ritualFrame}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: i * 0.2 }}
                            viewport={{ once: true, margin: "-10%" }}
                        >
                            <div className={styles.ritualVisual}>
                                <div className={styles.ritualImageInner}>
                                    <CinematicImage src={event.img} alt={event.name} />
                                    <div className={styles.ritualOverlayLabel}>{event.meta}</div>
                                </div>
                            </div>
                            <div className={styles.ritualData}>
                                <div className={styles.ritualTimeGroup}>
                                    <span>{event.date}</span>
                                    <div className={styles.ritualTimeDot} />
                                    <span>{event.time}</span>
                                </div>
                                <h3 className={styles.ritualName}>{event.name}</h3>
                                <p className={styles.ritualDesc}>{event.desc}</p>
                                <motion.div
                                    className={styles.ritualCTA}
                                    whileHover={{ x: 10 }}
                                >
                                    CONNECT_TO_ACCESS →
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 08 — SOCIAL ENERGY ─────────────────────────────────────
const Scene08_Gallery = () => {
    const images = [
        "/images/template5/gallery-1.jpg",
        "/images/template5/gallery-2.jpg",
        "/images/template5/gallery-3.jpg",
        "/images/template5/gallery-4.jpg",
        "/images/template5/gallery-5.jpg",
    ];

    return (
        <section className={styles.scene08}>
            <div className={styles.container}>
                <span className={styles.sceneTag}>SCENE 08 // ATMOSPHERE</span>
                <div className={styles.galleryGrid}>
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            className={styles.galleryItem}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.08 }}
                            viewport={{ once: true, margin: "-5%" }}
                        >
                            <CinematicImage src={src} alt={`Atmosphere ${i + 1}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 09 — SIGNATURE MOMENT (STILLNESS) ─────────────────────
const Scene09_Signature = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const yImg = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
    const xText = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    return (
        <section ref={containerRef} className={styles.scene09} style={{ overflow: 'hidden' }}>
            <div className={styles.signatureImageWrap}>
                <motion.img
                    style={{ x: xImg, y: yImg }}
                    src="/images/template5/signature.jpg"
                    alt="Signature dish"
                    className={styles.signatureImg}
                />
            </div>

            <motion.div
                className={styles.movingTextBg}
                style={{ x: xText, y: yText, opacity: opacityText }}
            >
                ARCHITECT_OF_FLAVOR
            </motion.div>

            <div className={styles.container} style={{ position: 'relative', zIndex: 5 }}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                >
                    <span className={styles.sceneTag}>THE PROTOCOL</span>
                    <h2 className={styles.sectionTitle}>Precision in Peace.</h2>
                </motion.div>
            </div>
        </section>
    );
};

// ─── NEW: STICKY SCROLL SECTION ──────────────────────────────────
const Scene_StickyDepth = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className={styles.stickyGallerySection}>
            <div className={styles.stickyStage}>
                <motion.div className={styles.stickyContent} style={{ y, scale, opacity }}>
                    <div className={styles.stickyMediaWrap}>
                        <img src="/images/template5/hero-ambience.jpg" alt="Atmosphere" className={styles.stickyImg} />
                        <div className={styles.stickyLabel}>ATMOSPHERIC_DEPTH // 05</div>
                    </div>
                </motion.div>
                <div className={styles.stickyTextLayer}>
                    <motion.h2
                        className={styles.stickyBigTitle}
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        UNVEILING THE <br /><span>INVISIBLE.</span>
                    </motion.h2>
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 10 — PANORAMIC TRANSITION ─────────────────────────────
const Scene10_Panoramic = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className={styles.scene10Minimal}>
            <motion.img
                src="/images/template5/hero-bg.jpg"
                className={styles.panoramaImg}
                style={{ x: xBg, opacity: 0.4 }}
            />
            <div className={styles.panoramaOverlayMinimal}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={styles.minimalLabel}
                    >
                        THE FINAL SELECTION // APPROACHING ORIGIN
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ─── SCENE 11 — THE ULTIMATE CHOICE (Atmospheric Visions) ────────
const Scene11_Interactive = () => {
    const [activeExp, setActiveExp] = useState<{ img: string, title: string, desc: string, protocol: string, stats: string[] } | null>(null);
    const containerRef = useRef(null);

    const exps = [
        {
            title: "CHEF'S GARDEN TABLE",
            img: "/images/template5/gallery-3.jpg",
            desc: "Farm-to-table in its purest form. Seasonal ingredients meet open-fire technique.",
            protocol: "BIO_HARVEST",
            stats: ["TEMP: 800°C", "YIELD: 100%", "ORIGIN: LOCAL"]
        },
        {
            title: "THE DRY AGE VAULT",
            img: "/images/template5/gallery-4.jpg",
            desc: "Witness the process of time. Our signature cuts, aged to absolute perfection.",
            protocol: "TIME_STASIS",
            stats: ["DAYS: 45", "HUMID: 80%", "GRADE: MB5+"]
        },
        {
            title: "OBSERVATORY DECK",
            img: "/images/template5/hero-bg.jpg",
            desc: "Dining under the infinite sky. A panoramic view of the city and our legacy.",
            protocol: "SKY_REACH",
            stats: ["ALT: 125M", "VIEW: 360°", "FLOW: OPEN"]
        }
    ];

    return (
        <section ref={containerRef} className={styles.scene11Visions}>
            <div className={styles.container}>
                <div className={styles.visionsGrid}>
                    <div className={styles.visionsHeader}>
                        <motion.h2
                            className={styles.sectionTitle}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                        >THE JOURNEY'S END.</motion.h2>
                        <motion.div
                            className={styles.visionsSubtitle}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.6 }}
                            transition={{ delay: 0.5 }}
                        >
                            SELECT_YOUR_DESTINATION
                        </motion.div>
                    </div>

                    <div className={styles.visionsList}>
                        {exps.map((exp, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.visionRow} ${activeExp?.protocol === exp.protocol ? styles.visionRowActive : ''}`}
                                onMouseEnter={() => setActiveExp(exp)}
                                onMouseLeave={() => setActiveExp(null)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className={styles.visionMeta}>
                                    <span className={styles.visionIdx}>P_{i + 1}</span>
                                    <div className={styles.visionMetaLine} />
                                </div>
                                <h3 className={styles.visionTitle}>{exp.title}</h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className={styles.visionsCTAWrap}>
                        <motion.a
                            href="#reserve"
                            className={styles.ctaButtonVision}
                            whileHover={{ letterSpacing: '0.6em' }}
                        >
                            SECURE_ACCESS
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* THE FLOATING VESTIGE (Atmospheric Projection) */}
            <motion.div
                className={`${styles.floatingVestige} ${activeExp ? styles.vestigeActive : ''}`}
                animate={{
                    opacity: activeExp ? 1 : 0,
                    scale: activeExp ? 1.05 : 0.9,
                    y: activeExp ? "-50%" : "-45%",
                    x: "-50%",
                    filter: activeExp ? "blur(0px)" : "blur(40px)"
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {activeExp && (
                    <div className={styles.vestigeInner}>
                        <div className={styles.etherealOverlay} />
                        <motion.img
                            key={activeExp.img}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            transition={{ duration: 2 }}
                            src={activeExp.img}
                            className={styles.vestigeImg}
                        />
                        <div className={styles.vestigeContent}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className={styles.vestigeProtocol}>{activeExp.protocol}</span>
                                <h4 className={styles.vestigeTitle}>{activeExp.title}</h4>
                                <p className={styles.vestigeDesc}>{activeExp.desc}</p>
                                <div className={styles.vestigeStats}>
                                    {activeExp.stats.map((s, idx) => (
                                        <span key={idx} className={styles.vestigeStat}>{s}</span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

// ─── SCENE 12 — END CREDITS ──────────────────────────────────────
const Scene12_Footer = () => (
    <footer className={styles.scene12}>
        <div className={styles.container}>
            <div className={styles.footerContent}>
                <div>
                    <h2 className={styles.footerLogo}>TAVERN</h2>
                    <p className={styles.footerMeta}>© 2026 // ALL RIGHTS RESERVED</p>
                </div>
                <div>
                    <p className={styles.footerMeta}>ENCRYPTED ACCESS ONLY // PROTOCOL_L1</p>
                </div>
            </div>
        </div>
    </footer>
);

// ─── MAIN COMPOSITION ────────────────────────────────────────────
export default function Template5() {
    const mainRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["start start", "end end"]
    });

    // SCENE 05 — GOLDEN HOUR SHIFT (Day → Night)
    // Rule: "Perubahan harus nyaris tidak terasa. Bukan perpindahan section, tapi perubahan 'jiwa'."
    // Using Deep Carbon (#0a0a0a) and extremely subtle Aged Brass hints.
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["#0a0a0a", "#0c0b0a", "#0e0d0c", "#0c0b0a", "#080808"]
    );

    return (
        <motion.div ref={mainRef} className={styles.wrapper} style={{ backgroundColor: bgColor }}>
            <GrainOverlay />
            <AmbienceShift />
            <HUDSceneTracker progress={scrollYProgress} />

            <Scene01_Opening />
            <Scene02_TitleReveal />
            <Scene03_Transition />
            <div className={styles.sceneSpacer} />
            <Scene04_Legacy />
            <Scene05_GoldenHour />
            <Scene06_Menu />
            <Scene07_Events />
            <Scene08_Gallery />
            <Scene09_Signature />
            <Scene_StickyDepth />
            <Scene10_Panoramic />
            <Scene11_Interactive />
            <Scene12_Footer />
        </motion.div>
    );
}
