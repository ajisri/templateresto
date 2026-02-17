import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Template1 from './components/templates/Template1';
import Template2 from './components/templates/Template2';
import Template3 from './components/templates/Template3';
import Template4 from './components/templates/Template4';
import Template5 from './components/templates/Template5';
import Template6 from './components/templates/Template6';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import Lenis from 'lenis';

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit'
};

const cardStyle: CSSProperties = {
  border: '2px solid #fff',
  padding: '2rem',
  width: '200px',
  height: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  background: '#111'
};

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      gap: '2rem',
      fontFamily: 'var(--font-display)'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>LOCAL TAVERN<br /><span style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#666' }}>CONCEPT PROTOTYPES</span></h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/template1" style={linkStyle}>
          <div style={cardStyle} className="card">
            <h2 style={{ fontSize: '4rem', color: '#39ff14' }}>01</h2>
            <div style={{ borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <h3>THE VORTEX</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#888' }}>Neo-Brutalist 3D Tunnel</p>
            </div>
          </div>
        </Link>
        <Link to="/template2" style={linkStyle}>
          <div style={{ ...cardStyle, background: '#f0f0f0', color: '#000' }} className="card">
            <h2 style={{ fontSize: '4rem', color: '#ff2e63' }}>02</h2>
            <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
              <h3>THE CANVAS</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#666' }}>Pop Art Infinite Drag</p>
            </div>
          </div>
        </Link>
        <Link to="/template3" style={linkStyle}>
          <div style={cardStyle} className="card">
            <h2 style={{ fontSize: '4rem', color: '#fff' }}>03</h2>
            <div style={{ borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <h3>KINETIC</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#888' }}>Minimal Motion Typography</p>
            </div>
          </div>
        </Link>
        <Link to="/template4" style={linkStyle}>
          <div style={{ ...cardStyle, background: '#1a1a1a', borderColor: '#d4af37' }} className="card">
            <h2 style={{ fontSize: '4rem', color: '#d4af37' }}>04</h2>
            <div style={{ borderTop: '1px solid #333', paddingTop: '1rem' }}>
              <h3 style={{ color: '#fff' }}>INDUSTRIAL</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#888' }}>Modern Luxury Gastro</p>
            </div>
          </div>
        </Link>
        <Link to="/template5" style={linkStyle}>
          <div style={{ ...cardStyle, background: '#f4f4f0', color: '#111', borderColor: '#ddd' }} className="card">
            <h2 style={{ fontSize: '4rem', color: '#111' }}>05</h2>
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
              <h3>EDITORIAL</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#555' }}>Lifestyle Magazine Layout</p>
            </div>
          </div>
        </Link>
        <Link to="/template6" style={linkStyle}>
          <div style={{ ...cardStyle, background: '#fff', color: '#111', borderColor: '#111', boxShadow: '5px 5px 0 #111' }} className="card">
            <h2 style={{ fontSize: '4rem', color: '#ff4d4d' }}>06</h2>
            <div style={{ borderTop: '1px solid #111', paddingTop: '1rem' }}>
              <h3>TAVERN_X</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#333' }}>Neo-Brutalist Softened</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();

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
          top: '2rem',
          left: '2rem',
          zIndex: 9999,
        }}>
          <Link to="/" style={{
            background: '#000',
            color: '#fff',
            padding: '1rem 2rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-display)',
            textTransform: 'uppercase',
            border: '1px solid #fff'
          }}>
            ← Back to Concepts
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
