import React from 'react'
import Button from './Button'
import { FaPlay } from 'react-icons/fa'

export default function StartRecordingButton( { onClick } ) {
    return (
        <Button
            colorClass="blue-500"
            hoverColorClass="blue-600"
            text="Start Recording"
            icon={<FaPlay />}
            onClick={onClick}
        />
    )
}
