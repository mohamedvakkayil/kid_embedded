'use client'

import { useEffect, useRef } from 'react'
import { RobotState } from '@/types'

interface RobotBuilderProps {
  state: RobotState
  onStateChange: (updates: Partial<RobotState>) => void
  onSnapshot: (svg: string) => void
}

export default function RobotBuilder({ state, onStateChange, onSnapshot }: RobotBuilderProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const headRef = useRef<SVGRectElement>(null)
  const mouthRef = useRef<SVGPathElement>(null)
  const eyeLeftRef = useRef<SVGCircleElement>(null)
  const eyeRightRef = useRef<SVGCircleElement>(null)
  const powerCoreRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (headRef.current) {
      headRef.current.setAttribute('rx', state.shape === 'square' ? '40' : '150')
    }
  }, [state.shape])

  useEffect(() => {
    if (headRef.current) {
      headRef.current.style.fill = state.color
    }
  }, [state.color])

  useEffect(() => {
    if (!mouthRef.current || !eyeLeftRef.current || !eyeRightRef.current) return

    if (state.mood === 'happy') {
      mouthRef.current.setAttribute('d', 'M150 280 Q200 310 250 280')
      eyeLeftRef.current.setAttribute('r', '35')
      eyeRightRef.current.setAttribute('r', '35')
    } else if (state.mood === 'cool') {
      mouthRef.current.setAttribute('d', 'M150 290 L250 290')
      eyeLeftRef.current.setAttribute('r', '35')
      eyeRightRef.current.setAttribute('r', '35')
    } else if (state.mood === 'surprised') {
      mouthRef.current.setAttribute('d', 'M180 290 Q200 320 220 290')
      eyeLeftRef.current.setAttribute('r', '35')
      eyeRightRef.current.setAttribute('r', '5')
    }
  }, [state.mood])

  useEffect(() => {
    if (powerCoreRef.current) {
      powerCoreRef.current.style.opacity = state.charge === 100 ? '1' : '0'
    }
  }, [state.charge])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const pupils = document.querySelectorAll('.pupil')
      const limit = 12

      pupils.forEach((p) => {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        const dx = Math.cos(angle) * limit
        const dy = Math.sin(angle) * limit
        ;(p as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const captureDesign = () => {
    if (!svgRef.current) return
    const svgData = svgRef.current.outerHTML
    onSnapshot(svgData)
  }

  const downloadSVG = () => {
    if (!svgRef.current) return
    const svgData = svgRef.current.outerHTML
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `robot_design_${Date.now()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const powerUp = () => {
    const newCharge = Math.min(state.charge + 20, 100)
    onStateChange({ charge: newCharge })
    
    if (newCharge === 100) {
      createBananaRain()
    }
  }

  const createBananaRain = () => {
    for (let i = 0; i < 20; i++) {
      const b = document.createElement('div')
      b.innerHTML = `<svg viewBox="0 0 100 100" width="30"><path d="M20 40 Q40 30 80 70 Q50 90 20 40" fill="var(--yellow)"/></svg>`
      b.style.position = 'fixed'
      b.style.left = Math.random() * 100 + 'vw'
      b.style.top = '-50px'
      b.style.zIndex = '1000'
      b.style.pointerEvents = 'none'
      document.body.appendChild(b)

      b.animate(
        [
          { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
          { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 },
        ],
        {
          duration: 2000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }
      ).onfinish = () => b.remove()
    }
  }

  return (
    <div className="relative w-full max-w-md aspect-square drop-shadow-[20px_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500">
      {/* Floating Bananas */}
      <div className="absolute top-[10%] left-[10%] w-[10%] max-w-10 z-10 pointer-events-none orbit-animation">
        <svg viewBox="0 0 100 100">
          <path d="M20 40 Q40 30 80 70 Q50 90 20 40" fill="var(--yellow)" />
        </svg>
      </div>
      <div className="absolute top-[10%] right-[10%] w-[10%] max-w-10 z-10 pointer-events-none orbit-animation-delayed">
        <svg viewBox="0 0 100 100">
          <path d="M20 40 Q40 30 80 70 Q50 90 20 40" fill="var(--yellow)" />
        </svg>
      </div>

      {/* Robot SVG */}
      <svg ref={svgRef} id="hero-robot-svg" viewBox="0 0 400 400" className="w-full h-full block">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="2" dy="5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g id="acc-back">
          {state.accessories.has('antennas') && (
            <g id="acc-antennas">
              <line x1="120" y1="60" x2="100" y2="10" stroke="#fff" strokeWidth="8" />
              <circle cx="100" cy="10" r="10" fill="var(--pink)" />
              <line x1="280" y1="60" x2="300" y2="10" stroke="#fff" strokeWidth="8" />
              <circle cx="300" cy="10" r="10" fill="var(--pink)" />
            </g>
          )}
        </g>

        <rect
          ref={headRef}
          id="robot-head"
          x="50"
          y="50"
          width="300"
          height="300"
          rx="60"
          fill="var(--blue)"
          stroke="#fff"
          strokeWidth="12"
          className="transition-all duration-500"
        />
        <rect x="70" y="70" width="260" height="260" rx="40" fill="rgba(255,255,255,0.2)" />

        <g className="gear-spin" style={{ transform: 'translate(320px, 80px)' }}>
          <path
            d="M-20 -5 L-20 5 L-30 10 L-25 20 L-15 15 L-5 25 L5 25 L15 15 L25 20 L30 10 L20 5 L20 -5 L30 -10 L25 -20 L15 -15 L5 -25 L-5 -25 L-15 -15 L-25 -20 L-30 -10 Z"
            fill="#fff"
            opacity="0.3"
          />
        </g>

        <g id="robot-eyes-group">
          <g className="eye-container" id="eye-l" transform="translate(130, 180)">
            <circle ref={eyeLeftRef} className="eye-blink" cx="0" cy="0" r="35" fill="#fff" />
            <circle className="pupil" cx="0" cy="0" r="15" fill="#2b2d42" />
          </g>
          <g className="eye-container" id="eye-r" transform="translate(270, 180)">
            <circle ref={eyeRightRef} className="eye-blink" cx="0" cy="0" r="35" fill="#fff" />
            <circle className="pupil" cx="0" cy="0" r="15" fill="#2b2d42" />
          </g>
        </g>

        <path
          ref={mouthRef}
          id="robot-mouth"
          d="M150 280 Q200 310 250 280"
          stroke="#fff"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300"
        />

        <g id="acc-front">
          {state.accessories.has('bow') && (
            <g id="acc-bow" transform="translate(200, 340)">
              <path d="M-40 -20 L40 20 L40 -20 L-40 20 Z" fill="var(--pink)" />
              <circle cx="0" cy="0" r="10" fill="#fff" />
            </g>
          )}
        </g>

        <g ref={powerCoreRef} id="power-core" className="transition-opacity duration-500" style={{ opacity: 0 }}>
          <circle cx="200" cy="200" r="40" fill="var(--yellow)" filter="url(#shadow)" />
          <path d="M190 190 Q200 185 215 205 Q205 215 190 190" fill="#fff" />
        </g>
      </svg>

      <div className="mt-8 flex gap-4 justify-center flex-wrap">
        <button
          onClick={captureDesign}
          className="px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer bg-robot-blue text-white shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border-2 border-transparent min-w-[140px]"
        >
          Capture Snapshot
        </button>
        <button
          onClick={downloadSVG}
          className="px-6 py-3 rounded-2xl font-baloo font-bold text-base cursor-pointer bg-robot-yellow text-white shadow-clay transition-all duration-200 hover:-translate-y-0.5 active:scale-95 border-2 border-transparent min-w-[140px]"
        >
          Download SVG
        </button>
      </div>
    </div>
  )
}

