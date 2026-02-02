import { motion } from 'framer-motion'

export default function ThankYou({ onLogout }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '3rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-card)',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%'
            }}
        >
            <h1 style={{ color: 'var(--primary)', fontFamily: 'var(--font-fun)' }}>
                Thank You! 💖
            </h1>
            <p style={{ margin: '20px 0', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Thank you for being the most amazing best friend. <br />
                No matter what, you are special 🌟
            </p>
            <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '30px' }}>
                This page will always remember this moment 🥹✨
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                style={{
                    padding: '12px 30px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }}
            >
                Logout 🔒
            </motion.button>
        </motion.div>
    )
}
