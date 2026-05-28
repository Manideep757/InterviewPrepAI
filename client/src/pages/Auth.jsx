import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'

function Auth({ isModel = false }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleAuth = async () => {
        try {

            const response = await signInWithPopup(auth, provider)

            let User = response.user

            let name = User.displayName
            let email = User.email

            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name, email },
                { withCredentials: true }
            )

            dispatch(setUserData(result.data))

            navigate("/")

        } catch (error) {
            console.log("FULL GOOGLE ERROR:", error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div
            className={`
            w-full
            ${isModel
                    ? "py-4"
                    : "min-h-screen bg-black flex items-center justify-center px-6 py-16 overflow-hidden"}
        `}
        >

            {/* BACKGROUND EFFECTS */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-3xl'></div>

                <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl'></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`
                relative z-10 w-full
                ${isModel
                        ? "max-w-md"
                        : "max-w-6xl grid lg:grid-cols-2 gap-14 items-center"}
            `}
            >

                {/* LEFT SECTION */}
                {!isModel && (
                    <div className='text-white'>

                        <div className='flex items-center gap-4 mb-8'>
                            <div className='bg-green-500 p-4 rounded-3xl shadow-lg shadow-green-500/30'>
                                <BsRobot size={30} />
                            </div>

                            <h1 className='text-5xl font-black tracking-tight'>
                                Interview
                                <span className='text-green-500'>Prep</span>
                                AI
                            </h1>
                        </div>

                        <h2 className='text-5xl font-bold leading-tight mb-6'>
                            Practice Interviews with
                            <span className='block text-green-400'>
                                Artificial Intelligence
                            </span>
                        </h2>

                        <p className='text-gray-300 text-lg leading-relaxed max-w-xl mb-10'>
                            Experience realistic AI-powered mock interviews,
                            improve communication skills, boost confidence,
                            and receive instant performance feedback.
                        </p>

                        <div className='grid sm:grid-cols-2 gap-6'>

                            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-green-500/40 transition-all duration-300'>
                                <div className='w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-5'>
                                    <IoSparkles
                                        className='text-green-400'
                                        size={24}
                                    />
                                </div>

                                <h3 className='text-xl font-semibold mb-3'>
                                    AI Generated Questions
                                </h3>

                                <p className='text-gray-400 leading-relaxed text-sm'>
                                    Smart interview questions generated based
                                    on your role, skills, and resume.
                                </p>
                            </div>

                            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 hover:border-green-500/40 transition-all duration-300'>
                                <div className='w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-5'>
                                    <BsRobot
                                        className='text-green-400'
                                        size={24}
                                    />
                                </div>

                                <h3 className='text-xl font-semibold mb-3'>
                                    Voice AI Interview
                                </h3>

                                <p className='text-gray-400 leading-relaxed text-sm'>
                                    Talk with an intelligent AI interviewer
                                    in real-time and improve confidence.
                                </p>
                            </div>

                        </div>

                    </div>
                )}

                {/* AUTH CARD */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`
                    w-full
                    ${isModel
                            ? "max-w-md p-8 rounded-3xl"
                            : "max-w-lg mx-auto p-12 rounded-[40px]"}
                    bg-white/10
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-2xl
                `}
                >

                    {/* LOGO */}
                    <div className='flex items-center justify-center gap-3 mb-8'>

                        <div className='bg-green-500 text-white p-3 rounded-2xl shadow-lg shadow-green-500/30'>
                            <BsRobot size={22} />
                        </div>

                        <h2 className='text-4xl font-bold text-white'>
                            Interview
                            <span className='text-green-400'>Prep</span>
                            AI
                        </h2>

                    </div>

                    {/* TITLE */}
                    <div className='text-center mb-8'>

                        <h1 className='text-3xl font-bold text-white mb-5'>
                            Continue with
                        </h1>

                        <div className='inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 px-5 py-2 rounded-full text-lg font-medium'>
                            <IoSparkles size={18} />

                            AI Smart Interview
                        </div>

                    </div>

                    {/* DESCRIPTION */}
                    <p className='text-gray-300 text-center text-sm md:text-base leading-relaxed mb-10'>
                        Sign in to start AI-powered mock interviews,
                        track performance, improve communication skills,
                        and unlock advanced analytics.
                    </p>

                    {/* GOOGLE BUTTON */}
                    <motion.button
                        onClick={handleGoogleAuth}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className='
                        w-full
                        flex items-center justify-center gap-4
                        py-4 rounded-2xl
                        bg-gradient-to-r from-green-500 to-emerald-600
                        text-white font-semibold text-lg
                        shadow-xl shadow-green-500/20
                        transition-all duration-300
                    '
                    >

                        <div className='bg-white rounded-full p-1'>
                            <FcGoogle size={22} />
                        </div>

                        Continue with Google

                    </motion.button>

                    {/* FOOTER */}
                    <p className='text-center text-gray-500 text-xs mt-6'>
                        Secure authentication powered by Firebase & Google
                    </p>

                </motion.div>

            </motion.div>

        </div>
    )
}

export default Auth