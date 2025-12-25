'use client'

import Link from 'next/link'

export default function Header() {

  const scrollToWorkshop = (index: number) => {
    const cards = document.querySelectorAll('.workshop-card')
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
      const card = cards[index] as HTMLElement
      card.style.borderColor = 'var(--blue)'
      setTimeout(() => {
        card.style.borderColor = '#fff'
      }, 2000)
    }
  }

  return (
    <header className="text-center px-4 py-8 relative">
      <Link 
        href="/tutorial" 
        className="absolute left-5 top-5 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-5 hover:border-robot-blue border-2 border-white"
        title="View Tutorial"
      >
        <svg viewBox="0 0 100 100" className="w-7 h-7">
          <path d="M20 50 L80 50 M20 30 L80 30 M20 70 L80 70" stroke="var(--blue-dark)" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </Link>

      <h1 className="font-sniglet text-4xl md:text-6xl lg:text-7xl text-robot-purple leading-tight mb-2 drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
        Robot Builder <span className="text-robot-yellow">Pro</span>
      </h1>
      
      <div className="bg-robot-yellow text-white inline-block px-6 py-2 rounded-full text-lg font-bold shadow-clay -rotate-1 border-4 border-white">
        AI-Powered Design Studio
      </div>

      <nav className="mt-8 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => scrollToWorkshop(0)}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-5 hover:border-robot-blue border-2 border-white"
          title="Shape"
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <rect x="25" y="25" width="50" height="50" rx="10" fill="var(--blue)" />
          </svg>
        </button>
        <button
          onClick={() => scrollToWorkshop(1)}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-5 hover:border-robot-blue border-2 border-white"
          title="Mood"
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <circle cx="50" cy="50" r="25" fill="var(--pink)" />
          </svg>
        </button>
        <button
          onClick={() => scrollToWorkshop(2)}
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-5 hover:border-robot-blue border-2 border-white"
          title="Colors"
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <path d="M50 20 L80 80 L20 80 Z" fill="var(--green)" />
          </svg>
        </button>
      </nav>
    </header>
  )
}

