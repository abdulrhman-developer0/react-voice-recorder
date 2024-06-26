import React from 'react'
import Button from './Button'
import { FaSave } from 'react-icons/fa'

export default function SaveButton({ onClick }) {
  return (
    <Button
      colorClass="purple-500"
      hoverColorClass="purple-600"
      text="Save"
      icon={<FaSave />}
      onClick={onClick}
    />
  )
}
