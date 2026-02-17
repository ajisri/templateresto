import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Template4.module.css';

export default function StickyScroll() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8]);

    return (
        <div ref={containerRef} className={styles.stickyContainer}>
            <div className={styles.stickyWrapper}>
                <motion.div
                    style={{ scale, opacity }}
                    className={styles.stickyImageContainer}
                >
                    <img
                        src="/images/template5/hero-ambience.jpg"
                        alt="The Kitchen"
                        className={styles.stickyImage}
                    />
                    <div className={styles.stickyOverlay}>
                        <h2 className={styles.stickyTitle}>THE DEPTH OF FLAVOR</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
