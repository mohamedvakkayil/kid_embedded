import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, metadata } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Missing interaction type' },
        { status: 400 }
      )
    }

    const interaction = await prisma.interaction.create({
      data: {
        type,
        metadata: metadata || {},
      },
    })

    return NextResponse.json({ success: true, interaction }, { status: 201 })
  } catch (error) {
    console.error('Error logging interaction:', error)
    return NextResponse.json(
      { error: 'Failed to log interaction' },
      { status: 500 }
    )
  }
}

