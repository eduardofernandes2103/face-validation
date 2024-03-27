import { useEffect, useState } from "react"
import styles from './styles.module.scss'
import QRCode from 'react-qr-code'
import logoSphere from '../../assets/images/sphere_simbolo_colorida.svg'
import Image from "next/image"


interface RedirectToMobileInterface {
    isDesktop: boolean
}

const RedirectToMobile: React.FC<RedirectToMobileInterface> = ({ isDesktop }) => {
    const [urlPage, setUrlPage] = useState('')
    useEffect(() => {
        setUrlPage(window.location.href)
    }, [])
    return (
        isDesktop && (
            <div className={styles.container}>
                <div className={styles.content}>
                    <Image src={logoSphere} alt="logo Sphere" />
                    <h2>Ops...</h2>
                    <p>Para continuar recomendamos acessar nossa aplicação através do seu smartphone ou tablet. Use o<br />
                        QR-code abaixo para ser redirecionado instantaneamente para nossa plataforma móvel.
                    </p>
                    <QRCode value={urlPage} />
                </div>
            </div >
        )
    )
}

export default RedirectToMobile