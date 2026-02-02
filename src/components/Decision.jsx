import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Decision({ onYes, onNo }) {
    const [noCount, setNoCount] = useState(0)
    const [noPos, setNoPos] = useState({ x: 0, y: 0 })
    const [noText, setNoText] = useState('NO ❌')
    const [yesScale, setYesScale] = useState(1)

    const noTexts = [
        'Are you sure?',
        'Think again!',
        'Last chance!',
        'Really?',
        'Don\'t do this!',
        'I will cry 😢',
        'Please? 🥺',
        'Wrong button!',
        'Missed me!',
        'Try the other one!',
        'Nice try!',
        'Nope!',
        'Not this one!'
    ]

    const moveNoButton = () => {
        // Move it slightly to make it "shy"
        const x = Math.random() * 200 - 100
        const y = Math.random() * 200 - 100
        setNoPos({ x, y })
        setNoCount(prev => prev + 1)

        // Change text randomly
        const randomIndex = Math.floor(Math.random() * noTexts.length)
        setNoText(noTexts[randomIndex])

        // Make YES bigger
        setYesScale(prev => Math.min(prev + 0.1, 2.5)) // Cap at 2.5x
    }

    const handleNoClick = () => {
        // If somehow clicked
        onNo()
    }

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card"
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '3rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-card)',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%'
            }}
        >
            <h1 style={{ color: 'var(--primary)', fontFamily: 'var(--font-fun)', fontSize: '2.5rem' }}>
                Hypervisor has a very important question for you 🥹💌
            </h1>

            <div className="hearts-bg">
                <div className="heart">❤️</div>
                <div className="heart">💖</div>
                <div className="heart">💝</div>
                <div className="heart">💕</div>
                <div className="heart">💗</div>
                <div className="heart">💓</div>
                <div className="heart">💞</div>
                <div className="heart">💟</div>
                <div className="heart">❣️</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '40px', minHeight: '100px' }}>
                <motion.button
                    whileHover={{ scale: yesScale * 1.1 }}
                    whileTap={{ scale: yesScale * 0.9 }}
                    animate={{ scale: yesScale }}
                    onClick={onYes}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.5rem',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: '50px',
                        boxShadow: '0 5px 15px rgba(255, 107, 129, 0.4)',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    YES ✅
                </motion.button>

                <motion.button
                    animate={noPos}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onMouseEnter={moveNoButton}
                    onClick={handleNoClick}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        background: '#e0e0e0',
                        color: '#666',
                        borderRadius: '50px',
                        border: 'none',
                        position: 'relative'
                    }}
                >
                    {noText}
                </motion.button>
            </div>

            {noCount > 2 && <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#999' }}>Why are you trying to click No? 😢</p>}

        </motion.div>
    )
}
