'use client'

interface GalleryProps {
  snapshots: Array<{ id: string; svg: string }>
}

export default function Gallery({ snapshots }: GalleryProps) {
  if (snapshots.length === 0) {
    return (
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-sniglet text-4xl text-robot-purple mb-2">Your Design Gallery</h2>
          <p className="text-gray-600">Snapshots of your best robot faces</p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 px-2 scroll-snap-x snap-x-mandatory scrollbar-hide">
          <div className="min-w-[150px] w-[150px] aspect-square bg-white rounded-3xl p-2.5 shadow-clay snap-start border-3 border-white border-dashed flex items-center justify-center text-gray-400">
            Empty Slot
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-sniglet text-4xl text-robot-purple mb-2">Your Design Gallery</h2>
        <p className="text-gray-600">Snapshots of your best robot faces</p>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-8 px-2 scroll-snap-x snap-x-mandatory scrollbar-hide">
        {snapshots.map((snapshot) => (
          <div
            key={snapshot.id}
            className="min-w-[150px] w-[150px] aspect-square bg-white rounded-3xl p-2.5 shadow-clay snap-start border-3 border-white"
            dangerouslySetInnerHTML={{ __html: snapshot.svg }}
          />
        ))}
      </div>
    </section>
  )
}

