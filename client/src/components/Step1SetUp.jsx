import React from 'react'
import { motion } from "motion/react"

import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";

import { useState } from 'react';
import axios from "axios"

import { ServerUrl } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {

    const { userData } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    const [resumeText, setResumeText] = useState("");

    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {

        if (!resumeFile || analyzing) return;

        setAnalyzing(true)

        const formdata = new FormData()

        formdata.append("resume", resumeFile)

        try {

            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            )

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");

            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);

            setResumeText(result.data.resumeText || "");

            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {

            console.log(error)

            setAnalyzing(false);
        }
    }

    const handleStart = async () => {

        setLoading(true)

        try {

            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                {
                    role,
                    experience,
                    mode,
                    resumeText,
                    projects,
                    skills
                },
                { withCredentials: true }
            )

            if (userData) {

                dispatch(setUserData({
                    ...userData,
                    credits: result.data.creditsLeft
                }))
            }

            setLoading(false)

            onStart(result.data)

        } catch (error) {

            console.log(error)

            setLoading(false)
        }
    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}

            className='
                min-h-screen
                flex items-center justify-center
                bg-[#050505]
                overflow-hidden
                relative
                px-4 py-10
            '
        >

            {/* GLOW */}
            <div className='absolute top-[-200px] left-[5%] w-[420px] h-[420px] bg-green-500/10 blur-[130px] rounded-full'></div>

            <div className='absolute bottom-[-200px] right-[5%] w-[420px] h-[420px] bg-emerald-500/10 blur-[130px] rounded-full'></div>

            <div className='
                w-full
                max-w-6xl
                bg-[#0b0b0b]
                border border-[#1a1a1a]
                rounded-[34px]
                overflow-hidden
                grid md:grid-cols-2
                relative z-10
                shadow-[0_0_60px_rgba(0,0,0,0.6)]
            '>

                {/* LEFT */}
                <motion.div

                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}

                    transition={{ duration: 0.6 }}

                    className='
                        relative
                        p-10 md:p-12
                        bg-gradient-to-br
                        from-[#101010]
                        to-[#0b0b0b]
                        border-r border-[#1a1a1a]
                        flex flex-col justify-center
                    '
                >

                    <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'></div>

                    <div className='relative z-10'>

                        <div className='
                            inline-flex items-center gap-2
                            px-4 py-2
                            rounded-full
                            bg-green-500/10
                            border border-green-500/20
                            text-green-400
                            text-xs
                            mb-6
                            tracking-wide
                        '>

                            AI SMART INTERVIEW

                        </div>

                        <h2 className='
                            text-4xl md:text-5xl
                            font-black
                            text-white
                            leading-tight
                            mb-6
                        '>

                            Start Your

                            <span className='block bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent'>
                                AI Interview
                            </span>

                        </h2>

                        <p className='
                            text-gray-400
                            leading-relaxed
                            text-sm md:text-base
                            mb-10
                            max-w-lg
                        '>

                            Practice realistic AI-powered interviews,
                            improve technical knowledge,
                            communication skills,
                            and confidence.

                        </p>

                        <div className='space-y-4'>

                            {
                                [
                                    {
                                        icon: <FaUserTie className="text-green-400 text-lg" />,
                                        text: "Choose Role & Experience",
                                    },

                                    {
                                        icon: <FaMicrophoneAlt className="text-green-400 text-lg" />,
                                        text: "AI Voice Interview",
                                    },

                                    {
                                        icon: <FaChartLine className="text-green-400 text-lg" />,
                                        text: "Detailed Performance Analytics",
                                    },

                                ].map((item, index) => (

                                    <motion.div

                                        key={index}

                                        whileHover={{ scale: 1.02 }}

                                        className='
                                            flex items-center gap-4
                                            bg-[#111111]
                                            border border-[#1c1c1c]
                                            p-4
                                            rounded-2xl
                                            hover:border-green-500/20
                                            transition-all duration-300
                                        '
                                    >

                                        <div className='
                                            w-10 h-10
                                            rounded-xl
                                            bg-green-500/10
                                            flex items-center justify-center
                                        '>

                                            {item.icon}

                                        </div>

                                        <span className='text-gray-300 text-sm md:text-base'>
                                            {item.text}
                                        </span>

                                    </motion.div>

                                ))
                            }

                        </div>

                    </div>

                </motion.div>

                {/* RIGHT */}
                <motion.div

                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}

                    transition={{ duration: 0.6 }}

                    className='
                        p-8 md:p-10
                        bg-[#0b0b0b]
                    '
                >

                    <h2 className='
                        text-3xl
                        font-black
                        text-white
                        mb-8
                    '>

                        Interview Setup

                    </h2>

                    <div className='space-y-5'>

                        {/* ROLE */}
                        <div className='relative'>

                            <FaUserTie className='absolute top-4 left-4 text-gray-500' />

                            <input
                                type='text'
                                placeholder='Enter role'

                                className='
                                    w-full
                                    pl-12 pr-4 py-3.5
                                    bg-[#111111]
                                    border border-[#1f1f1f]
                                    rounded-2xl
                                    text-white
                                    placeholder:text-gray-500
                                    focus:ring-2
                                    focus:ring-green-500/30
                                    outline-none
                                    transition-all
                                '

                                onChange={(e) => setRole(e.target.value)}

                                value={role}
                            />

                        </div>

                        {/* EXPERIENCE */}
                        <div className='relative'>

                            <FaBriefcase className='absolute top-4 left-4 text-gray-500' />

                            <input
                                type='text'
                                placeholder='Experience (e.g. 2 years)'

                                className='
                                    w-full
                                    pl-12 pr-4 py-3.5
                                    bg-[#111111]
                                    border border-[#1f1f1f]
                                    rounded-2xl
                                    text-white
                                    placeholder:text-gray-500
                                    focus:ring-2
                                    focus:ring-green-500/30
                                    outline-none
                                    transition-all
                                '

                                onChange={(e) => setExperience(e.target.value)}

                                value={experience}
                            />

                        </div>

                        {/* MODE */}
                        <select

                            value={mode}

                            onChange={(e) => setMode(e.target.value)}

                            className='
                                w-full
                                py-3.5 px-4
                                bg-[#111111]
                                border border-[#1f1f1f]
                                rounded-2xl
                                text-white
                                focus:ring-2
                                focus:ring-green-500/30
                                outline-none
                            '
                        >

                            <option value="Technical">
                                Technical Interview
                            </option>

                            <option value="HR">
                                HR Interview
                            </option>

                        </select>

                        {/* UPLOAD */}
                        {!analysisDone && (

                            <motion.div

                                whileHover={{ scale: 1.01 }}

                                onClick={() => document.getElementById("resumeUpload").click()}

                                className='
                                    border-2 border-dashed
                                    border-[#262626]
                                    bg-[#111111]
                                    rounded-2xl
                                    p-8
                                    text-center
                                    cursor-pointer
                                    hover:border-green-500/30
                                    transition-all duration-300
                                '
                            >

                                <FaFileUpload className='text-4xl mx-auto text-green-400 mb-4' />

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'

                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-gray-400 text-sm'>

                                    {
                                        resumeFile
                                            ? resumeFile.name
                                            : "Click to upload resume (Optional)"
                                    }

                                </p>

                                {resumeFile && (

                                    <motion.button

                                        whileHover={{ scale: 1.02 }}

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleUploadResume()
                                        }}

                                        className='
                                            mt-5
                                            bg-gradient-to-r
                                            from-green-300
                                            to-emerald-500
                                            text-black
                                            px-5 py-2.5
                                            rounded-xl
                                            font-semibold
                                            shadow-[0_0_30px_rgba(34,197,94,0.18)]
                                        '
                                    >

                                        {
                                            analyzing
                                                ? "Analyzing..."
                                                : "Analyze Resume"
                                        }

                                    </motion.button>

                                )}

                            </motion.div>

                        )}

                        {/* ANALYSIS */}
                        {analysisDone && (

                            <motion.div

                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}

                                className='
                                    bg-[#111111]
                                    border border-[#1f1f1f]
                                    rounded-2xl
                                    p-5
                                    space-y-4
                                '
                            >

                                <h3 className='text-lg font-semibold text-white'>
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (

                                    <div>

                                        <p className='font-medium text-gray-300 mb-2'>
                                            Projects:
                                        </p>

                                        <ul className='list-disc list-inside text-gray-400 space-y-1 text-sm'>
                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>

                                    </div>

                                )}

                                {skills.length > 0 && (

                                    <div>

                                        <p className='font-medium text-gray-300 mb-2'>
                                            Skills:
                                        </p>

                                        <div className='flex flex-wrap gap-2'>

                                            {skills.map((s, i) => (

                                                <span

                                                    key={i}

                                                    className='
                                                        bg-green-500/10
                                                        text-green-400
                                                        border border-green-500/20
                                                        px-3 py-1
                                                        rounded-full
                                                        text-xs
                                                    '
                                                >

                                                    {s}

                                                </span>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </motion.div>

                        )}

                        {/* BUTTON */}
                        <motion.button

                            onClick={handleStart}

                            disabled={!role || !experience || loading}

                            whileHover={{ scale: 1.02 }}

                            whileTap={{ scale: 0.96 }}

                            className='
                                w-full
                                disabled:bg-[#202020]
                                disabled:text-gray-500
                                bg-gradient-to-r
                                from-green-300
                                to-emerald-500
                                text-black
                                py-3.5
                                rounded-2xl
                                text-base
                                font-black
                                transition-all duration-300
                                shadow-[0_0_35px_rgba(34,197,94,0.18)]
                            '
                        >

                            {
                                loading
                                    ? "Starting..."
                                    : "Start Interview"
                            }

                        </motion.button>

                    </div>

                </motion.div>

            </div>

        </motion.div>
    )
}

export default Step1SetUp

