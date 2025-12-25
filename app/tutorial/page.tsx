'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Introduction to Robot Face Design',
      description: 'Learn the fundamentals of creating expressive robot faces with professional techniques.',
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Building a robot face requires understanding both aesthetic design and technical implementation.
            This tutorial will guide you through creating a real, functional robot face.
          </p>
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-2xl text-robot-purple mb-4">What You&apos;ll Learn</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Material selection and preparation</li>
              <li>✓ Component integration and wiring</li>
              <li>✓ Expression programming</li>
              <li>✓ Testing and optimization</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Materials and Components',
      description: 'Essential components needed for your robot face project.',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-clay p-6 shadow-clay">
              <h3 className="font-sniglet text-xl text-robot-purple mb-3">Hardware</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Microcontroller (Arduino/Raspberry Pi)</li>
                <li>• LED matrix or OLED displays</li>
                <li>• Servo motors for movement</li>
                <li>• Sensors (camera, proximity)</li>
                <li>• Power supply and wiring</li>
              </ul>
            </div>
            <div className="bg-white rounded-clay p-6 shadow-clay">
              <h3 className="font-sniglet text-xl text-robot-purple mb-3">Software</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Programming IDE</li>
                <li>• Image processing libraries</li>
                <li>• Control software</li>
                <li>• Testing frameworks</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-xl text-robot-purple mb-3">Reference Images</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src="/properties/Gemini_Generated_Image_7whu137whu137whu.png"
                  alt="Robot face reference 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src="/properties/Gemini_Generated_Image_i094p1i094p1i094.png"
                  alt="Robot face reference 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Step-by-Step Assembly',
      description: 'Follow along with detailed assembly instructions.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-2xl text-robot-purple mb-4">Assembly Process</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-robot-blue pl-4">
                <h4 className="font-baloo font-bold text-lg mb-2">Step 1: Frame Setup</h4>
                <p className="text-gray-700">
                  Begin by constructing the base frame that will hold all components. Ensure proper spacing
                  for all electronic elements.
                </p>
              </div>
              <div className="border-l-4 border-robot-green pl-4">
                <h4 className="font-baloo font-bold text-lg mb-2">Step 2: Component Installation</h4>
                <p className="text-gray-700">
                  Mount displays, sensors, and motors according to your design specifications. Secure all
                  components firmly.
                </p>
              </div>
              <div className="border-l-4 border-robot-yellow pl-4">
                <h4 className="font-baloo font-bold text-lg mb-2">Step 3: Wiring</h4>
                <p className="text-gray-700">
                  Connect all components following the wiring diagram. Double-check all connections before
                  powering on.
                </p>
              </div>
              <div className="border-l-4 border-robot-purple pl-4">
                <h4 className="font-baloo font-bold text-lg mb-2">Step 4: Programming</h4>
                <p className="text-gray-700">
                  Upload your control software and configure expression parameters. Test each component
                  individually.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-xl text-robot-purple mb-4">Video Tutorial</h3>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <video
                controls
                className="w-full h-full object-cover"
                src="/properties/Video_Feedback_and_Corrections.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Programming Expressions',
      description: 'Code your robot to display different emotions and reactions.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-2xl text-robot-purple mb-4">Expression Library</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['Happy', 'Cool', 'Surprised', 'Sad', 'Angry', 'Sleepy'].map((emotion) => (
                <div
                  key={emotion}
                  className="p-4 bg-gray-50 rounded-2xl text-center hover:bg-robot-blue hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-baloo font-bold">{emotion}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-xl text-robot-purple mb-4">Code Example</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {`function setExpression(emotion) {
  switch(emotion) {
    case 'happy':
      eyes.open();
      mouth.smile();
      break;
    case 'cool':
      eyes.halfOpen();
      mouth.neutral();
      break;
    case 'surprised':
      eyes.wide();
      mouth.open();
      break;
  }
}`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      title: 'Testing and Optimization',
      description: 'Ensure your robot face works perfectly before final deployment.',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-2xl text-robot-purple mb-4">Testing Checklist</h3>
            <div className="space-y-3">
              {[
                'All displays render correctly',
                'Servo motors respond to commands',
                'Sensors provide accurate readings',
                'Power consumption within limits',
                'No overheating issues',
                'Expressions transition smoothly',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-clay p-6 shadow-clay">
            <h3 className="font-sniglet text-xl text-robot-purple mb-4">Performance Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Optimize image processing algorithms</li>
              <li>• Use efficient data structures</li>
              <li>• Implement caching for frequently used expressions</li>
              <li>• Monitor resource usage continuously</li>
            </ul>
          </div>
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen">
      <header className="text-center px-4 py-8 relative">
        <Link
          href="/"
          className="absolute left-5 top-5 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-clay cursor-pointer transition-all duration-500 hover:scale-110 hover:rotate-5 hover:border-robot-blue border-2 border-white"
          title="Back to Home"
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <path d="M30 50 L70 50 M30 30 L50 50 M30 70 L50 50" stroke="var(--blue-dark)" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </Link>

        <h1 className="font-sniglet text-4xl md:text-6xl text-robot-purple leading-tight mb-2">
          Robot Face <span className="text-robot-yellow">Tutorial</span>
        </h1>
        <p className="text-lg text-gray-600">Complete guide to building a real robot face</p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-8">
        {/* Step Navigation */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`px-6 py-3 rounded-2xl font-baloo font-bold text-sm whitespace-nowrap transition-all duration-200 ${
                currentStep === index
                  ? 'bg-robot-blue text-white shadow-clay border-2 border-white'
                  : 'bg-white text-robot-purple shadow-clay border-2 border-transparent hover:-translate-y-1'
              }`}
            >
              Step {index + 1}
            </button>
          ))}
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-clay p-8 shadow-clay border-4 border-white">
          <h2 className="font-sniglet text-3xl text-robot-purple mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 mb-6 text-lg">{steps[currentStep].description}</p>
          <div>{steps[currentStep].content}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-2xl font-baloo font-bold bg-white text-robot-purple shadow-clay border-2 border-transparent transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 rounded-2xl font-baloo font-bold bg-robot-blue text-white shadow-clay border-2 border-transparent transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  )
}

