import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Template6.module.css';

export default function PixelTransition() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    const columns = 12; // increased for better resolution
    const rows = 12;

    const totalWidth = 100;
    const totalHeight = 100;

    const blocks = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Calculate distance from center (5.5, 5.5)
            const dx = c - (columns - 1) / 2;
            const dy = r - (rows - 1) / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            blocks.push({
                r, c, dist
            });
        }
    }

    return (
        <div className={styles.pixelContainer}>
            {blocks.map((b, i) => (
                <motion.div
                    key={i}
                    className={styles.pixelBlock}
                    style={{
                        width: `${totalWidth / columns}vw`,
                        height: `${totalHeight / rows}vh`,
                    }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: b.dist * 0.1, // Delay based on distance from center
                        ease: "circIn"
                    }}
                />
            ))}
        </div>
    );
}
