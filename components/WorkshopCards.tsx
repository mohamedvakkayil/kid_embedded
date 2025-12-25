'use client'

import { RobotState } from '@/types'

interface WorkshopCardsProps {
  state: RobotState
  onStateChange: (updates: Partial<RobotState>) => void
}

export default function WorkshopCards({ state, onStateChange }: WorkshopCardsProps) {
  const updateShape = (type: 'square' | 'round') => {
    onStateChange({ shape: type })
  }

  const updateMood = (mood: 'happy' | 'cool' | 'surprised') => {
    onStateChange({ mood })
  }

  const updateColor = (color: string) => {
    onStateChange({ color })
  }

  const toggleAccessory = (acc: string) => {
    const newAccessories = new Set(state.accessories)
    if (newAccessories.has(acc)) {
      newAccessories.delete(acc)
    } else {
      newAccessories.add(acc)
    }
    onStateChange({ accessories: newAccessories })
  }

  const powerUp = () => {
    const newCharge = Math.min(state.charge + 20, 100)
    onStateChange({ charge: newCharge })
    
    if (newCharge === 100) {
      // Trigger banana rain effect (handled in RobotBuilder)
      const event = new CustomEvent('powerUp')
      window.dispatchEvent(event)
    }
  }

  const getPersonaText = () => {
    const moods = {
      happy: 'Friendly & Ready!',
      cool: 'Too chill for components.',
      surprised: 'Did someone say battery?',
    }
    return `Current vibe: ${moods[state.mood]} (${state.shape} edition)`
  }

  return (
    <div className="max-w-6xl mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      {/* Card 1: Shape & Form */}
      <div className="workshop-card bg-white rounded-clay p-8 text-center flex flex-col items-center gap-6 shadow-clay transition-all duration-500 hover:-translate-y-2 border-4 border-white">
        <h2 className="text-robot-purple font-sniglet text-2xl">1. Choose Chassis</h2>
        <div className="flex justify-center gap-4 w-full flex-wrap">
          <button
            onClick={() => updateShape('square')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[120px] ${
              state.shape === 'square'
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Square
          </button>
          <button
            onClick={() => updateShape('round')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[120px] ${
              state.shape === 'round'
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Round
          </button>
        </div>
        <div className="flex justify-center gap-4 w-full flex-wrap">
          <button
            onClick={() => toggleAccessory('antennas')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[120px] ${
              state.accessories.has('antennas')
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Add Antennas
          </button>
          <button
            onClick={() => toggleAccessory('bow')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[120px] ${
              state.accessories.has('bow')
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Add Bow-tie
          </button>
        </div>
      </div>

      {/* Card 2: Persona */}
      <div className="workshop-card bg-white rounded-clay p-8 text-center flex flex-col items-center gap-6 shadow-clay transition-all duration-500 hover:-translate-y-2 border-4 border-white">
        <h2 className="text-robot-purple font-sniglet text-2xl">2. Set Persona</h2>
        <div className="flex justify-center gap-4 w-full flex-wrap">
          <button
            onClick={() => updateMood('happy')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[100px] ${
              state.mood === 'happy'
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Happy
          </button>
          <button
            onClick={() => updateMood('cool')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[100px] ${
              state.mood === 'cool'
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Cool
          </button>
          <button
            onClick={() => updateMood('surprised')}
            className={`px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 flex-1 min-w-[100px] ${
              state.mood === 'surprised'
                ? 'bg-robot-blue text-white border-2 border-white'
                : 'bg-white text-robot-purple border-2 border-transparent'
            }`}
          >
            Wink
          </button>
        </div>
        <p className="text-sm text-gray-600">{getPersonaText()}</p>
      </div>

      {/* Card 3: Color Palette */}
      <div className="workshop-card bg-white rounded-clay p-8 text-center flex flex-col items-center gap-6 shadow-clay transition-all duration-500 hover:-translate-y-2 border-4 border-white">
        <h2 className="text-robot-purple font-sniglet text-2xl">3. Custom Paint</h2>
        <div className="flex justify-center gap-4 w-full flex-wrap">
          <button
            onClick={() => updateColor('var(--blue)')}
            className="w-14 h-14 rounded-2xl shadow-clay cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-robot-blue border-2 border-white"
            title="Blue"
          />
          <button
            onClick={() => updateColor('var(--pink)')}
            className="w-14 h-14 rounded-2xl shadow-clay cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-robot-pink border-2 border-white"
            title="Pink"
          />
          <button
            onClick={() => updateColor('var(--green)')}
            className="w-14 h-14 rounded-2xl shadow-clay cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-robot-green border-2 border-white"
            title="Green"
          />
          <button
            onClick={() => updateColor('var(--purple)')}
            className="w-14 h-14 rounded-2xl shadow-clay cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 bg-robot-purple border-2 border-white"
            title="Purple"
          />
        </div>
        <div className="mt-4 w-full h-10 border-4 border-gray-200 rounded-full relative overflow-hidden">
          <div
            className="h-full bg-robot-green transition-all duration-1000"
            style={{ width: `${state.charge}%` }}
          />
        </div>
        <button
          onClick={powerUp}
          className="w-full px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer bg-robot-green text-white shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border-2 border-transparent"
        >
          INJECT BANANA POWER
        </button>
      </div>
    </div>
  )
}

