import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string | null
    const boardFile = formData.get('board') as File

    if (!name || !boardFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save the PDF file
    const bytes = await boardFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = name.toLowerCase().replace(/\s+/g, '-')
    const filename = `${sanitizedName}-${timestamp}.pdf`
    const filepath = path.join(uploadsDir, filename)

    await writeFile(filepath, buffer)

    // Create project in database
    const project = await prisma.project.create({
      data: {
        name,
        description: description || undefined,
        boardPath: `/uploads/projects/${filename}`,
      }
    })

    return NextResponse.redirect(new URL(`/projects/${project.id}`, request.url))
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
