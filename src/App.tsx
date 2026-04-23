import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Template1 from './components/templates/Template1';
import Template2 from './components/templates/Template2';
import Template3 from './components/templates/Template3';
import Template4 from './components/templates/Template4';
import Template5 from './components/templates/Template5';
import Template6 from './components/templates/Template6';
import { useEffect } from 'react';
import Lenis from 'lenis';


const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100dvh',
      background: 'var(--c-bg)',
      color: 'var(--c-text)',
      padding: 'var(--section-px)',
      gap: 'var(--space-12)',
    }}>
      <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 900,
          letterSpacing: 'var(--tracking-tighter)',
          lineHeight: 0.85
        }}>
          LOCAL TAVERN
          <br />
          <span style={{
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--c-accent)',
            letterSpacing: '0.4em'
          }}>DEVELOPMENT_LAB / PROTOTYPES</span>
        </h1>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(var(--grid-columns), 1fr)',
        gap: 'var(--grid-gap)',
        width: '100%',
        maxWidth: '1800px'
      }} className="container-12">
        {[
          { id: '01', title: 'THE VORTEX', desc: 'NEO-BRUTALIST 3D', color: '#39ff14', path: '/template1' },
          { id: '02', title: 'THE CANVAS', desc: 'POP-ART INFINITE', color: '#ff2e63', path: '/template2' },
          { id: '03', title: 'KINETIC', desc: 'MINIMAL MOTION', color: '#fff', path: '/template3' },
          { id: '04', title: 'INDUSTRIAL', desc: 'MODERN LUXURY', color: '#d4af37', path: '/template4' },
          { id: '05', title: 'EDITORIAL', desc: 'MAGAZINE LAYOUT', color: '#f5f5f7', path: '/template5' },
          { id: '06', title: 'TAVERN_X', desc: 'CINEMATIC STORY', color: '#ff4d4d', path: '/template6' }
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            style={{
              gridColumn: 'span 4',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              border: '2px solid var(--c-text)',
              padding: 'var(--space-6)',
              height: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#111',
              transition: 'all 0.3s var(--ease-sharp)',
              position: 'relative',
              overflow: 'hidden'
            }} className="card">
              <span style={{
                fontSize: 'var(--text-hero)',
                fontWeight: 900,
                color: item.color,
                opacity: 0.15,
                position: 'absolute',
                top: '-1rem',
                left: '-1rem',
                lineHeight: 1
              }}>{item.id}</span>

              <div style={{ zIndex: 1, position: 'relative' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--c-accent)', marginTop: '0.5rem' }}>{item.desc}</p>
              </div>

              <div style={{
                borderTop: '1px solid var(--c-grid)',
                paddingTop: 'var(--space-4)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1
              }}>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>VIEW_CASE_0{idx + 1}</span>
                <span className="arrow" style={{ transition: 'transform 0.3s' }}>→</span>
              </div>

              <style dangerouslySetInnerHTML={{
                __html: `
                .card:hover { transform: translate(-8px, -8px); box-shadow: 12px 12px 0 var(--c-accent); background: #1a1a1a !important; border-color: var(--c-accent) !important; }
                .card:hover .arrow { transform: translateX(8px); }
              `}} />
            </div>
          </Link>
        ))}
      </div>

      <footer style={{ marginTop: 'var(--space-12)', opacity: 0.3, fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
        DESIGNED BY DIRECTOR • SEMARANG 2024
      </footer>
    </div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Only init Lenis if not on Template 2 (Canvas) which handles its own drag/scroll
    if (location.pathname === '/template2') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/' && (
        <nav style={{
          position: 'fixed',
          top: 'clamp(1rem, 3vw, 2rem)',
          left: 'clamp(1rem, 3vw, 2rem)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}>
          <Link to="/" style={{
            background: 'var(--c-bg)',
            color: 'var(--c-text)',
            padding: 'var(--space-2) var(--space-4)',
            fontWeight: '900',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            border: '2px solid var(--c-text)',
            display: 'inline-block',
            fontSize: 'var(--text-xs)',
            pointerEvents: 'auto',
            transition: 'all 0.3s var(--ease-sharp)',
            boxShadow: '4px 4px 0 var(--c-accent)'
          }} className="back-link">
            ← CONCEPTS / INDEX
          </Link>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template1" element={<Template1 />} />
        <Route path="/template2" element={<Template2 />} />
        <Route path="/template3" element={<Template3 />} />
        <Route path="/template4" element={<Template4 />} />
        <Route path="/template5" element={<Template5 />} />
        <Route path="/template6" element={<Template6 />} />
      </Routes>
    </>
  );
}

export default App;
