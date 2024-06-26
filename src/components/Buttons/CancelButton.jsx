import React from 'react'
import { FaTrash } from 'react-icons/fa'
import Button from './Button'

export default function CancelButton({ onClick }) {
  return (
    <Button
      colorClass="blue-500"
      hoverColorClass="blue-600"
      text="Cancel"
      icon={<FaTrash />}
      onClick={onClick}
    />
  )
}
