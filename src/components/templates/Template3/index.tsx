import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Template3.module.css';

gsap.registerPlugin(ScrollTrigger);

// Exploding Text Component for Brutalist Interaction
const ExplodingTitle = ({ text, color }: { text: string, color: string }) => {
    const container = useRef(null);

    const onHover = () => {
        if (!container.current) return;
        const chars = (container.current as HTMLElement).querySelectorAll('.char');
        gsap.to(chars, {
            x: () => (Math.random() - 0.5) * 150,
            y: () => (Math.random() - 0.5) * 150,
            rotate: () => (Math.random() - 0.5) * 90,
            opacity: 0,
            scale: 0.5,
            duration: 0.4,
            ease: "power2.in",
            stagger: { amount: 0.1, from: "random" }
        });
    };

    const onLeave = () => {
        if (!container.current) return;
        const chars = (container.current as HTMLElement).querySelectorAll('.char');
        gsap.to(chars, {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            stagger: { amount: 0.1, from: "random" }
        });
    };

    return (
        <h3
            ref={container}
            className={styles.menuName}
            style={{ color, cursor: 'pointer' }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {text.split("").map((char, i) => (
                <span key={i} className="char" style={{ display: 'inline-block' }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h3>
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
                { trigger: `.${styles.hero}`, color: "#050505" },
                { trigger: `.${styles.manifesto}`, color: "#0a0a0a" },
                { trigger: `.${styles.horizontalSection}`, color: "#000000" },
                { trigger: `.${styles.gallerySection}`, color: "#050505" },
                { trigger: `.${styles.menuSection}`, color: "#111" }, // Warm dark neutral
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
        { name: 'SIGNATURE BURGER', price: '$18', desc: 'Double Wagyu, Smoked Cheddar, Secret Sauce', color: '#fff' },
        { name: 'LOCAL CRAFT BEER', price: '$12', desc: 'Seasonal selection from Semarang breweries', color: '#fff' },
        { name: 'TRUFFLE FRIES', price: '$10', desc: 'Hand-cut, white truffle oil, parmesan', color: '#fff' },
        { name: 'LOCAL COCKTAIL', price: '$15', desc: 'Arak-based signature blend', color: '#fff' },
        { name: 'SMOKED BRISKET', price: '$22', desc: '12-hour low and slow, local wood smoke', color: '#fff' },
        { name: 'GRILLED OCTOPUS', price: '$20', desc: 'Salsa verde, baby potatoes, burnt lemon', color: '#fff' }
    ];

    // Generate 9 archive spots with SIGNIFICANT space to avoid "numpuk"
    const archiveSpots = [
        { id: 1, left: '10%', top: '5vh', zIndex: 1, color: '#ff2e63' },
        { id: 2, left: '55%', top: '15vh', zIndex: 0, color: '#08d9d6' },
        { id: 3, left: '20%', top: '60vh', zIndex: 2, color: '#39ff14' },
        { id: 4, left: '60%', top: '80vh', zIndex: 3, color: '#ffeb3b' },
        { id: 5, left: '10%', top: '130vh', zIndex: 1, color: '#fff' },
        { id: 6, left: '50%', top: '150vh', zIndex: 0, color: '#ff7b00' },
        { id: 7, left: '25%', top: '200vh', zIndex: 2, color: '#00d4ff' },
        { id: 8, left: '65%', top: '220vh', zIndex: 1, color: '#ff2e63' },
        { id: 9, left: '15%', top: '270vh', zIndex: 3, color: '#08d9d6' },
    ];

    return (
        <div ref={component} className={styles.container}>
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
                            <div className={styles.aspectRatio}>
                                <div
                                    className={styles.mnImg}
                                    style={{
                                        background: spot.color,
                                        backgroundImage: `linear-gradient(45deg, ${spot.color}, #000)`
                                    }}
                                ></div>
                            </div>
                            <div className={styles.caption}>RECORD_{spot.id}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* INTERACTIVE MENU POSTERS */}
            <section className={styles.menuSection} style={{ background: 'transparent' }}>
                <div className={styles.galleryHeader}>
                    <h2 className="text-reveal">THE MENU</h2>
                    <p className="text-reveal">ATMOSPHERIC SELECTION</p>
                </div>
                <div className={styles.menuPostersGrid}>
                    {menuItems.map((item, i) => (
                        <div key={i} className={styles.menuPoster} style={{ borderColor: item.color }}>
                            <div className={styles.posterGlow}></div>
                            <div className={styles.posterHeader}>
                                <span className={styles.menuIndex}>0{i + 1}</span>
                                <span className={styles.menuPrice}>{item.price}</span>
                            </div>
                            <ExplodingTitle text={item.name} color={item.color} />
                            <p className={styles.menuDesc}>{item.desc}</p>
                            <div className={styles.posterFooter}>
                                <span>LOCAL TAVERN // SEMARANG</span>
                            </div>
                        </div>
                    ))}
                </div>
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
