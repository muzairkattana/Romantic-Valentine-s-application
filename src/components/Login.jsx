import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [shake, setShake] = useState(0)

    const handleLogin = (e) => {
        e.preventDefault()
        if (username.toLowerCase() === 'hypervisor' && password.toLowerCase() === 'fawad') {
            onLogin()
        } else {
            setError(username.toLowerCase() !== 'hypervisor' ? "Oops! You’re not Ayesha 😜" : "Wrong password… nice try hacker 😂")
            setShake(prev => prev + 1)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '3rem',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-card)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%',
                backdropFilter: 'blur(10px)'
            }}
        >
            <motion.h1
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ color: 'var(--primary)', fontFamily: 'var(--font-fun)', marginBottom: '10px' }}
            >
                Hi Ayesha 👋✨
            </motion.h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>Only special people are allowed here 😌💖</p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #eee',
                        outline: 'none',
                        fontSize: '16px'
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: '2px solid #eee',
                        outline: 'none',
                        fontSize: '16px'
                    }}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: '10px'
                    }}
                >
                    Unlock 🔐
                </motion.button>
            </form>

            {error && (
                <motion.p
                    key={shake}
                    initial={{ x: -10 }}
                    animate={{ x: [0, -10, 10, -10, 0] }}
                    style={{ color: '#e84118', marginTop: '15px', fontWeight: '500' }}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    )
}
