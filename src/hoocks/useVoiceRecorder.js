import { useEffect, useRef, useState } from "react"
import { SiElsevier } from "react-icons/si"
import { getMaicAccess } from '../utlitites/navigator'
import useCounter from "./useCounter"

export default function useVoiceRecorder() {

    // states
    const [isRecording, setIsRecording] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isRecorded, setIsRecorded] = useState(false)

    // refs
    const mediaRecorderRef = useRef()
    const audioChunksRef = useRef([])

    // custom hoocks
    const counter = useCounter()

    // get maic permission.
    const maic = getMaicAccess()

    const start = () => {
        setIsRecording(true)

        maic.then(stream => {
            // create recorder from audio stream
            const mediaRecorder = new MediaRecorder(stream)

            // listen to dataavailable.
            mediaRecorder.addEventListener('dataavailable', (e) => {
                audioChunksRef.current.push(e.data)
            })

            // start timer.
            
            mediaRecorder.start()
            counter.start() // incres by 1 every second
            mediaRecorderRef.current = mediaRecorder
        }).catch(error => {
            console.error('Error accessing microphone:', error);
        });
    }

    const togglePause = () => {

        if (!isRecording) {
            return false
        }

        if (isPaused) {
            setIsPaused(false)
            mediaRecorderRef.current.resume()
            counter.start()
        } else {
            setIsPaused(true)
            console.log('isPaused == true', isPaused)
            mediaRecorderRef.current.pause()
            counter.stop()
        }

        return true
    }

    const stop = () => {
        setIsRecording(false)
        setIsPaused(false)
        mediaRecorderRef.current.stop()
        counter.stop()
        setIsRecorded(true)
    }

    const cancel = () => {
        if (isRecorded) {
            audioChunksRef.current = []
            counter.reset(0)
            setIsRecording(false)
            setIsPaused(false)
            setIsRecorded(false)
        }
    }

    const toURL = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        return URL.createObjectURL(blob)
    };


    const saveAsFile = () => {
        const filename = `untitled-recording-${counter.value}s.mp3`
        const url =  toURL()
        const a   = document.createElement('a')

        a.href = url
        a.download = filename
        a.style.display = 'none'

        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return { isRecording, isPaused, isRecorded, start, togglePause, stop, cancel, toURL, saveAsFile }
}
