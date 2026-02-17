import { motion, useScroll, useTransform } from 'framer-motion';

import styles from './Template4.module.css';
import StickyScroll from './StickyScroll';
import TextMask from './TextMask';

const MenuItem = ({ name, price, desc, img, delay }: { name: string, price: string, desc: string, img: string, delay: number }) => (
    <motion.div
        className={styles.menuItem}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className={styles.itemImageContainer}>
            <img src={img} alt={name} className={styles.itemImage} />
        </div>
        <div className={styles.itemHeader}>
            <span className={styles.itemName}>{name}</span>
            <span className={styles.itemPrice}>{price}</span>
        </div>
        <p className={styles.itemDesc}>{desc}</p>
    </motion.div>
);

export default function Template4() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    const starters = [
        { name: "Smoked Bone Marrow", price: "185K", desc: "Roasted garlic, parsley salad, grilled sourdough.", img: "https://images.unsplash.com/photo-1544025162-d76690b6d029?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { name: "Wagyu Beef Tartare", price: "210K", desc: "Hand-cut beef, cured egg yolk, capers, truffle oil.", img: "https://images.unsplash.com/photo-1626804475297-411dbcc76bc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    ];

    const mains = [
        { name: "Dry Aged Ribeye", price: "850K", desc: "45 days dry-aged, truffle mash, bordelaise sauce.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { name: "Pan Seared Scallops", price: "320K", desc: "Cauliflower purée, crispy pancetta, sage butter.", img: "https://images.unsplash.com/photo-1599084993091-1e0b0117c372?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { name: "Lamb Shank", price: "450K", desc: "Slow-braised (12h), polenta, roasted root vegetables.", img: "https://images.unsplash.com/photo-1574969903848-18e470877a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
        { name: "Truffle Risotto", price: "290K", desc: "Arborio rice, wild mushrooms, fresh black truffle, parmesan.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
    ];

    const bgY = useTransform(scrollY, [0, 2000], [0, 300]);

    return (
        <div className={styles.wrapper}>
            <motion.div
                style={{
                    position: 'fixed',
                    top: "-150px",
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 300px)',
                    zIndex: 0,
                    backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)', // Texture
                    opacity: 0.1,
                    y: bgY
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <section className={styles.hero}>
                    <motion.div style={{ y: y1 }} className={styles.heroContent}>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                        >
                            INDUSTRIAL<br />LUXURY
                        </motion.h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            EST. 2024 • GASTRO PUB • URBAN
                        </motion.p>
                    </motion.div>
                </section>

                <section className={styles.menuSection}>
                    <motion.h2 className={styles.categoryTitle} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>STARTERS</motion.h2>
                    <div className={styles.menuGrid}>
                        {starters.map((item, i) => (
                            <MenuItem key={i} {...item} delay={i * 0.1} />
                        ))}
                    </div>
                </section>

                <StickyScroll />

                <section className={styles.menuSection}>
                    <motion.h2 className={styles.categoryTitle} initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>MAINS</motion.h2>
                    <div className={styles.menuGrid}>
                        {mains.map((item, i) => (
                            <MenuItem key={i} {...item} delay={i * 0.1} />
                        ))}
                    </div>
                </section>

                <TextMask />

                <footer className={styles.footer}>
                    <p style={{ letterSpacing: '0.2em', color: '#555' }}>TAVERN GROUP • RESERVATIONS OPEN</p>
                </footer>
            </div>
        </div>
    );
}
