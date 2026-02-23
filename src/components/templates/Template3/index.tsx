import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Template3.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─── UTILS: HUD SCENE TRACKER (Director's Cut Style) ─────
const HUDSceneTracker = ({ scrollYProgress }: { scrollYProgress: any }) => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05", "06", "07"];

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
                        <div className={styles.trackerDot} style={{ height: isActive ? '24px' : '12px', background: isActive ? 'var(--t3-accent)' : '#fff' }} />
                        <span className={styles.trackerLabel}>SCN_{s}</span>
                    </div>
                );
            })}
        </div>
    );
};

// Floating Image Follower for Menu
const MenuImageFollower = ({ activeImage, activeName }: { activeImage: string | null, activeName: string | null }) => {
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
            if (followerRef.current) {
                gsap.to(followerRef.current, {
                    x: mouseX.current + 40,
                    y: mouseY.current - 180,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={followerRef}
            className={styles.imageFollower}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
                opacity: activeImage ? 1 : 0,
                scale: activeImage ? 1 : 0.8,
                rotate: activeImage ? 3 : -5
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 1000
            }}
        >
            {activeImage && (
                <div className={styles.followerInner}>
                    <img src={activeImage} alt={activeName || ""} className={styles.followerImg} />
                    <div className={styles.followerTag}>
                        <span className={styles.tagLabel}>PREVIEW</span>
                        <h4 className={styles.tagName}>{activeName}</h4>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

import { useScroll } from 'framer-motion';

export default function Template3() {
    const component = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Title Animation
            gsap.from(".hero-title-char", {
                y: 150,
                opacity: 0,
                rotate: 10,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            });

            // Horizontal Scroll Section
            const slider = sliderRef.current;
            if (slider) {
                // Calculate width to scroll: scrollWidth of track - viewport width
                const track = slider.querySelector(`.${styles.hTrack}`);
                if (track) {
                    const totalWidth = track.scrollWidth - window.innerWidth;

                    gsap.to(track, {
                        x: -totalWidth,
                        ease: "none",
                        scrollTrigger: {
                            trigger: slider,
                            pin: true,
                            scrub: 1,
                            start: "top top",
                            end: () => `+=${totalWidth}`,
                            anticipatePin: 1
                        }
                    });
                }
            }

            // Background Atmosphere Transitions
            const atmosphereZones = [
                { trigger: `.${styles.hero}`, color: "#0a0a0a" },
                { trigger: `.${styles.manifesto}`, color: "#0c0b0a" },
                { trigger: `.${styles.horizontalSection}`, color: "#0a0a0a" },
                { trigger: `.${styles.gallerySection}`, color: "#0e0d0c" },
                { trigger: `.${styles.menuSection}`, color: "#0a0a0a" },
            ];

            atmosphereZones.forEach((zone) => {
                ScrollTrigger.create({
                    trigger: zone.trigger,
                    start: "top 60%", // Earlier trigger
                    end: "bottom 40%",
                    onEnter: () => gsap.to(`.${styles.container}`, { backgroundColor: zone.color, duration: 2, ease: "sine.inOut" }),
                    onEnterBack: () => gsap.to(`.${styles.container}`, { backgroundColor: zone.color, duration: 2, ease: "sine.inOut" })
                });
            });

            // Image Parallax Passing Effect
            const archiveItems = gsap.utils.toArray('.parallax-item');
            archiveItems.forEach((item: any, i) => {
                // Controlled subtle parallax so grid remains intact
                const speed = 100 + (i % 3) * 50;
                gsap.fromTo(item,
                    { y: speed },
                    {
                        y: -speed,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            });

            // Text Reveal
            const reveals = gsap.utils.toArray('.text-reveal');
            reveals.forEach((text: any) => {
                gsap.from(text, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                    }
                });
            });

            // Menu Poster Mouse Interaction
            const menuPosters = gsap.utils.toArray(`.${styles.menuPoster}`);
            menuPosters.forEach((poster: any) => {
                poster.addEventListener('mousemove', (e: MouseEvent) => {
                    const { left, top, width, height } = poster.getBoundingClientRect();
                    const x = ((e.clientX - left) / width) * 100;
                    const y = ((e.clientY - top) / height) * 100;
                    poster.style.setProperty('--mouse-x', `${x}%`);
                    poster.style.setProperty('--mouse-y', `${y}%`);
                });
            });

            // Fixed Background Parallax
            gsap.to(".parallax-bg-fixed", {
                y: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: component.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            // Refresh ScrollTrigger to ensure proper heights are read after rendering
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

        }, component);

        return () => ctx.revert();
    }, []);


    const splitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="hero-title-char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    const menuItems = [
        { name: 'SIGNATURE BURGER', price: '$22', desc: '45-Day Dry Aged Beef, Smoked Bone Marrow Butter, Caramelized Roscoff Onions, Brioche.', img: '/images/template5/western-burger.jpg' },
        { name: 'LOCAL CRAFT BEER', price: '$14', desc: 'Indonesian Small-Batch IPA from Semarang Micro-Breweries.', img: '/images/template5/drink-sharing.jpg' },
        { name: 'TRUFFLE BONE MARROW', price: '$28', desc: 'Roasted Marrow, Périgord Truffles, Sourdough, Sea Salt.', img: '/images/template5/starter-platter.jpg' },
        { name: 'SMOKED BRISKET', price: '$34', desc: '14-Hour Low & Slow using Local Coffee Wood Smoke.', img: '/images/template5/grill-ribs.jpg' },
        { name: 'CHARRED OCTOPUS', price: '$26', desc: 'Persian Lime, Smoked Paprika, Confit Potato.', img: '/images/template5/grill-salmon.jpg' },
        { name: 'AGED RIBEYE', price: '$85', desc: 'Black Angus MB5+, Grass-fed, Grilled over Binchotan.', img: '/images/template5/grill-steak.jpg' },
        { name: 'WHISKEY SOUR', price: '$18', desc: 'Small-Batch Bourbon, Local Honey, Burnt Cinnamon.', img: '/images/template5/cocktail-1.jpg' }
    ];

    const [activeMenu, setActiveMenu] = useState<{ img: string, name: string } | null>(null);


    // Strict 12-Column Grid Implementation based on Space & Layout guidelines
    const archiveSpots = [
        { id: 1, span: 5, start: 1, mt: 0, img: '/images/template5/gallery-1.jpg' },
        { id: 2, span: 4, start: 8, mt: 100, img: '/images/template5/gallery-2.jpg' },
        { id: 3, span: 6, start: 3, mt: 200, img: '/images/template5/gallery-3.jpg' },
        { id: 4, span: 4, start: 9, mt: -50, img: '/images/template5/gallery-4.jpg' },
        { id: 5, span: 5, start: 2, mt: 150, img: '/images/template5/gallery-5.jpg' },
        { id: 6, span: 7, start: 6, mt: -100, img: '/images/template5/hero-ambience.jpg' },
        { id: 7, span: 4, start: 1, mt: 250, img: '/images/template5/legacy.jpg' },
        { id: 8, span: 5, start: 7, mt: -50, img: '/images/template5/signature.jpg' },
        { id: 9, span: 8, start: 3, mt: 150, img: '/images/template5/hero-bg.jpg' },
    ];

    return (
        <div ref={component} className={styles.container}>
            <HUDSceneTracker scrollYProgress={scrollYProgress} />
            <div
                className="parallax-bg-fixed"
                style={{
                    position: 'fixed',
                    top: "-10%",
                    left: 0,
                    width: '100%',
                    height: '120%',
                    zIndex: 0,
                    backgroundImage: 'url(/images/template5/hero-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                    filter: 'grayscale(100%)'
                }}
            />
            {/* HERO SECTION */}
            <section className={styles.hero} style={{ background: 'transparent' }}>
                <div className={styles.gridLines}>
                    <div className={styles.lineVertical}></div>
                    <div className={styles.lineVertical} style={{ left: '33%' }}></div>
                    <div className={styles.lineVertical} style={{ left: '66%' }}></div>
                </div>
                <div className={styles.meta}>
                    <span>EST. 2012</span>
                    <span>SEMARANG, ID</span>
                    <span>SCROLL TO EXPLORE</span>
                </div>
                <h1 className={styles.title}>
                    {splitText("KINETIC")}
                    <br />
                    {splitText("TAVERN")}
                </h1>
            </section>

            {/* MANIFESTO */}
            <section className={styles.manifesto} style={{ background: 'transparent' }}>
                <p className={`${styles.bigText} text-reveal`}>
                    WE DO NOT JUST SERVE FOOD. WE CURATE <span className={styles.highlight}>MOMENTS</span>.
                    A FUSION OF SWISS PRECISION AND LOCAL WARMTH.
                </p>
            </section>

            {/* HORIZONTAL SHOWCASE */}
            <section className={styles.horizontalSection} ref={sliderRef} style={{ background: 'transparent' }}>
                <div className={styles.hTrack}>
                    <div className={styles.hItem}>
                        <div className={styles.hImgContainer}>
                            <div className={`${styles.hImg} parallax-img`} style={{ backgroundImage: 'linear-gradient(45deg, #ff2e63, #08d9d6)' }}></div>
                            <div className={styles.hOverlay}>
                                <h3>CRAFT</h3>
                                <p>HANDMADE BUNS</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hItem}>
                        <div className={styles.hImgContainer}>
                            <div className={`${styles.hImg} parallax-img`} style={{ backgroundImage: 'linear-gradient(135deg, #2d2d2d, #ffeb3b)' }}></div>
                            <div className={styles.hOverlay}>
                                <h3>BREW</h3>
                                <p>LOCALLY SOURCED</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hItem}>
                        <div className={styles.hImgContainer}>
                            <div className={`${styles.hImg}`} style={{ backgroundImage: 'linear-gradient(225deg, #39ff14, #0a0a0a)' }}></div>
                            <div className={styles.hOverlay}>
                                <h3>VIBE</h3>
                                <p>SOUNDSCAPES</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hItem}>
                        <div className={styles.hImgContainer}>
                            <div className={`${styles.hImg}`} style={{ backgroundImage: 'linear-gradient(90deg, #fff, #000)' }}></div>
                            <div className={styles.hOverlay}>
                                <h3>TASTE</h3>
                                <p>CULINARY ART</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MASONRY / OVERLAPPING LAYOUT */}
            <section className={styles.gallerySection} style={{ background: 'transparent' }}>
                <div className={styles.galleryHeader}>
                    <h2 className="text-reveal">THE ARCHIVE</h2>
                    <p className="text-reveal">DYNAMIC LAYERS // INFINITE DEPTH</p>
                </div>
                <div className={styles.masonryGrid}>
                    {archiveSpots.map((spot) => (
                        <div
                            key={spot.id}
                            className={`${styles.masonryItem} parallax-item`}
                            style={{
                                gridColumn: `${spot.start} / span ${spot.span}`,
                                marginTop: `${spot.mt}px`,
                                zIndex: 10 - (spot.id % 5)
                            }}
                        >
                            <div className={styles.mImgWrap}>
                                <div
                                    className={styles.mImg}
                                    style={{
                                        backgroundImage: `url(${spot.img})`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* INTERACTIVE MENU LIST */}
            <section className={styles.menuSection} style={{ background: 'transparent' }}>
                <div className={styles.galleryHeader}>
                    <h2 className="text-reveal">THE SELECTION</h2>
                    <p className="text-reveal">CURATED // ATMOSPHERIC</p>
                </div>
                <div className={styles.menuList}>
                    {menuItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className={styles.menuItemRow}
                            onMouseEnter={() => setActiveMenu({ img: item.img, name: item.name })}
                            onMouseLeave={() => setActiveMenu(null)}
                            initial="initial"
                            whileHover="hovered"
                        >
                            <div className={styles.itemMeta}>0{i + 1} // {item.price}</div>
                            <div className={styles.itemNameWrap}>
                                <h3 className={styles.itemName}>
                                    {item.name.split('').map((char, index) => (
                                        <motion.span
                                            key={index}
                                            style={{ display: 'inline-block' }}
                                            variants={{
                                                initial: { y: 0, opacity: 1, filter: 'blur(0px)' },
                                                hovered: {
                                                    y: -20,
                                                    opacity: 0,
                                                    filter: 'blur(10px)',
                                                    transition: {
                                                        delay: index * 0.02,
                                                        duration: 0.4,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }
                                                }
                                            }}
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </h3>
                                <p className={styles.itemDesc}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <MenuImageFollower activeImage={activeMenu?.img || null} activeName={activeMenu?.name || null} />
            </section>

            <footer className={styles.footer} style={{ background: 'transparent' }}>
                <h2>LOCAL TAVERN</h2>
                <div className={styles.footerGrid}>
                    <div>
                        <h4>VISIT</h4>
                        <p>Jalan Rinjani No. 1<br />Semarang, ID</p>
                    </div>
                    <div>
                        <h4>CONNECT</h4>
                        <p>@localtavern<br />hello@localtavern.com</p>
                    </div>
                    <div>
                        <h4>HOURS</h4>
                        <p>11AM - 02AM<br />Everyday</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
