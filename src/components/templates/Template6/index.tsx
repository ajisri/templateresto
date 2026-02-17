import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Template6.module.css';
import PerspectiveText from './PerspectiveText';
import PixelTransition from './PixelTransition';

import MouseScaleGallery from './MouseScaleGallery';

const MenuBlock = ({ name, price, desc, img, spans = 4 }: { name: string, price: string, desc: string, img?: string, spans?: number }) => (
    <motion.div
        className={styles.block}
        style={{ gridColumn: `span ${spans}`, overflow: 'visible', zIndex: 1 }} // Allow overlap
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
        {img && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <MouseScaleGallery img={img} name={name} />
                {/* Gradient overlay inside gallery handled by CSS or just remove if not needed, let's keep it simple for scale effect */}
            </div>
        )}
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
            <span className={styles.blockPrice}>{price}</span>
            <h3 className={styles.blockTitle}>{name}</h3>
            <p className={styles.blockDesc}>{desc}</p>
        </div>
    </motion.div>
);

export default function Template6() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <motion.div
                style={{
                    position: 'fixed',
                    top: "-150px",
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 300px)',
                    zIndex: 0,
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    y: useTransform(scrollYProgress, [0, 1], [0, 200])
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <PixelTransition />

                <header className={styles.header}>
                    <PerspectiveText text="TAVERN" />
                    <div className={styles.metaInfo}>
                        LAT: 6.9667° S <br />
                        LON: 110.4167° E <br />
                        EST. MMXII
                    </div>
                </header>

                <div className={styles.grid}>
                    <div className={styles.largeInfo}>
                        <div className={styles.largeInfoText}>
                            INDUSTRIAL <span>LUXURY</span>
                        </div>
                    </div>

                    {/* ROW 1 */}
                    <MenuBlock
                        name="Wagyu Tartare"
                        price="210K"
                        desc="Hand-cut A5 Wagyu, cured egg yolk, capers, truffle oil emulsion."
                        spans={6}
                        img="https://images.unsplash.com/photo-1546241072-48010ad28d5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    />
                    <MenuBlock
                        name="Bone Marrow"
                        price="185K"
                        desc="Roasted with garlic herb butter, parsley salad, grilled sourdough."
                        spans={6}
                    />

                    {/* ROW 2 */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>01 //</span>
                        <h2 className={styles.catTitle}>MAINS</h2>
                    </div>

                    <MenuBlock
                        name="Dry Aged Ribeye"
                        price="850K"
                        desc="45 Days dry-aged, bordelaise sauce, truffle mash."
                        spans={8}
                        img="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    />
                    <MenuBlock
                        name="Truffle Risotto"
                        price="290K"
                        desc="Arborio rice, wild mushrooms, fresh black truffle."
                        spans={4}
                    />

                    {/* ROW 3 */}
                    <MenuBlock
                        name="Pan Seared Scallops"
                        price="320K"
                        desc="Cauliflower purée, crispy pancetta, sage butter."
                        spans={4}
                    />
                    <MenuBlock
                        name="Lamb Shank"
                        price="450K"
                        desc="Slow-braised (12h), polenta, roasted root vegetables."
                        spans={4}
                    />
                    <MenuBlock
                        name="Lobster Thermidor"
                        price="850K"
                        desc="Whole lobster, creamy cognac sauce, gruyere cheese."
                        spans={4}
                        img="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    />

                </div>
            </div>
        </div>
    );
}
