import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Template4.module.css';

export default function TextMask() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Scale from 1 to 50 (huge expansion)
    const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);

    return (
        <div ref={containerRef} className={styles.textMaskContainer}>
            <div className={styles.stickyMaskWrapper}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={styles.maskedVideo}
                    src="https://videos.pexels.com/video-files/3195383/3195383-uhd_2560_1440_25fps.mp4"
                />

                {/* 
                   mix-blend-mode: multiply 
                   Black background -> 0 * Video = Black (Masks video)
                   White text -> 1 * Video = Video (Reveals video)
                */}
                <motion.div
                    className={styles.maskOverlay}
                    style={{ mixBlendMode: 'multiply' }}
                >
                    <motion.div
                        style={{ scale }}
                        className={styles.maskTextWrapper}
                    >
                        <h1 className={styles.maskText}>UNVEIL</h1>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
