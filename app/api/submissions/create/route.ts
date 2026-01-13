import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, awardId } = body

    if (!projectId || !awardId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if submission already exists
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        projectId_awardId: {
          projectId,
          awardId
        }
      }
    })

    if (existingSubmission) {
      return NextResponse.json(
        { submissionId: existingSubmission.id },
        { status: 200 }
      )
    }

    // Create new submission
    const submission = await prisma.submission.create({
      data: {
        projectId,
        awardId,
        selectedCategories: '[]',
        status: 'draft'
      }
    })

    // Create initial chat session
    await prisma.chatSession.create({
      data: {
        submissionId: submission.id,
        messages: '[]'
      }
    })

    return NextResponse.json(
      { submissionId: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
