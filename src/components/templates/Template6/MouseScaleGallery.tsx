import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './MouseScaleGallery.module.css';

export default function MouseScaleGallery({ img, name }: { img: string, name: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center of CONTAINER to mouse
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const maxDist = 300; // Interaction radius

        // Normalize distance: 1 at center, 0 at maxDist
        const proximity = Math.max(0, 1 - distance / maxDist);

        x.set(proximity);
    };

    const handleMouseLeave = () => {
        x.set(0);
    };

    const springConfig = { stiffness: 120, damping: 20 };
    const springX = useSpring(x, springConfig);

    // Scale the CONTAINER itself
    const scale = useTransform(springX, [0, 1], [1, 1.15]);

    // Z-Index boost when active so it overlaps neighbors
    const zIndex = useTransform(springX, [0, 0.1], [1, 50]);

    return (
        <motion.div
            ref={ref}
            className={styles.galleryContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                scale,
                zIndex,
                transformOrigin: 'center center'
            }}
        >
            <div className={styles.galleryInner}>
                <img
                    src={img}
                    alt={name}
                    className={styles.galleryImage}
                />
            </div>
        </motion.div>
    );
}
