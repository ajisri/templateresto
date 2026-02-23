import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Template2.module.css';

const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

export default function Template2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();

        // Calculate relative position from center (-0.5 to 0.5)
        const relX = (e.clientX - left) / width - 0.5;
        const relY = (e.clientY - top) / height - 0.5;

        // Define the range of movement (e.g., 80% of canvas size)
        // Adjust these values to control how far it pans
        mouseX.set(-relX * 2400);
        mouseY.set(-relY * 1800);
    };

    const handleZoom = (type: 'in' | 'out' | 'fit') => {
        setScale(prev => {
            if (type === 'fit') return 0.2;
            const newScale = type === 'in' ? prev + 0.1 : prev - 0.1;
            return Math.min(Math.max(newScale, 0.1), 2);
        });
    };

    const items = [
        // Cluster 1: The Menu Pile (Center)
        { id: 'c1-1', content: 'SIGNATURE_BURGER', type: 'image', x: -150, y: -100, rotate: -5, color: '#1a1a1a', size: 'medium' },
        { id: 'c1-2', content: 'AGED_WAGYU', type: 'image', x: 100, y: 50, rotate: 10, color: '#222', size: 'small' },
        { id: 'c1-3', content: 'PROTOCOL_MENU', type: 'text', x: -50, y: -20, rotate: 2, color: '#1a1a1a', size: 'large' },
        { id: 'c1-4', content: 'SECURE_RESERVATION', type: 'text', x: 150, y: -200, rotate: -15, color: '#b89a68', size: 'small' },

        // Cluster 2: The Vibe (Top Left)
        { id: 'c2-1', content: 'ATMOSPHERE', type: 'text', x: -1400, y: -1000, rotate: -10, color: '#1a1a1a', size: 'large' },
        { id: 'c2-2', content: 'BEYOND_SOUND', type: 'image', x: -1200, y: -900, rotate: 5, color: '#0a0a0a', size: 'medium' },
        { id: 'c2-3', content: 'LATE_ACCESS', type: 'text', x: -1500, y: -850, rotate: -20, color: '#222', size: 'small' },

        // Dispersed
        { id: 's1', content: 'STORY_ORIGIN', type: 'text', x: 1200, y: -900, rotate: 15, color: '#1a1a1a', size: 'medium' },
        { id: 's2', content: 'TRADITION', type: 'text', x: 1400, y: 1200, rotate: -5, color: '#222', size: 'medium' },
        { id: 's3', content: 'AGED_BRASS', type: 'image', x: -1200, y: 1300, rotate: 45, color: '#1a1a1a', size: 'large' },
        { id: 's4', content: 'DEEP_CARBON', type: 'image', x: 1800, y: 200, rotate: -20, color: '#222', size: 'medium' },
        { id: 's5', content: 'EST. 1924', type: 'image', x: -2000, y: 400, rotate: 90, color: '#b89a68', size: 'small' },
    ];

    return (
        <div className={`${styles.container} ${hoveredItem ? styles.hasHover : ''}`} ref={containerRef} onPointerMove={handlePointerMove}>
            <GrainOverlay />
            <AmbienceShift />
            <div className={styles.hoverVisual} style={{ opacity: hoveredItem ? 1 : 0 }} />
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <h1>EXPLORER_VIEW</h1>
                    <p>CURSOR TO TRAVERSE THE ARCHIVE</p>
                </div>
                <div className={styles.controls}>
                    <button onClick={() => handleZoom('out')}>-</button>
                    <button onClick={() => handleZoom('fit')} className={styles.relockBtn}>RE-LOCK CAM</button>
                    <span className={styles.scaleValue}>{Math.round(scale * 100)}%</span>
                    <button onClick={() => handleZoom('in')}>+</button>
                </div>
            </header>

            <div className={styles.heroMinimalUI}>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>REC [●] // LIVE_FEED</span>
                    <span className={styles.hudValue}>CURSOR_NAV_ACTIVE</span>
                </div>
                <div className={styles.hudLine}>
                    <span className={styles.hudLabel}>CAM_02 // WIDE_ANGLE</span>
                    <span className={styles.hudValue}>ISO_400 // F2.8</span>
                </div>
            </div>

            <div className={styles.viewport}>
                <motion.div
                    className={styles.canvas}
                    style={{
                        scale,
                        x,
                        y
                    }}
                >
                    <div className={styles.grid}>
                        {items.map(item => (
                            <motion.div
                                key={item.id}
                                className={`${styles.item} ${styles[item.size]}`}
                                style={{
                                    position: 'absolute',
                                    left: `calc(50% + ${item.x}px)`,
                                    top: `calc(50% + ${item.y}px)`,
                                    backgroundColor: item.color,
                                    rotate: item.rotate,
                                    zIndex: hoveredItem === item.id ? 100 : 1
                                }}
                                onHoverStart={() => setHoveredItem(item.id)}
                                onHoverEnd={() => setHoveredItem(null)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.type === 'image' ? (
                                    <div className={styles.placeholderImg}>{item.content}</div>
                                ) : (
                                    <span className={styles.text}>{item.content}</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


