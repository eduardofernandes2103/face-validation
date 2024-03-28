import { useEffect, useState } from "react"

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>()
    useEffect(() => {
        const userAgent = navigator.userAgent
        const isAndroid = /Android/.test(userAgent)
        const isIOS = /(iPhone|Macintosh)/.test(userAgent)
        const mobileWidth = window.matchMedia('(max-width: 1024px)').matches
        const isMobileDevice = isAndroid || isIOS || mobileWidth;
        setIsMobile(isMobileDevice)
    }, [])

    return isMobile
}