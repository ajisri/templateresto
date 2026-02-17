import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Template2.module.css';

export default function Template2() {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    const handleZoom = (type: 'in' | 'out' | 'fit') => {
        setScale(prev => {
            if (type === 'fit') return 0.2;
            const newScale = type === 'in' ? prev + 0.1 : prev - 0.1;
            return Math.min(Math.max(newScale, 0.1), 2);
        });
    };

    const items = [
        // Cluster 1: The Menu Pile (Center)
        { id: 'c1-1', content: 'BURGER', type: 'image', x: -150, y: -100, rotate: -5, color: '#ff2e63', size: 'medium' },
        { id: 'c1-2', content: 'FRIES', type: 'image', x: 100, y: 50, rotate: 10, color: '#08d9d6', size: 'small' },
        { id: 'c1-3', content: 'MENU', type: 'text', x: -50, y: -20, rotate: 2, color: '#fff', size: 'large' },
        { id: 'c1-4', content: 'Order Now', type: 'text', x: 150, y: -200, rotate: -15, color: '#ffeb3b', size: 'small' },

        // Cluster 2: The Vibe (Top Left)
        { id: 'c2-1', content: 'PARTY', type: 'text', x: -1400, y: -1000, rotate: -10, color: '#39ff14', size: 'large' },
        { id: 'c2-2', content: 'DJ SET', type: 'image', x: -1200, y: -900, rotate: 5, color: '#000', size: 'medium' },
        { id: 'c2-3', content: '10PM', type: 'text', x: -1500, y: -850, rotate: -20, color: '#fff', size: 'small' },

        // Dispersed
        { id: 's1', content: 'LOCAL', type: 'text', x: 1200, y: -900, rotate: 15, color: '#fff', size: 'medium' },
        { id: 's2', content: 'TAVERN', type: 'text', x: 1400, y: 1200, rotate: -5, color: '#ff2e63', size: 'medium' },
        { id: 's3', content: 'BEER', type: 'image', x: -1200, y: 1300, rotate: 45, color: '#08d9d6', size: 'large' },
        { id: 's4', content: 'WINE', type: 'image', x: 1800, y: 200, rotate: -20, color: '#39ff14', size: 'medium' },
        { id: 's5', content: 'GIN', type: 'image', x: -2000, y: 400, rotate: 90, color: '#ffeb3b', size: 'small' },
    ];

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.header}>
                <h1>LOCAL TAVERN</h1>
                <p>DRAG TO EXPLORE</p>
                <div className={styles.controls}>
                    <button onClick={() => handleZoom('out')}>-</button>
                    <button onClick={() => handleZoom('fit')} style={{ width: 'auto', padding: '0 1rem' }}>FIT ALL</button>
                    <span>{Math.round(scale * 100)}%</span>
                    <button onClick={() => handleZoom('in')}>+</button>
                </div>
            </div>

            <div className={styles.viewport}>
                <motion.div
                    className={styles.canvas}
                    drag
                    dragConstraints={false}
                    dragElastic={0}
                    dragMomentum={true}
                    style={{ scale }}
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
                                    rotate: item.rotate
                                }}
                                whileHover={{ scale: 1.1, zIndex: 100 }}
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


