import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './Template1.module.css';
import PixelImage from './PixelImage';

const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05", "06"]; // Added 06 to match 6 cards

    const scrollToPhase = (index: number) => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        window.scrollTo({
            top: (index / (scenes.length - 1)) * height,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        return scrollYProgress.on("change", (latest: number) => {
            setProgress(latest);
        });
    }, [scrollYProgress]);

    return (
        <div className={styles.sceneTracker}>
            {scenes.map((s, i) => {
                const start = (i / scenes.length) - 0.05;
                const end = ((i + 1) / scenes.length) + 0.05;
                const isActive = progress >= start && progress < end;
                return (
                    <div
                        key={i}
                        className={`${styles.trackerNode} ${isActive ? styles.trackerNodeActive : ''}`}
                        onClick={() => scrollToPhase(i)}
                    >
                        <div className={`${styles.trackerDot} ${isActive ? styles.trackerDotActive : ''}`} />
                        <span className={styles.trackerLabel}>PHASE_{s}</span>
                    </div>
                );
            })}
        </div>
    );
};

const Card = ({ index }: { index: number }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });

    const cardImages = [
        "/images/template5/gallery-1.jpg",
        "/images/template5/gallery-2.jpg",
        "/images/template5/gallery-3.jpg",
        "/images/template5/gallery-4.jpg",
        "/images/template5/gallery-5.jpg",
        "/images/template5/legacy.jpg",
    ];

    const cardTitles = [
        "LEGACY_FOUNDATION",
        "MODERN_COMFORT",
        "COMMUNITY_SPACE",
        "CRAFT_CULTURE",
        "FLAVOR_BEYOND",
        "THE_EVOLUTION"
    ];

    return (
        <motion.div
            ref={cardRef}
            className={styles.perspectiveCard}
            style={{
                rotateX: springRotateX,
                rotateY,
                translateZ: z,
                opacity
            }}
        >
            <div className={styles.cardContent}>
                <PixelImage
                    src={cardImages[(index - 1) % cardImages.length]}
                    alt={`Gallery ${index}`}
                    className={styles.cardImage}
                />
                <div className={styles.cardOverlay}>
                    <span className={styles.cardIndex}>PHASE_LOCKED // 0{index}</span>
                    <h3 className={styles.cardTitle}>{cardTitles[(index - 1) % cardTitles.length]}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default function Template1() {
    const containerRef = useRef(null);

    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 2000], [0, 400]);

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <GrainOverlay />
            <AmbienceShift />
            <HUDSceneTracker scrollYProgress={scrollY} />

            <motion.div
                className={styles.heroBackground}
                style={{
                    y: bgY
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <section className={styles.hero}>
                    <div className={styles.heroMinimalUI}>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>CAM_01 // PERSPECTIVE</span>
                            <span className={styles.hudValue}>DEPTH_3D_ENABLED</span>
                        </div>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>LIGHT_MODE</span>
                            <span className={styles.hudValue}>CARBON_VOID // BRASS</span>
                        </div>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        THE TAVERN <br /> <span className={styles.hollow}>REIMAGINED</span>
                    </motion.h1>
                    <p>LEGACY MEETS MODERNITY</p>
                </section>

                <div className={styles.gallery}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} index={i + 1} />
                    ))}
                </div>

                <section className={styles.contact}>
                    <h2>EXPERIENCE THE NEW LOCAL</h2>
                    <div className={styles.button}>SECURE ACCESS</div>
                </section>
            </div>
        </div>
    );
}
