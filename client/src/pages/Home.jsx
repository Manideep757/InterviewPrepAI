
import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsStars
} from "react-icons/bs";

import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';

import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

import Footer from '../components/Footer';

function Home() {

  const { userData } = useSelector((state) => state.user)

  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate()

  const handleProtectedRoute = (path) => {
    if (!userData) {
      setShowAuth(true)
      return
    }

    navigate(path)
  }

  return (

    <div className='min-h-screen bg-black text-white overflow-hidden relative'>

      {/* BACKGROUND */}
      <div className='absolute inset-0 overflow-hidden'>

        <div className='absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-green-500/30 blur-[140px] rounded-full'></div>

        <div className='absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-emerald-400/20 blur-[140px] rounded-full'></div>

        <div className='absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-lime-400/10 blur-[120px] rounded-full'></div>

      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className='relative z-10 px-6 pt-24 pb-32'>

        <div className='max-w-7xl mx-auto text-center'>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='inline-flex items-center gap-3 bg-white/5 border border-green-500/20 px-6 py-3 rounded-full backdrop-blur-xl mb-10 shadow-lg shadow-green-500/10'
          >

            <HiSparkles className='text-green-400' size={20} />

            <span className='text-gray-300 text-sm md:text-base'>
              Next Generation AI Interview Platform
            </span>

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-6xl md:text-8xl font-black leading-[1.05]'
          >

            Master Interviews
            <br />

            <span className='bg-gradient-to-r from-green-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent'>
              With AI Power
            </span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='text-gray-400 text-lg md:text-2xl leading-relaxed max-w-4xl mx-auto mt-10'
          >

            Experience hyper-realistic AI mock interviews,
            voice interaction, resume analysis,
            smart follow-up questions,
            and real-time performance evaluation.

          </motion.p>

          {/* BUTTONS */}
          <div className='flex flex-wrap justify-center gap-6 mt-14'>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleProtectedRoute("/interview")}
              className='relative overflow-hidden group px-12 py-5 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 text-black font-bold text-lg shadow-[0_0_40px_rgba(34,197,94,0.4)]'
            >

              <span className='relative z-10'>
                Start AI Interview
              </span>

              <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleProtectedRoute("/history")}
              className='px-12 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl text-white text-lg hover:border-green-500/40 hover:bg-white/10 transition-all'
            >
              View Analytics
            </motion.button>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className='relative z-10 px-6 pb-32'>

        <div className='max-w-7xl mx-auto'>

          <div className='grid md:grid-cols-3 gap-8'>

            {
              [
                {
                  icon: <BsRobot size={28} />,
                  title: "AI Role Analysis",
                  desc: "Adaptive interview questions based on your experience level."
                },

                {
                  icon: <BsMic size={28} />,
                  title: "Voice Based Interview",
                  desc: "Talk naturally with intelligent AI interviewer in real-time."
                },

                {
                  icon: <BsClock size={28} />,
                  title: "Real Interview Pressure",
                  desc: "Timed simulations for realistic placement preparation."
                }

              ].map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{
                    y: -10,
                    scale: 1.03
                  }}
                  className='relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 group'
                >

                  <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5'></div>

                  <div className='relative z-10'>

                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black mb-8 shadow-xl shadow-green-500/30'>
                      {item.icon}
                    </div>

                    <h3 className='text-2xl font-bold mb-5'>
                      {item.title}
                    </h3>

                    <p className='text-gray-400 leading-relaxed text-lg'>
                      {item.desc}
                    </p>

                  </div>

                </motion.div>

              ))
            }

          </div>

        </div>

      </section>

      {/* AI CAPABILITIES */}
      <section className='relative z-10 px-6 pb-32'>

        <div className='max-w-7xl mx-auto'>

          <h2 className='text-5xl md:text-6xl font-black text-center mb-20'>

            AI Interview
            <span className='bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent'>
              {" "}Capabilities
            </span>

          </h2>

          <div className='grid md:grid-cols-2 gap-10'>

            {
              [
                {
                  image: evalImg,
                  icon: <BsBarChart size={22} />,
                  title: "Answer Evaluation",
                  desc: "Analyze confidence, communication and technical accuracy."
                },

                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={22} />,
                  title: "Resume Based Questions",
                  desc: "Project-specific intelligent questioning based on your resume."
                },

                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={22} />,
                  title: "Detailed PDF Reports",
                  desc: "Download personalized performance analysis reports."
                },

                {
                  image: analyticsImg,
                  icon: <BsStars size={22} />,
                  title: "Performance Analytics",
                  desc: "Track progress and improve interview skills visually."
                }

              ].map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className='group rounded-[36px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 backdrop-blur-2xl overflow-hidden'
                >

                  <div className='flex flex-col md:flex-row items-center gap-8'>

                    <div className='w-full md:w-1/2 flex justify-center'>

                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full max-h-64 object-contain group-hover:scale-105 transition-all duration-500'
                      />

                    </div>

                    <div className='w-full md:w-1/2'>

                      <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black flex items-center justify-center mb-6'>
                        {item.icon}
                      </div>

                      <h3 className='text-3xl font-bold mb-5'>
                        {item.title}
                      </h3>

                      <p className='text-gray-400 text-lg leading-relaxed'>
                        {item.desc}
                      </p>

                    </div>

                  </div>

                </motion.div>

              ))
            }

          </div>

        </div>

      </section>

      {/* INTERVIEW MODES */}
      <section className='relative z-10 px-6 pb-32'>

        <div className='max-w-7xl mx-auto'>

          <h2 className='text-5xl md:text-6xl font-black text-center mb-20'>

            Multiple Interview
            <span className='bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent'>
              {" "}Modes
            </span>

          </h2>

          <div className='grid md:grid-cols-2 gap-10'>

            {
              [
                {
                  img: hrImg,
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication-based AI evaluation."
                },

                {
                  img: techImg,
                  title: "Technical Interview",
                  desc: "Role-specific technical mock interview experience."
                },

                {
                  img: confidenceImg,
                  title: "Confidence Analysis",
                  desc: "Voice confidence and speaking tone insights."
                },

                {
                  img: creditImg,
                  title: "Premium Credits",
                  desc: "Unlock unlimited advanced AI interview sessions."
                }

              ].map((mode, index) => (

                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className='rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 overflow-hidden group'
                >

                  <div className='flex items-center justify-between gap-6'>

                    <div className='w-1/2'>

                      <h3 className='text-3xl font-bold mb-5'>
                        {mode.title}
                      </h3>

                      <p className='text-gray-400 text-lg leading-relaxed'>
                        {mode.desc}
                      </p>

                    </div>

                    <div className='w-1/2 flex justify-end'>

                      <img
                        src={mode.img}
                        alt={mode.title}
                        className='w-40 h-40 object-contain group-hover:scale-110 transition-all duration-500'
                      />

                    </div>

                  </div>

                </motion.div>

              ))
            }

          </div>

        </div>

      </section>

      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

      <Footer />

    </div>
  )
}

export default Home

