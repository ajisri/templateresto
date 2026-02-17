import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Template6.module.css';

export default function PerspectiveText({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                display: "inline-block",
                cursor: "pointer"
            }}
        >
            <motion.h1
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    textShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }}
                className={styles.perspectiveText}
            >
                {text}
                <span className={styles.perspectiveShadow}>{text}</span>
            </motion.h1>
        </motion.div>
    );
}
