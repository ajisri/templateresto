import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import styles from './Template4.module.css';
import StickyScroll from './StickyScroll';
import TextMask from './TextMask';

// ─── UTILS: GRAIN & DEPTH HACKS ─────────────────────────
const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = () => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05"];

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / height;
            setProgress(scrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={styles.sceneTracker}>
            {scenes.map((s, i) => {
                const start = i / scenes.length;
                const end = (i + 1) / scenes.length;
                const isActive = progress >= start && progress < end;
                return (
                    <div key={i} className={styles.trackerNode} style={{ opacity: isActive ? 1 : 0.2 }}>
                        <span className={styles.trackerLabel}>SCN_{s}</span>
                        <div className={styles.trackerDot} style={{ width: isActive ? '12px' : '6px', background: isActive ? 'var(--t4-accent)' : '#fff' }} />
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
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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
        <div className={styles.wrapper}>
            <GrainOverlay />
            <AmbienceShift />
            <HUDSceneTracker />
            <motion.div
                style={{
                    position: 'fixed',
                    top: "-150px",
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 300px)',
                    zIndex: 0,
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)', // Texture
                    opacity: 0.1,
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
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                        >
                            INDUSTRIAL<br />LUXURY
                        </motion.h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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
