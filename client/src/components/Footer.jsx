
import React from 'react'
import {
  BsRobot,
  BsTwitterX,
  BsGithub,
  BsInstagram
} from 'react-icons/bs'

function Footer() {

  return (

    <footer className='relative px-6 pb-8 pt-24 overflow-hidden'>

      {/* GLOW */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-green-500/10 blur-[120px] rounded-full'></div>

      <div className='max-w-7xl mx-auto relative z-10'>

        <div className='
          bg-white/5
          backdrop-blur-2xl
          border border-white/10
          rounded-[36px]
          p-10 md:p-14
          shadow-[0_0_40px_rgba(34,197,94,0.08)]
        '>

          <div className='grid md:grid-cols-3 gap-12'>

            {/* LEFT */}
            <div>

              <div className='flex items-center gap-4 mb-6'>

                <div className='bg-gradient-to-br from-green-400 to-emerald-600 text-black p-3 rounded-2xl shadow-xl shadow-green-500/30'>
                  <BsRobot size={22} />
                </div>

                <div>

                  <h2 className='text-3xl font-black text-white'>
                    Interview
                    <span className='bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent'>
                      Prep
                    </span>
                    AI
                  </h2>

                  <p className='text-gray-500 text-sm'>
                    Next Gen Interview Platform
                  </p>

                </div>

              </div>

              <p className='text-gray-400 leading-relaxed text-lg'>
                AI-powered interview preparation platform designed
                to improve technical skills, confidence,
                communication, and placement readiness.
              </p>

            </div>

            {/* CENTER */}
            <div>

              <h3 className='text-white font-bold text-xl mb-6'>
                Quick Links
              </h3>

              <div className='space-y-4'>

                {
                  [
                    "Home",
                    "Interview",
                    "Analytics",
                    "Pricing"
                  ].map((item, index) => (

                    <p
                      key={index}
                      className='text-gray-400 hover:text-green-400 cursor-pointer transition-all duration-300'
                    >
                      {item}
                    </p>

                  ))
                }

              </div>

            </div>

            {/* RIGHT */}
            <div>

              <h3 className='text-white font-bold text-xl mb-6'>
                Connect
              </h3>

              <div className='flex items-center gap-4 mb-6'>

                {
                  [
                    <BsTwitterX />,
                    <BsGithub />,
                    <BsInstagram />
                  ].map((icon, index) => (

                    <div
                      key={index}
                      className='w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/40 hover:bg-green-500/10 text-white hover:text-green-400 flex items-center justify-center cursor-pointer transition-all duration-300'
                    >
                      {icon}
                    </div>

                  ))
                }

              </div>

              <p className='text-gray-500 leading-relaxed'>
                Built with AI, React, Node.js and modern web technologies.
              </p>

            </div>

          </div>

          {/* BOTTOM */}
          <div className='border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>

            <p className='text-gray-500 text-sm'>
              © 2026 InterviewPrepAI. All rights reserved.
            </p>

            <p className='text-gray-600 text-sm'>
              Designed for next-generation interview preparation.
            </p>

          </div>

        </div>

      </div>

    </footer>

  )
}

export default Footer

