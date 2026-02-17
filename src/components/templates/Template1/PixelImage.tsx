import React, { useRef, useEffect, useState } from 'react';

interface PixelImageProps {
    src: string;
    alt: string;
    className?: string;
}

const PixelImage: React.FC<PixelImageProps> = ({ src, alt, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            setIsLoaded(true);
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const w = canvas.width;
            const h = canvas.height;

            // Draw initial pixelated state
            const draw = (pixelSize: number) => {
                ctx.imageSmoothingEnabled = false;
                // Draw small
                ctx.drawImage(img, 0, 0, w / pixelSize, h / pixelSize);
                // Draw back large
                ctx.drawImage(canvas, 0, 0, w / pixelSize, h / pixelSize, 0, 0, w, h);
            };

            let currentPixelSize = 40;
            const animate = () => {
                if (currentPixelSize > 1) {
                    draw(currentPixelSize);
                    currentPixelSize -= 1;
                    requestAnimationFrame(animate);
                } else {
                    ctx.drawImage(img, 0, 0, w, h);
                }
            };
            animate();
        };
    }, [src]);

    return (
        <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
            <canvas
                ref={canvasRef}
                width={800}
                height={1000}
                title={alt}
                style={{ width: '100%', height: '100%', display: isLoaded ? 'block' : 'none' }}
            />
            {!isLoaded && <div style={{ width: '100%', height: '100%', background: '#222' }} />}
        </div>
    );
};

export default PixelImage;
