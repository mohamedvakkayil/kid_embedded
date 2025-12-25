import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { svgData, state } = body

    if (!svgData || !state) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const design = await prisma.design.create({
      data: {
        svgData,
        state,
      },
    })

    return NextResponse.json({ success: true, design }, { status: 201 })
  } catch (error) {
    console.error('Error saving design:', error)
    return NextResponse.json(
      { error: 'Failed to save design' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const designs = await prisma.design.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ designs }, { status: 200 })
  } catch (error) {
    console.error('Error fetching designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    )
  }
}

