import React from 'react'
import { FaStop } from 'react-icons/fa'
import Button from './Button'

export default function StopButton({ onClick }) {
    return (
        <Button
            colorClass="red-500"
            hoverColorClass="red-600"
            text="Stop"
            icon={<FaStop />}
            onClick={onClick}
        />
    )
}
