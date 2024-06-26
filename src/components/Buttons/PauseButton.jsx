import React from 'react'
import Button from './Button'
import { FaPause, FaPlay } from 'react-icons/fa';

export default function PauseButton({ playText, isPaused, onToggle }) {
    return (
        <Button
            colorClass="blue-500"
            hoverColorClass="blue-600"
            text={isPaused ? playText : "Pause"}
            icon={isPaused ? <FaPlay /> : <FaPause />}
            onClick={onToggle}
        />
    )
}
