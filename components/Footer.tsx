import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-center py-16 px-8">
      <div className="inline-flex items-center gap-4 bg-robot-green text-white px-10 py-4 rounded-full text-2xl font-sniglet shadow-clay border-4 border-white">
        <svg width="30" height="30" viewBox="0 0 100 100">
          <path d="M20 40 Q40 30 80 70 Q50 90 20 40" fill="#fff" />
        </svg>
        DESIGNER MODE ENABLED
        <svg width="30" height="30" viewBox="0 0 100 100">
          <path d="M20 40 Q40 30 80 70 Q50 90 20 40" fill="#fff" />
        </svg>
      </div>
      <p className="mt-8 font-bold text-robot-purple opacity-60">
        &copy; 2025 Technoplus Creative Labs
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <Link href="/tutorial" className="text-robot-blue hover:text-robot-blue-dark font-baloo font-semibold">
          View Tutorial →
        </Link>
      </div>
    </footer>
  )
}

