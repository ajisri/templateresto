import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Template4.module.css';
import StickyScroll from './StickyScroll';
import TextMask from './TextMask';
import Lenis from '@studio-freight/lenis';

// ─── UTILS: GRAIN & DEPTH HACKS ─────────────────────────
const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05"];

    useEffect(() => {
        return scrollYProgress.on("change", (latest: number) => {
            setProgress(latest);
        });
    }, [scrollYProgress]);

    return (
        <div className={styles.sceneTracker}>
            {scenes.map((s, i) => {
                const start = i / scenes.length;
                const end = (i + 1) / scenes.length;
                const isActive = progress >= start && progress < end;
                return (
                    <div key={i} className={`${styles.trackerNode} ${isActive ? styles.trackerNodeActive : ''}`}>
                        <span className={styles.trackerLabel}>SCN_{s}</span>
                        <div className={`${styles.trackerDot} ${isActive ? styles.trackerDotActive : ''}`} />
                    </div>
                );
            })}
        </div>
    );
};

const MenuItem = ({ name, price, desc, img, delay }: { name: string, price: string, desc: string, img: string, delay: number }) => (
    <motion.div
        className={styles.menuItem}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className={styles.itemImageContainer}>
            <img src={img} alt={name} className={styles.itemImage} />
        </div>
        <div className={styles.itemHeader}>
            <span className={styles.itemName}>{name}</span>
            <span className={styles.itemPrice}>{price}</span>
        </div>
        <p className={styles.itemDesc}>{desc}</p>
    </motion.div>
);

export default function Template4() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 300]); // Deeper parallax
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const comp = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Hero typography entrance
            gsap.from(".hero-char", {
                y: 100,
                opacity: 0,
                rotate: 20,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });

            // Parallax image within menu items
            const menuImages = gsap.utils.toArray(`.${styles.itemImage}`);
            menuImages.forEach((img: any) => {
                gsap.to(img, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, comp);
        return () => ctx.revert();
    }, []);

    const starters = [
        { name: "Smoked Bone Marrow", price: "185K", desc: "Roasted garlic, parsley salad, grilled sourdough.", img: "/images/template5/starter-platter.jpg" },
        { name: "Wagyu Beef Tartare", price: "210K", desc: "Hand-cut beef, cured egg yolk, capers, truffle oil.", img: "/images/template5/grill-wagyu.jpg" },
    ];

    const mains = [
        { name: "Dry Aged Ribeye", price: "850K", desc: "45 days dry-aged, truffle mash, bordelaise sauce.", img: "/images/template5/grill-steak.jpg" },
        { name: "Pan Seared Scallops", price: "320K", desc: "Cauliflower purée, crispy pancetta, sage butter.", img: "/images/template5/grill-salmon.jpg" },
        { name: "Lamb Shank", price: "450K", desc: "Slow-braised (12h), polenta, roasted root vegetables.", img: "/images/template5/grill-ribs.jpg" },
        { name: "Truffle Risotto", price: "290K", desc: "Arborio rice, wild mushrooms, fresh black truffle, parmesan.", img: "/images/template5/pasta-aglio.jpg" }
    ];

    const bgY = useTransform(scrollY, [0, 2000], [0, 300]);

    return (
        <div className={styles.wrapper} ref={comp}>
            <GrainOverlay />
            <AmbienceShift />
            <HUDSceneTracker scrollYProgress={scrollY} />
            <motion.div
                className={styles.heroBackgroundTextured}
                style={{
                    y: bgY
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <section className={styles.hero}>
                    <div className={styles.heroMinimalUI}>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>CAM_04 // INDUSTRIAL</span>
                            <span className={styles.hudValue}>REC_LOCKED</span>
                        </div>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>ATMOS</span>
                            <span className={styles.hudValue}>AGED_BRASS // DEEP</span>
                        </div>
                    </div>
                    <motion.div style={{ y: y1 }} className={styles.heroContent}>
                        <h1 className={styles.heroTitle} style={{ opacity: opacityHero.get() }}>
                            {"INDUSTRIAL".split("").map((char, i) => (
                                <span key={i} className="hero-char" style={{ display: "inline-block" }}>{char}</span>
                            ))}
                            <br />
                            {"LUXURY".split("").map((char, i) => (
                                <span key={i + 10} className="hero-char" style={{ display: "inline-block" }}>{char}</span>
                            ))}
                        </h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ opacity: opacityHero }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            EST. 2024 • GASTRO PUB • URBAN
                        </motion.p>
                    </motion.div>
                </section>

                <section className={styles.menuSection}>
                    <motion.h2 className={styles.categoryTitle} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>STARTERS</motion.h2>
                    <div className={styles.menuGrid}>
                        {starters.map((item, i) => (
                            <MenuItem key={i} {...item} delay={i * 0.1} />
                        ))}
                    </div>
                </section>

                <StickyScroll />

                <section className={styles.menuSection}>
                    <motion.h2 className={styles.categoryTitle} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>MAINS</motion.h2>
                    <div className={styles.menuGrid}>
                        {mains.map((item, i) => (
                            <MenuItem key={i} {...item} delay={i * 0.1} />
                        ))}
                    </div>
                </section>

                <div className={styles.sceneSpacer} />

                <TextMask />


                <footer className={styles.footer}>
                    <div className={styles.footerGrid}>
                        <div className={styles.fBlock}>
                            <h4>LOCATION</h4>
                            <p>JL. GASTRO NOMIC 24<br />SEMARANG, ID</p>
                        </div>
                        <div className={styles.fBlock}>
                            <h4>CONTACT</h4>
                            <p>+62 811 2233 4455<br />HELLO@TAVERN.CO</p>
                        </div>
                        <div className={styles.fBlock}>
                            <h4>HOURS</h4>
                            <p>11:00 AM — 02:00 AM<br />MON — SUN</p>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <span>LOCAL TAVERN // PROTOCOL 04</span>
                        <span>© 2024 DESIGNED BY DIRECTOR</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
