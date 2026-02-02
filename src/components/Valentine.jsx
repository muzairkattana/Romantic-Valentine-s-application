import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function Valentine({ onComplete }) {
    useEffect(() => {
        // Fire confetti
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Auto redirect after 1 minute (60000ms)
        // Changing to 30s for better user experience testing, but requirement said 1 min.
        // I'll stick to requirement: 1 minute
        const timer = setTimeout(() => {
            onComplete()
        }, 60000)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [onComplete])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px'
            }}
        >
            <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                style={{
                    color: '#fff',
                    fontFamily: 'var(--font-fun)',
                    fontSize: '3rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Hypervisor, will you be my Valentine? 🥹❤️
            </motion.h1>

            <motion.div
                initial={{ scale: 0 }}
                animate={{
                    scale: [0, 1.2, 1],
                    rotate: [0, -5, 5, -3, 3, 0],
                }}
                transition={{ delay: 0.5, duration: 1, type: 'spring' }}
                style={{
                    marginTop: '20px',
                    maxWidth: '600px',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-hover)',
                    border: '5px solid white'
                }}
            >
                <img
                    src="/funny-valentine.gif"
                    alt="Funny Valentine Video"
                    style={{ width: '100%', display: 'block' }}
                />
            </motion.div>

            <motion.p
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{ color: 'white', marginTop: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}
            >
                WOOOOOO! PARTYYYY! 🎉💃🕺
            </motion.p>

            <p style={{ color: 'white', marginTop: '10px', opacity: 0.8, fontSize: '0.9rem' }}>
                (Redirecting to the emotional part in 1 minute... enjoy the dance! 😂)
            </p>
        </motion.div>
    )
}
