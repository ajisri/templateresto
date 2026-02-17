import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Template4.module.css';

export default function StickyScroll() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <div ref={containerRef} className={styles.stickyContainer}>
            <div className={styles.stickyWrapper}>
                <motion.div
                    style={{ scale, opacity }}
                    className={styles.stickyImageContainer}
                >
                    <img
                        src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Zooming Industrial"
                        className={styles.stickyImage}
                    />
                    <div className={styles.stickyOverlay}>
                        <h2>THE DEPTH OF FLAVOR</h2>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
