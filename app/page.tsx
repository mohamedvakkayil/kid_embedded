'use client'

import { useState } from 'react'
import RobotBuilder from '@/components/RobotBuilder'
import WorkshopCards from '@/components/WorkshopCards'
import Gallery from '@/components/Gallery'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RobotState } from '@/types'

export default function Home() {
  const [robotState, setRobotState] = useState<RobotState>({
    shape: 'square',
    mood: 'happy',
    color: 'var(--blue)',
    accessories: new Set<string>(),
    charge: 20,
  })

  const [snapshots, setSnapshots] = useState<Array<{ id: string; svg: string }>>([])

  const updateRobotState = (updates: Partial<typeof robotState>) => {
    setRobotState(prev => ({ ...prev, ...updates }))
  }

  const addSnapshot = (svg: string) => {
    setSnapshots(prev => [{ id: Date.now().toString(), svg }, ...prev])
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="flex flex-col items-center justify-center px-4 py-8 min-h-[450px]">
        <RobotBuilder 
          state={robotState} 
          onStateChange={updateRobotState}
          onSnapshot={addSnapshot}
        />
      </section>

      <WorkshopCards 
        state={robotState} 
        onStateChange={updateRobotState}
      />

      <Gallery snapshots={snapshots} />

      <Footer />
    </main>
  )
}

