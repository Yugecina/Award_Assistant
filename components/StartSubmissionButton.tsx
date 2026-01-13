"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function StartSubmissionButton({
  projectId,
  awardId,
  awardName
}: {
  projectId: string
  awardId: string
  awardName: string
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/submissions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          awardId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create submission')
      }

      const { submissionId } = await response.json()
      router.push(`/submissions/${submissionId}`)
    } catch (error) {
      console.error('Error creating submission:', error)
      alert('Failed to start submission. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleStart}
      disabled={isLoading}
      className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
    >
      {isLoading ? 'Starting...' : 'Start Submission'}
    </button>
  )
}
