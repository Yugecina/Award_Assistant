import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionId, chatSessionId, message, messages } = body

    if (!submissionId || !chatSessionId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get submission details
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        project: true,
        award: true
      }
    })

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      )
    }

    // Build context for Claude
    const systemPrompt = `You are an expert advertising awards consultant helping with the ${submission.award.name} award submission.

Project: ${submission.project.name}
${submission.project.description ? `Description: ${submission.project.description}` : ''}

Your role is to:
1. Analyze the project board (campaign details) against the award entry kit
2. Recommend the most suitable categories for submission
3. Help answer form questions based on the project
4. Provide strategic advice for maximizing chances of winning

Entry Kit Location: ${submission.award.entryKitPath || 'Not uploaded yet'}
Project Board Location: ${submission.project.boardPath}

Be specific, insightful, and supportive. Ask clarifying questions when needed.`

    // Format conversation history for Claude
    const conversationHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }))

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        ...conversationHistory,
        {
          role: 'user',
          content: message
        }
      ]
    })

    const assistantResponse = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Sorry, I could not generate a response.'

    // Update chat session in database
    const updatedMessages = [
      ...messages,
      {
        role: 'assistant',
        content: assistantResponse,
        timestamp: Date.now()
      }
    ]

    await prisma.chatSession.update({
      where: { id: chatSessionId },
      data: {
        messages: JSON.stringify(updatedMessages)
      }
    })

    return NextResponse.json({ response: assistantResponse })
  } catch (error: any) {
    console.error('Error in chat API:', error)

    // Handle specific Anthropic API errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please configure ANTHROPIC_API_KEY in .env' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    )
  }
}
