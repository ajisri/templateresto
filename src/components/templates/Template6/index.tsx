import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Template6.module.css';
import PerspectiveText from './PerspectiveText';
import PixelTransition from './PixelTransition';

const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = () => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05", "06"];

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
                        <div className={styles.trackerDot} style={{ height: isActive ? '32px' : '16px', background: isActive ? 'var(--t6-accent)' : '#fff' }} />
                        <span className={styles.trackerLabel}>BLOCK_{s}</span>
                    </div>
                );
            })}
        </div>
    );
};

import MouseScaleGallery from './MouseScaleGallery';

const MenuBlock = ({ name, price, desc, img, spans = 4 }: { name: string, price: string, desc: string, img?: string, spans?: number }) => (
    <motion.div
        className={styles.block}
        style={{ gridColumn: `span ${spans}`, overflow: 'visible', zIndex: 1 }} // Allow overlap
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
        {img && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <MouseScaleGallery img={img} name={name} />
                {/* Gradient overlay inside gallery handled by CSS or just remove if not needed, let's keep it simple for scale effect */}
            </div>
        )}
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
            <span className={styles.blockPrice}>{price}</span>
            <h3 className={styles.blockTitle}>{name}</h3>
            <p className={styles.blockDesc}>{desc}</p>
        </div>
    </motion.div>
);

export default function Template6() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className={styles.wrapper}>
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
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    y: useTransform(scrollYProgress, [0, 1], [0, 200])
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <PixelTransition />

                <header className={styles.header}>
                    <PerspectiveText text="TAVERN" />
                    <div className={styles.heroMinimalUI}>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>REC_MODE</span>
                            <span className={styles.hudValue}>EDITORIAL_TRANSFORMATION</span>
                        </div>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>CAM_06</span>
                            <span className={styles.hudValue}>PRIME_35MM</span>
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* TRANSFORMATION BLOCK */}
                    <div className={styles.largeInfo} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <motion.div
                            className={styles.transformationStory}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                        >
                            <div className={styles.largeInfoText}>
                                LEGACY <span>EVOLVED</span>
                            </div>
                            <p className={styles.storyText} style={{ maxWidth: '70ch', margin: '3rem auto 0', fontSize: '1.2rem', lineHeight: '1.8', color: '#888' }}>
                                Local Tavern is the transformation of The Tavern, a culinary icon in Semarang for over a decade.
                                Blending a legacy of flavor and warmth with a fresh, inclusive, and modern identity.
                                It's a social space where stories, moments, and community come together.
                                <br /><br />
                                <span style={{ color: 'var(--t6-accent)' }}>Where old memories meet new experiences.</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* ROW 1: LEGACY ITEMS */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>01 //</span>
                        <h2 className={styles.catTitle}>THE LEGACY</h2>
                    </div>

                    <MenuBlock
                        name="Wagyu Tartare"
                        price="210K"
                        desc="Hand-cut A5 Wagyu, cured egg yolk, capers, truffle oil emulsion."
                        spans={6}
                        img="/images/template5/grill-wagyu.jpg"
                    />
                    <MenuBlock
                        name="Bone Marrow"
                        price="185K"
                        desc="Roasted with garlic herb butter, parsley salad, grilled sourdough."
                        spans={6}
                        img="/images/template5/starter-platter.jpg"
                    />

                    {/* ROW 2: MODERN MAINS */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>02 //</span>
                        <h2 className={styles.catTitle}>MODERN MAINS</h2>
                    </div>

                    <motion.div
                        className={styles.block}
                        style={{ gridColumn: 'span 12', height: '80vh', overflow: 'hidden' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <div style={{ position: 'absolute', inset: 0 }}>
                            <MouseScaleGallery
                                img="/images/template5/grill-steak.jpg"
                                name="DRY_AGED_RIBEYE"
                            />
                        </div>
                        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
                            <span className={styles.blockPrice}>850K // HERO_SELECTION</span>
                            <h3 className={styles.blockTitle} style={{ fontSize: '4rem' }}>DRY AGED RIBEYE</h3>
                            <p className={styles.blockDesc}>45 Days dry-aged over local coffee wood, truffle mash, bordelaise.</p>
                        </div>
                    </motion.div>

                    <MenuBlock
                        name="Truffle Risotto"
                        price="290K"
                        desc="Arborio rice, wild mushrooms, fresh black truffle."
                        spans={4}
                    />
                    <MenuBlock
                        name="Pan Seared Scallops"
                        price="320K"
                        desc="Cauliflower purée, crispy pancetta, sage butter."
                        spans={4}
                        img="/images/template5/grill-salmon.jpg"
                    />
                    <MenuBlock
                        name="Lamb Shank"
                        price="450K"
                        desc="Slow-braised (12h), polenta, roasted root vegetables."
                        spans={4}
                        img="/images/template5/grill-ribs.jpg"
                    />
                </div>

                <div className={styles.sceneSpacer} />

                <footer className={styles.footer}>
                    <div className={styles.fGrid}>
                        <div className={styles.fText}>
                            <h3>LOCAL TAVERN</h3>
                            <p>ESTABLISHED IN SEMARANG • MMXII — MMXXIV</p>
                        </div>
                        <div className={styles.fLinks}>
                            <span>INSTAGRAM</span>
                            <span>RESERVATIONS</span>
                            <span>MEMORIES</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
