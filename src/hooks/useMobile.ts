import { useEffect, useState } from "react"

export const useMobile = () => {
    const [isDesktop, setIsDesktop] = useState(false)
    useEffect(() => {
        const userAgent = navigator.userAgent
        console.log('UserAgent', userAgent)
        const isAndroid = /Android/.test(userAgent)
        const isIOS = /(iPhone|Macintosh)/.test(userAgent)
        const mobileWidth = window.matchMedia('(max-width: 1024px)').matches
        const isMobileDevice = isAndroid || isIOS || mobileWidth;
        setIsDesktop(!isMobileDevice)
    }, [])

    return isDesktop
}