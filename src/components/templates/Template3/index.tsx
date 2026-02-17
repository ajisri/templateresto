import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Template3.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─── UTILS: HUD SCENE TRACKER (Director's Cut Style) ─────
const HUDSceneTracker = () => {
    const [progress, setProgress] = useState(0);
    const scenes = ["01", "02", "03", "04", "05", "06", "07"];

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / height;
            setProgress(scrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    x: mouseX.current + 20,
                    y: mouseY.current - 150,
                    duration: 0.6,
                    ease: "power3.out"
                });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={followerRef}
            className={styles.imageFollower}
            style={{
                opacity: activeImage ? 1 : 0,
                pointerEvents: 'none',
                position: 'fixed'
            }}
        >
            {activeImage && (
                <div className={styles.followerInner}>
                    <img src={activeImage} alt={activeName || ""} className={styles.followerImg} />
                    <div className={styles.followerTag}>{activeName}</div>
                </div>
            )}
        </div>
    );
};

export default function Template3() {
    const component = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

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
                // Large varied ranges to create passing effect
                const range = 400 + (i % 3) * 300 + Math.random() * 200;
                gsap.fromTo(item,
                    { y: range },
                    {
                        y: -range,
                        ease: "none",
                        scrollTrigger: {
                            trigger: `.${styles.gallerySection}`,
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


    // Generate 9 archive spots with SIGNIFICANT space to avoid "numpuk"
    const archiveSpots = [
        { id: 1, left: '10%', top: '5vh', zIndex: 1, img: '/images/template5/gallery-1.jpg' },
        { id: 2, left: '55%', top: '15vh', zIndex: 0, img: '/images/template5/gallery-2.jpg' },
        { id: 3, left: '20%', top: '60vh', zIndex: 2, img: '/images/template5/gallery-3.jpg' },
        { id: 4, left: '60%', top: '80vh', zIndex: 3, img: '/images/template5/gallery-4.jpg' },
        { id: 5, left: '10%', top: '130vh', zIndex: 1, img: '/images/template5/gallery-5.jpg' },
        { id: 6, left: '50%', top: '150vh', zIndex: 0, img: '/images/template5/hero-ambience.jpg' },
        { id: 7, left: '25%', top: '200vh', zIndex: 2, img: '/images/template5/legacy.jpg' },
        { id: 8, left: '65%', top: '220vh', zIndex: 1, img: '/images/template5/signature.jpg' },
        { id: 9, left: '15%', top: '270vh', zIndex: 3, img: '/images/template5/hero-bg.jpg' },
    ];

    return (
        <div ref={component} className={styles.container}>
            <HUDSceneTracker />
            <div
                className="parallax-bg-fixed"
                style={{
                    position: 'fixed',
                    top: "-10%",
                    left: 0,
                    width: '100%',
                    height: '120%',
                    zIndex: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
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
                                left: spot.left,
                                top: spot.top,
                                zIndex: spot.zIndex
                            }}
                        >
                            <div className={styles.mImgWrap}>
                                <div
                                    className={styles.mImg}
                                    style={{
                                        backgroundImage: `url(${spot.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
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
                        >
                            <div className={styles.itemMeta}>0{i + 1} // {item.price}</div>
                            <div className={styles.itemNameWrap}>
                                <h3 className={styles.itemName}>{item.name}</h3>
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
