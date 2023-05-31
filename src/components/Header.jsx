import styles from "./Header.module.css"

import igniteSimbol from '../assets/ignite-simbol.svg'


export function Header() {
    return (
        <header className={styles.header}>
            <img src={igniteSimbol}  alt="Logotipo Ignite"/>
        </header>

    )
}
