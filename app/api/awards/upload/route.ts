import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const awardName = formData.get('awardName') as string
    const country = formData.get('country') as string
    const language = formData.get('language') as string
    const description = formData.get('description') as string | null
    const entryKitFile = formData.get('entryKit') as File

    if (!awardName || !country || !language || !entryKitFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'entry-kits')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save the PDF file
    const bytes = await entryKitFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = awardName.toLowerCase().replace(/\s+/g, '-')
    const filename = `${sanitizedName}-${timestamp}.pdf`
    const filepath = path.join(uploadsDir, filename)

    await writeFile(filepath, buffer)

    // Check if award already exists
    const existingAward = await prisma.award.findUnique({
      where: { name: awardName }
    })

    let award
    if (existingAward) {
      // Update existing award
      award = await prisma.award.update({
        where: { name: awardName },
        data: {
          country,
          language,
          description: description || undefined,
          entryKitPath: `/uploads/entry-kits/${filename}`,
          uploadDate: new Date(),
        }
      })
    } else {
      // Create new award
      award = await prisma.award.create({
        data: {
          name: awardName,
          country,
          language,
          description: description || undefined,
          entryKitPath: `/uploads/entry-kits/${filename}`,
          uploadDate: new Date(),
        }
      })
    }

    // TODO: Process PDF to extract categories (implement in next phase)

    return NextResponse.redirect(new URL('/awards', request.url))
  } catch (error) {
    console.error('Error uploading entry kit:', error)
    return NextResponse.json(
      { error: 'Failed to upload entry kit' },
      { status: 500 }
    )
  }
}
