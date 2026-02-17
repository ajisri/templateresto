import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import styles from './Template1.module.css';
import PixelImage from './PixelImage';

const Card = ({ index, color }: { index: number, color: string }) => {
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
                    src={`https://picsum.photos/seed/${index + 40}/800/1000`}
                    alt={`Gallery ${index}`}
                    className={styles.cardImage}
                />
                <div className={styles.cardOverlay} style={{ background: color }}>
                    <span className={styles.cardIndex}>PHASE_{index < 10 ? `0${index}` : index}</span>
                    <h3 className={styles.cardTitle}>CONCEPT {index}</h3>
                </div>
            </div>
        </motion.div>
    );
};

export default function Template1() {
    const containerRef = useRef(null);
    const colors = ['#39ff14', '#ff2e63', '#08d9d6', '#ffeb3b', '#ffffff', '#ff7b00'];

    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 2000], [0, 400]);

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <motion.div
                style={{
                    position: 'fixed',
                    top: "-200px", // Offset for parallax
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 400px)',
                    zIndex: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.2,
                    y: bgY
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <section className={styles.intro}>
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        PERSPECTIVE <br /> <span className={styles.hollow}>REDEFINED</span>
                    </motion.h1>
                    <p>SCROLL TO ROTATE REALITY</p>
                </section>

                <div className={styles.gallery}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Card key={i} index={i + 1} color={colors[i % colors.length]} />
                    ))}
                </div>

                <section className={styles.contact}>
                    <h2>RESERVE YOUR SPACE</h2>
                    <div className={styles.button}>GO BEYOND</div>
                </section>
            </div>
        </div>
    );
}
