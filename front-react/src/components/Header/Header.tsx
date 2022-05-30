import image from './ingressosNeon.png'

import './styles.scss'

export function Header() {
    return (
        <div className="header">
            <header>
                <div className="neon-text">
                    <h1>CRUD</h1>
                </div>
                <div className="ticket-image">
                    <img src={ image } alt="ingressos em neon"/>
                </div>
            </header>
        </div>
    )
}
