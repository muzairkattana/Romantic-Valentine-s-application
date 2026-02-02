import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabaseFetch } from '../lib/supabase'

export default function AntiqueChat() {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [chatName, setChatName] = useState('')
    const [showRegistry, setShowRegistry] = useState(true)
    const chatEndRef = useRef(null)

    // Load name and cache from local storage initially
    useEffect(() => {
        const savedName = localStorage.getItem('antique_chat_name')
        if (savedName) {
            setChatName(savedName)
            setShowRegistry(false)
        }

        const savedCache = localStorage.getItem('antique_chat_cache')
        if (savedCache) {
            setMessages(JSON.parse(savedCache))
        }
        fetchMessages()

        // Polling as a fallback for Realtime since we aren't using the full SDK
        const interval = setInterval(fetchMessages, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        localStorage.setItem('antique_chat_cache', JSON.stringify(messages))
    }, [messages])

    const fetchMessages = async () => {
        try {
            const data = await supabaseFetch.getMessages()
            setMessages(data)
            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }

    const handleRegistrySubmit = (e) => {
        e.preventDefault()
        if (chatName.trim()) {
            localStorage.setItem('antique_chat_name', chatName)
            setShowRegistry(false)
        }
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const tempMsg = {
            id: Date.now(),
            sender: chatName,
            content: newMessage,
            created_at: new Date().toISOString(),
            is_temp: true
        }

        setMessages(prev => [...prev, tempMsg])
        setNewMessage('')

        try {
            await supabaseFetch.sendMessage(chatName, newMessage)
            fetchMessages()
        } catch (err) {
            console.error(err)
            setMessages(prev => prev.filter(m => m.id !== tempMsg.id))
        }
    }

    const handleDeleteForAll = async (id) => {
        try {
            await supabaseFetch.deleteMessage(id)
            setMessages(prev => prev.filter(m => m.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    const handleClearForMe = () => {
        setMessages([])
        localStorage.removeItem('antique_chat_cache')
        localStorage.removeItem('antique_chat_name') // Allow re-signing for fresh start
        setChatName('')
        setShowRegistry(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="burnt-edges"
            style={{
                width: '100%',
                maxWidth: '600px',
                height: '75vh',
                background: '#f4e7d1',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/creme-paper.png")',
                borderRadius: '5px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 0 100px rgba(139, 69, 19, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'var(--font-typewriter)'
            }}
        >
            <AnimatePresence>
                {showRegistry && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#f4e7d1',
                            backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '40px',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{ fontFamily: 'var(--font-antique)', color: '#5d2e0a', marginBottom: '20px', fontSize: '2rem' }}>
                            Sign the Registry ✍️
                        </h2>
                        <p style={{ marginBottom: '30px', color: '#795548', fontStyle: 'italic' }}>
                            To partake in this eternal dialogue, please leave your mark...
                        </p>
                        <form onSubmit={handleRegistrySubmit} style={{ width: '100%', maxWidth: '300px' }}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Your Name..."
                                value={chatName}
                                onChange={(e) => setChatName(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    borderBottom: '2px solid #8b4513',
                                    padding: '10px',
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    fontFamily: 'var(--font-hand)',
                                    color: '#3e2723',
                                    outline: 'none'
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                style={{
                                    marginTop: '40px',
                                    background: '#8b4513',
                                    color: '#f4e7d1',
                                    border: 'none',
                                    padding: '12px 40px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    fontFamily: 'var(--font-antique)'
                                }}
                            >
                                Enter the Scroll
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ornate Header */}
            <div style={{
                padding: '15px 25px',
                background: 'rgba(139, 69, 19, 0.08)',
                borderBottom: '2px solid rgba(139, 69, 19, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontSize: '1.4rem', color: '#5d2e0a', fontFamily: 'var(--font-antique)' }}>📜 {chatName || 'The Scroll'}</span>
                <button
                    onClick={handleClearForMe}
                    style={{
                        background: 'transparent',
                        color: '#a1887f',
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontStyle: 'italic'
                    }}
                >
                    Re-Sign Registry
                </button>
            </div>

            {/* Chat Area */}
            <div
                className="antique-scrollbar"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '30px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                {messages.length === 0 && !loading && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        style={{ textAlign: 'center', marginTop: '30%', fontStyle: 'italic' }}
                    >
                        Waiting for the first spill of ink...
                    </motion.p>
                )}

                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                alignSelf: msg.sender === chatName ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                position: 'relative'
                            }}
                        >
                            <div className="ink-text" style={{
                                background: 'transparent',
                                padding: '5px 10px',
                                color: '#3e2723',
                                position: 'relative'
                            }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    display: 'block',
                                    marginBottom: '2px',
                                    color: msg.sender === chatName ? '#d32f2f' : '#8b4513',
                                    fontFamily: 'var(--font-antique)',
                                    opacity: 0.7
                                }}>
                                    {msg.sender === chatName ? 'You' : msg.sender}
                                </span>
                                <span className="ink-handwriting" style={{
                                    fontSize: '1.3rem',
                                    lineHeight: '1.2',
                                    display: 'block',
                                    borderBottom: msg.sender === chatName ? '1px solid rgba(211, 47, 47, 0.2)' : '1px solid rgba(139, 69, 19, 0.2)'
                                }}>
                                    {msg.content}
                                </span>

                                {msg.sender === chatName && (
                                    <button
                                        onClick={() => handleDeleteForAll(msg.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '-25px',
                                            background: 'transparent',
                                            border: 'none',
                                            fontSize: '16px',
                                            color: '#d32f2f',
                                            cursor: 'pointer',
                                            opacity: 0,
                                            transition: 'opacity 0.3s'
                                        }}
                                        className="delete-btn"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSend}
                style={{
                    padding: '25px',
                    borderTop: '1px dashed rgba(139, 69, 19, 0.3)',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center'
                }}
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ink your thoughts..."
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
                        padding: '10px 0',
                        color: '#3e2723',
                        outline: 'none',
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1.4rem'
                    }}
                />
                <motion.button
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    style={{
                        background: '#8b4513',
                        color: '#f4e7d1',
                        border: 'none',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                >
                    🖋️
                </motion.button>
            </form>
        </motion.div>
    )
}
