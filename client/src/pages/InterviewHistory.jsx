import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'

import {
  FaArrowLeft,
  FaChartLine,
  FaClock,
  FaMicrophone,
  FaRobot
} from 'react-icons/fa'

import { motion } from "motion/react"

function InterviewHistory() {

  const [interviews, setInterviews] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const getMyInterviews = async () => {

      try {

        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true }
        )

        setInterviews(result.data)

      } catch (error) {
        console.log(error)
      }
    }

    getMyInterviews()

  }, [])

  return (

    <div className='
      min-h-screen
      bg-[#050505]
      relative
      overflow-hidden
      px-4
      py-10
    '>

      {/* BACKGROUND GRADIENTS */}
      <div className='absolute top-[-200px] left-[5%] w-[420px] h-[420px] bg-green-500/10 blur-[140px] rounded-full'></div>

      <div className='absolute bottom-[-250px] right-[5%] w-[420px] h-[420px] bg-emerald-500/10 blur-[140px] rounded-full'></div>

      <div className='max-w-6xl mx-auto relative z-10'>

        {/* HEADER */}
        <div className='mb-10 flex items-start gap-4 flex-wrap'>

          <button
            onClick={() => navigate("/")}
            className='
              w-12 h-12
              rounded-2xl
              bg-[#0f0f0f]
              border border-[#1c1c1c]
              text-white
              flex items-center justify-center
              hover:border-green-500/30
              hover:scale-105
              transition-all duration-300
            '
          >

            <FaArrowLeft size={14} />

          </button>

          <div>

            <div className='
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-green-500/10
              border border-green-500/20
              text-green-400
              text-xs
              mb-4
              tracking-wide
            '>

              <FaRobot size={11} />

              AI PERFORMANCE TRACKING

            </div>

            <h1 className='
              text-3xl md:text-5xl
              font-black
              text-white
              leading-tight
            '>

              Interview

              <span className='
                bg-gradient-to-r
                from-green-300
                via-green-400
                to-emerald-500
                bg-clip-text
                text-transparent
                ml-3
              '>

                History

              </span>

            </h1>

            <p className='
              text-gray-400
              text-sm md:text-base
              mt-4
              max-w-2xl
              leading-relaxed
            '>

              Review your AI interviews,
              track your performance,
              and analyze detailed feedback reports.

            </p>

          </div>

        </div>

        {/* EMPTY */}
        {interviews.length === 0 ? (

          <motion.div

            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}

            className='
              bg-[#0c0c0c]
              border border-[#1a1a1a]
              rounded-[28px]
              p-12
              text-center
              relative
              overflow-hidden
            '
          >

            <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'></div>

            <div className='relative z-10'>

              <div className='
                w-20 h-20
                rounded-3xl
                bg-gradient-to-br
                from-green-300
                to-emerald-500
                text-black
                flex items-center justify-center
                mx-auto
                mb-6
                shadow-[0_0_40px_rgba(34,197,94,0.20)]
              '>

                <FaChartLine size={28} />

              </div>

              <h2 className='text-2xl font-bold text-white mb-3'>
                No Interviews Yet
              </h2>

              <p className='
                text-gray-400
                max-w-lg
                mx-auto
                text-sm
                leading-relaxed
              '>

                Start your first AI-powered interview
                and unlock analytics,
                smart insights,
                and detailed performance tracking.

              </p>

              <button
                onClick={() => navigate("/")}
                className='
                  mt-8
                  px-7 py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-green-300
                  to-emerald-500
                  text-black
                  font-semibold
                  hover:scale-105
                  transition-all duration-300
                  shadow-[0_0_35px_rgba(34,197,94,0.20)]
                '
              >

                Start Interview

              </button>

            </div>

          </motion.div>

        ) : (

          <div className='grid gap-5'>

            {interviews.map((item, index) => (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{ delay: index * 0.04 }}

                whileHover={{
                  y: -4,
                  scale: 1.01
                }}

                onClick={() => navigate(`/report/${item._id}`)}

                className='
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border border-[#1a1a1a]
                  bg-[#0b0b0b]/90
                  hover:bg-[#101010]
                  backdrop-blur-xl
                  p-5
                  cursor-pointer
                  transition-all duration-300
                  hover:border-green-500/20
                  hover:shadow-[0_0_40px_rgba(34,197,94,0.06)]
                '
              >

                {/* GLOW */}
                <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'></div>

                <div className='
                  relative z-10
                  flex flex-col lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                '>

                  {/* LEFT */}
                  <div className='flex items-start gap-4'>

                    <div className='
                      min-w-[58px]
                      h-[58px]
                      rounded-2xl
                      bg-gradient-to-br
                      from-green-300
                      to-emerald-500
                      flex items-center justify-center
                      text-black
                      shadow-[0_0_25px_rgba(34,197,94,0.20)]
                    '>

                      <FaMicrophone size={20} />

                    </div>

                    <div>

                      <h3 className='text-xl font-bold text-white'>
                        {item.role}
                      </h3>

                      <div className='flex flex-wrap items-center gap-2 mt-3'>

                        <span className='
                          px-3 py-1.5
                          rounded-full
                          bg-[#151515]
                          border border-[#232323]
                          text-gray-300
                          text-xs
                        '>

                          {item.experience}

                        </span>

                        <span className='
                          px-3 py-1.5
                          rounded-full
                          bg-green-500/10
                          border border-green-500/20
                          text-green-400
                          text-xs
                        '>

                          {item.mode}

                        </span>

                      </div>

                      <div className='
                        flex items-center gap-2
                        mt-4
                        text-gray-500
                        text-xs
                      '>

                        <FaClock size={10} />

                        {new Date(item.createdAt).toLocaleDateString()}

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className='flex items-center gap-5 flex-wrap'>

                    {/* SCORE */}
                    <div className='text-center'>

                      <div className='
                        w-20 h-20
                        rounded-3xl
                        bg-[#111111]
                        border border-[#1c1c1c]
                        flex flex-col items-center justify-center
                      '>

                        <h2 className='
                          text-2xl
                          font-black
                          text-green-400
                        '>

                          {item.finalScore || 0}

                        </h2>

                        <p className='
                          text-[10px]
                          text-gray-500
                          mt-1
                        '>

                          OUT OF 10

                        </p>

                      </div>

                    </div>

                    {/* STATUS */}
                    <div>

                      <span
                        className={`
                          px-4 py-2
                          rounded-2xl
                          text-xs
                          font-semibold
                          border

                          ${item.status === "completed"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }
                        `}
                      >

                        {item.status}

                      </span>

                    </div>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default InterviewHistory

