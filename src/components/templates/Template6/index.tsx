import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Template6.module.css';
import PerspectiveText from './PerspectiveText';
import PixelTransition from './PixelTransition';

const GrainOverlay = () => <div className={styles.grainOverlay} />;
const AmbienceShift = () => <div className={styles.gradientShift} />;

// ─── UTILS: HUD SCENE TRACKER ────────────────────────────────
const HUDSceneTracker = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05", "06"];

    useEffect(() => {
        return scrollYProgress.on("change", (latest: number) => {
            setProgress(latest);
        });
    }, [scrollYProgress]);

    return (
        <div className={styles.sceneTracker}>
            {scenes.map((s, i) => {
                const start = i / scenes.length;
                const end = (i + 1) / scenes.length;
                const isActive = progress >= start && progress < end;
                return (
                    <div key={i} className={styles.trackerNode} style={{ opacity: isActive ? 1 : 0.2 }}>
                        <div className={styles.trackerDot} style={{ height: isActive ? '32px' : '16px', background: isActive ? 'var(--t6-accent)' : '#fff' }} />
                        <span className={styles.trackerLabel}>BLOCK_{s}</span>
                    </div>
                );
            })}
        </div>
    );
};

import MouseScaleGallery from './MouseScaleGallery';

const MenuBlock = ({ name, price, desc, img, spans = 4 }: { name: string, price: string, desc: string, img?: string, spans?: number }) => (
    <motion.div
        className={styles.block}
        style={{ gridColumn: `span ${spans}`, zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className={styles.blockImageArea}>
            {img ? (
                <div className={styles.blockImageInner}>
                    <MouseScaleGallery img={img} name={name} />
                </div>
            ) : (
                <div className={styles.blockImagePlaceholder} />
            )}
        </div>
        <div className={styles.blockTextArea}>
            <h3 className={styles.blockTitle}>{name}</h3>
            <p className={styles.blockDesc}>{desc}</p>
            <div className={styles.blockPriceWrapper}>
                <span className={styles.blockPrice}>{price}</span>
            </div>
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
            <GrainOverlay />
            <AmbienceShift />
            <HUDSceneTracker scrollYProgress={scrollYProgress} />
            <motion.div
                style={{
                    position: 'fixed',
                    top: "-150px",
                    left: 0,
                    width: '100%',
                    height: 'calc(100% + 300px)',
                    zIndex: 0,
                    backgroundImage: 'url(/images/dark-matter.png)',
                    opacity: 0.4,
                    pointerEvents: 'none',
                    y: useTransform(scrollYProgress, [0, 1], [0, 200])
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <PixelTransition />

                <header className={styles.header}>
                    <PerspectiveText text="TAVERN" />
                    <div className={styles.heroMinimalUI}>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>REC_MODE</span>
                            <span className={styles.hudValue}>EDITORIAL_TRANSFORMATION</span>
                        </div>
                        <div className={styles.hudLine}>
                            <span className={styles.hudLabel}>CAM_06</span>
                            <span className={styles.hudValue}>PRIME_35MM</span>
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* TRANSFORMATION BLOCK */}
                    <div className={styles.largeInfo} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <motion.div
                            className={styles.transformationStory}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                        >
                            <div className={styles.largeInfoText}>
                                THE <span>TAVERN</span>
                            </div>
                            <p className={styles.storyText} style={{ maxWidth: '75ch', margin: '3rem auto 0', fontSize: '1.2rem', lineHeight: '1.8', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                A CINEMATIC EXPLORATION OF SEMARANG'S CULINARY ICON. FROM ITS DISTINCTIVE SPATIAL ANATOMY TO THE UNSPOKEN RITUALS OF ITS PATRONS, EVERY DETAIL CONTRIBUTES TO AN ATMOSPHERE UNMATCHED IN THE CITY.
                                <br /><br />
                                <span style={{ color: 'var(--t6-accent)' }}>ARCHITECTURAL MEMORIES // SOCIAL CONSTANTS</span>
                            </p>
                        </motion.div>
                    </div>

                    {/* 01: ANATOMI RUANG */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>01 //</span>
                        <h2 className={styles.catTitle}>ANATOMI RUANG</h2>
                    </div>

                    <MenuBlock
                        name="The Heart"
                        price="ZONE_A // BAR"
                        desc="GRAVITASI UTAMA RESTORAN. KONSTRUKSI KURSI KAYU TINGGI. PENCAHAYAAN MINIMAL MENGISOLASI DENTING GELAS DAN MESIN KOPI. ZONA EKSKLUSIF UNTUK PATRON SOLO."
                        spans={4}
                        img="/images/template5/hero-ambience.jpg"
                    />
                    <MenuBlock
                        name="The Lounge"
                        price="ZONE_B // SOFA"
                        desc="DIKELILINGI STRUKTUR BATA MENTAH. SECARA SPESIFIK DILENGKAPI MATERIAL KULIT VINTAGE. DISTRIK KHUSUS ELIT UNTUK DURASI MENETAP MAKSIMAL."
                        spans={4}
                        img="/images/template5/gallery-1.jpg"
                    />
                    <MenuBlock
                        name="The Veranda"
                        price="ZONE_C // OUTDOOR"
                        desc="TERPAPAR LANGSUNG DERU TANJAKAN RINJANI. FRIKSI AKUSTIK TINGGI, NAMUN DIKOMPENSASI OLEH SIRKULASI ANGIN PERBUKITAN SEMARANG. DINAMIS."
                        spans={4}
                        img="/images/template5/gallery-2.jpg"
                    />

                    {/* 02: SOUNDSCAPE */}
                    <div className={styles.videoSection} style={{ gridColumn: 'span 12' }}>
                        <div className={styles.videoWrapper}>
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="/images/template5/hero-ambience.jpg"
                                className={styles.video}
                            >
                                <source src="/videos/template6-soundscape.mp4" type="video/mp4" />
                            </video>
                            <div className={styles.videoOverlay}>
                                <div className={styles.videoText}>
                                    <span className={styles.videoTag}>02 // AKUSTIK & SOUNDSCAPE</span>
                                    <h2 className={styles.videoTitle}>JAZZ, BLUES &<br /><span>CLASSIC ROCK</span></h2>
                                    <p style={{ color: '#ccc', maxWidth: '600px', margin: '2rem auto 0', fontSize: '1.2rem', lineHeight: '1.5', textShadow: '0 2px 8px rgba(0,0,0,0.8)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                        PERPADUAN DINAMIS ANTARA MUSIK LATAR, SHAKER KOKTAIL, DAN PANTULAN GUMAM DI DINDING BATA MENTAH. MALAM MEMBERIKAN TRANSISI ENERGI MELALUI BAND LOKAL DENGAN TEMBANG LEGENDARIS.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 03: MATERIALITAS */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>03 //</span>
                        <h2 className={styles.catTitle}>MATERIALITAS</h2>
                    </div>

                    <MenuBlock
                        name="Thermal Warm"
                        price="LUX // 2700K"
                        desc="SPESIFIKASI CAHAYA KONSISTEN. ABSENSI NEON DINGIN GUNA MENJAMIN OVERLAY WARNA DAGING DAN AMBER BIR TEREKSPOS PRESISI."
                        spans={4}
                        img="/images/template5/gallery-5.jpg"
                    />
                    <MenuBlock
                        name="Taktil Klasik"
                        price="SURFACE // MENU"
                        desc="PENGGUNAAN KERTAS TEBAL DAN CLIPBOARD KAYU PRESISI DENGAN TIPOGRAFI KLASIK. MENGHASILKAN SENSASI TAKTIL BERAT DAN BERKELAS."
                        spans={4}
                        img="/images/template5/menu-1.jpg"
                    />
                    <MenuBlock
                        name="Industrial"
                        price="BASE // LANTAI"
                        desc="PEMAKAIAN POLA UBIN VINTAGE BERPADU HAMPARAN SEMEN POLES. KONSTRUKSI ESTETIK PABRIK TUA DENGAN TINGKAT KEBERSIHAN LABORATORIUM."
                        spans={4}
                        img="/images/template5/gallery-3.jpg"
                    />

                    {/* 04 & 05: RITUAL & GEOGRAFIS */}
                    <motion.div
                        className={styles.block}
                        style={{ gridColumn: 'span 12', height: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ position: 'absolute', inset: 0 }}>
                            <MouseScaleGallery
                                img="/images/template5/legacy.jpg"
                                name="RINJANI_DISTRICT"
                            />
                        </div>
                        {/* A strong overlay so the blur box stands out, and background is readable */}
                        <div className={styles.ritualOverlay} />

                        <div className={styles.ritualGlassBox}>
                            <span className={styles.blockPrice} style={{ marginTop: 0, marginBottom: '1rem' }}>04 & 05 // GEO-RITUAL</span>
                            <h3 className={styles.blockTitle} style={{ fontSize: '3.5rem', lineHeight: 1.1, margin: 0 }}>SEGITIGA EMAS <br /> RINJANI</h3>
                            <p className={styles.blockDesc} style={{ maxWidth: '100%', color: '#ccc', fontSize: '1.2rem', marginTop: '2rem', lineHeight: 1.8, textTransform: 'uppercase', letterSpacing: '0.02em', fontStyle: 'normal' }}>
                                DIAPIT KONSTRUKSI KOLONIAL. MENJEMBATANI SEJARAH LOKAL DAN GAYA HIDUP MODERN. SUHU 2 DERAJAT LEBIH RENDAH DARI SIMPANG LIMA, MENYEMPURNAKAN KONSUMSI ALKOHOL DAN MENU HANGAT.<br /><br />
                                BARISAN MOBIL MEWAH DI TANJAKAN MENJADI INDIKATOR AKTIVITAS. KESEPAKATAN SMART-CASUAL TAK TERTULIS MENGAKOMODASI PANGGUNG INTERAKSI PARA ELITE SEMARANG ATAS.
                            </p>
                        </div>
                    </motion.div>

                    {/* 06: THE NITTY GRITTY */}
                    <div className={styles.categoryHeader}>
                        <span style={{ fontFamily: 'Courier New', color: '#666' }}>06 //</span>
                        <h2 className={styles.catTitle}>THE NITTY-GRITTY</h2>
                    </div>

                    <MenuBlock
                        name="The Condiments"
                        price="DETAILS // SAUCE"
                        desc="PRESENSI BOTOL WORCESTERSHIRE DAN TABASCO SEBAGAI ELEMEN OTENTIK. MENEGASKAN IDENTITAS WESTERN PUB YANG FUNGSIONAL DAN KENTAL."
                        spans={6}
                        img="/images/template5/gallery-4.jpg"
                    />
                    <MenuBlock
                        name="Hearty Plating"
                        price="DETAILS // SERVING"
                        desc="STEAK DISAJIKAN DI ATAS TALENAN KAYU BANGUNAN ATAU PORSELEN BERAT. SEBUAH KEJUJURAN PORSI TANPA BASA-BASI VISUAL."
                        spans={6}
                        img="/images/template5/grill-steak.jpg"
                    />
                </div>

                <div className={styles.sceneSpacer} />

                <footer className={styles.footer}>
                    <div className={styles.fGrid}>
                        <div className={styles.fText}>
                            <h3>LOCAL TAVERN</h3>
                            <p>ESTABLISHED IN SEMARANG • MMXII — MMXXIV</p>
                        </div>
                        <div className={styles.fLinks}>
                            <span>INSTAGRAM</span>
                            <span>RESERVATIONS</span>
                            <span>MEMORIES</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
