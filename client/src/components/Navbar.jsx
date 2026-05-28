
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"

import {
  BsRobot,
  BsCoin,
  BsStars,
  BsLightningChargeFill
} from "react-icons/bs";

import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {

  const { userData } = useSelector((state) => state.user)

  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showAuth, setShowAuth] = useState(false);

  const handleLogout = async () => {

    try {

      await axios.get(
        ServerUrl + "/api/auth/logout",
        { withCredentials: true }
      )

      dispatch(setUserData(null))

      setShowCreditPopup(false)
      setShowUserPopup(false)

      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className='sticky top-0 z-[999] px-4 pt-5'>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}

        className='
        relative
        max-w-7xl mx-auto
        bg-[#0b0b0b]
        border border-[#1f1f1f]
        rounded-[30px]
        px-8 py-5
        flex justify-between items-center
        shadow-[0_10px_60px_rgba(0,0,0,0.6)]
        overflow-visible
      '
      >

        {/* GREEN GLOW */}
        <div className='
          absolute
          top-[-80px]
          left-[20%]
          w-[300px]
          h-[300px]
          bg-green-500/10
          blur-[120px]
          rounded-full
          pointer-events-none
        ' />

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className='
          flex items-center gap-4
          cursor-pointer
          relative z-50
        '
        >

          <div className='
            w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-green-300
            via-green-400
            to-emerald-500
            flex items-center justify-center
            text-black
            shadow-[0_0_35px_rgba(34,197,94,0.45)]
          '>

            <BsRobot size={24} />

          </div>

          <div>

            <h1 className='
              text-2xl
              font-black
              tracking-tight
              text-white
            '>

              Interview
              <span className='bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent'>
                Prep
              </span>
              AI

            </h1>

            <p className='text-gray-500 text-xs tracking-wide'>
              AI Powered Mock Interviews
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-4 relative z-50'>

          {/* CREDIT BUTTON */}
          <div className='relative'>

            <button

              onClick={() => {

                if (!userData) {
                  setShowAuth(true)
                  return;
                }

                setShowCreditPopup(!showCreditPopup)
                setShowUserPopup(false)

              }}

              className='
              group
              flex items-center gap-3
              bg-[#151515]
              hover:bg-[#1c1c1c]
              border border-[#262626]
              hover:border-green-500/40
              px-5 py-3
              rounded-2xl
              transition-all duration-300
              shadow-lg
            '
            >

              <div className='
                w-10 h-10
                rounded-xl
                bg-gradient-to-r
                from-green-300
                to-emerald-500
                flex items-center justify-center
                text-black
                shadow-[0_0_20px_rgba(34,197,94,0.4)]
              '>

                <BsCoin size={18} />

              </div>

              <div className='text-left'>

                <p className='text-[11px] text-gray-500 uppercase'>
                  Credits
                </p>

                <h3 className='text-white font-bold leading-none'>
                  {userData?.credits || 0}
                </h3>

              </div>

            </button>

            {/* CREDIT POPUP */}
            {showCreditPopup && (

              <div className='
                absolute right-0 mt-5
                w-80
                bg-[#0d0d0d]
                border border-[#242424]
                rounded-[28px]
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              '>

                <div className='
                  absolute inset-0
                  bg-gradient-to-br
                  from-green-500/5
                  via-transparent
                  to-emerald-500/5
                  rounded-[28px]
                  pointer-events-none
                ' />

                <div className='relative z-10'>

                  <div className='flex items-center gap-4 mb-5'>

                    <div className='
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-r
                      from-green-300
                      to-emerald-500
                      flex items-center justify-center
                      text-black
                    '>

                      <BsStars size={22} />

                    </div>

                    <div>

                      <h2 className='text-white text-xl font-bold'>
                        Premium Credits
                      </h2>

                      <p className='text-gray-400 text-sm'>
                        Unlock unlimited interview sessions
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => navigate("/pricing")}
                    className='
                    w-full
                    py-4
                    rounded-2xl
                    font-bold
                    text-black
                    bg-gradient-to-r
                    from-green-300
                    to-emerald-500
                    hover:scale-[1.02]
                    transition-all
                    shadow-[0_0_30px_rgba(34,197,94,0.35)]
                  '
                  >

                    Upgrade Now

                  </button>

                </div>

              </div>

            )}

          </div>

          {/* USER BUTTON */}
          <div className='relative'>

            <button

              onClick={() => {

                if (!userData) {
                  setShowAuth(true)
                  return;
                }

                setShowUserPopup(!showUserPopup)
                setShowCreditPopup(false)

              }}

              className='
              relative
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-green-300
              to-emerald-500
              text-black
              flex items-center justify-center
              text-xl
              font-black
              shadow-[0_0_35px_rgba(34,197,94,0.4)]
              hover:scale-105
              transition-all duration-300
            '
            >

              {
                userData
                  ? userData?.name?.slice(0, 1).toUpperCase()
                  : <FaUserAstronaut size={20} />
              }

            </button>

            {/* USER POPUP */}
            {showUserPopup && (

              <div className='
                absolute right-0 mt-5
                w-72
                bg-[#0d0d0d]
                border border-[#242424]
                rounded-[28px]
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.8)]
              '>

                <div className='
                  flex items-center gap-4
                  pb-5 mb-5
                  border-b border-[#202020]
                '>

                  <div className='
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-green-300
                    to-emerald-500
                    flex items-center justify-center
                    text-black
                    text-xl
                    font-black
                  '>

                    {userData?.name?.slice(0, 1).toUpperCase()}

                  </div>

                  <div>

                    <h3 className='text-white text-lg font-bold'>
                      {userData?.name}
                    </h3>

                    <p className='text-gray-500 text-sm'>
                      Active Account
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => navigate("/history")}
                  className='
                  w-full
                  flex items-center gap-3
                  px-5 py-4
                  rounded-2xl
                  text-gray-300
                  hover:bg-[#171717]
                  hover:text-green-400
                  transition-all
                  mb-3
                '
                >

                  <BsLightningChargeFill size={18} />

                  Interview History

                </button>

                <button
                  onClick={handleLogout}
                  className='
                  w-full
                  flex items-center gap-3
                  px-5 py-4
                  rounded-2xl
                  text-red-400
                  hover:bg-red-500/10
                  transition-all
                '
                >

                  <HiOutlineLogout size={18} />

                  Logout

                </button>

              </div>

            )}

          </div>

        </div>

      </motion.div>

      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

    </div>
  )
}

export default Navbar

