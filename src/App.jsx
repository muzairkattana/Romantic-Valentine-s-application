import { useState } from 'react'
import Login from './components/Login'
import Decision from './components/Decision'
import Valentine from './components/Valentine'
import ThankYou from './components/ThankYou'
import NoPath from './components/NoPath'
import './styles/global.css'

function App() {
    const [page, setPage] = useState('login')

    const renderPage = () => {
        switch (page) {
            case 'login': return <Login onLogin={() => setPage('decision')} />
            case 'decision': return <Decision onYes={() => setPage('valentine')} onNo={() => setPage('nopath')} />
            case 'valentine': return <Valentine onComplete={() => setPage('thankyou')} />
            case 'thankyou': return <ThankYou onLogout={() => setPage('login')} />
            case 'nopath': return <NoPath onRetry={() => setPage('decision')} />
            default: return <Login onLogin={() => setPage('decision')} />
        }
    }

    return (
        <div className="app-container">
            {renderPage()}
        </div>
    )
}

export default App
