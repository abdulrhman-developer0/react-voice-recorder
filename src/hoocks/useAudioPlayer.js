import { useEffect, useRef, useState } from "react"
import { GiCaduceus } from "react-icons/gi"
import { GrStatusCriticalSmall } from "react-icons/gr"
import useCounter from "./useCounter"

export default function useAudioPlayer(getSrc) {

    // use Counter functionality
    const counter = useCounter()

    // states
    const [isPlayed, setIsPlayed] = useState(false)
    const [ended, setEnded] = useState(false)


    // refs
    const audioRef = useRef()
    const oldCounterValueRef = useRef(0)

    useEffect(() => {
        const audio = new Audio

        audio.addEventListener('play', (e) => {
            setIsPlayed(true)
            setEnded(false)
            counter.start(-1)
        });

        audio.addEventListener('pause', (e) => setIsPlayed(false))

        audio.addEventListener('ended', (e) => {
            setIsPlayed(false)
            setEnded(true)
            counter.reset(oldCounterValueRef.current)
        })

        audioRef.current = audio
    }, [])


    const play = () => {

        if (!audioRef.current) {
            return
        }

        if (!audioRef.current.src || ended) {
            audioRef.current.src = getSrc()
        }

        if (!isPlayed) {
            oldCounterValueRef.current = counter.value
            audioRef.current.play()
        }
    }

    const pause = () => {

        if (!audioRef.current || !audioRef.current.src) {
            return
        }

        if (isPlayed && !audioRef.current.paused) {
            audioRef.current.pause()
        }
    }

    const togglePause = () => {

        if (isPlayed && !audioRef.current.paused) {
            pause()
        } else {
            play()
        }
    }

    const cancel = () => {
        setIsPlayed(false)
        setEnded(true)
        counter.reset(0)

        if (audioRef.current) {
            audioRef.current.src = null
        }
    }

    return { isPlayed, ended, audioRef, play, pause, togglePause, cancel }
}
