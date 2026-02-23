import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Template4.module.css';

export default function TextMask() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Dramatic Scale from 1 to 200 (huge expansion through text hole)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 250]);

    return (
        <div ref={containerRef} className={styles.textMaskContainer}>
            <div className={styles.stickyMaskWrapper}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.maskedVideo}
                    src="/videos/template4-dining.mp4"
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }} />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.maskedVideo}
                    src="/videos/template4-steak.mp4"
                    style={{ filter: "brightness(0.6) contrast(1.3)", zIndex: 2 }}
                />

                {/* 
                   mix-blend-mode: multiply 
                   Black background -> 0 * Video = Black (Masks video)
                   White text -> 1 * Video = Video (Reveals video)
                */}
                <motion.div
                    className={styles.maskOverlay}
                    style={{ mixBlendMode: 'multiply', zIndex: 3 }}
                >
                    <motion.div
                        style={{ scale }}
                        className={styles.maskTextWrapper}
                    >
                        <h1 className={styles.maskText} style={{
                            margin: 0,
                            letterSpacing: "-0.05em",
                            WebkitTextStroke: "2px #fff"
                        }}>UNVEIL</h1>
                    </motion.div>
                </motion.div>
                <div className={styles.grainOverlay} />
            </div>
        </div>
    );
}
