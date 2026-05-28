import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth';

function AuthModel({ onClose }) {

    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <div
            className='
                fixed inset-0 z-[999]
                flex items-center justify-center
                bg-black/70
                backdrop-blur-xl
                px-4
            '
        >

            {/* Glow Background */}
            <div
                className='
                    absolute
                    w-[420px]
                    h-[420px]
                    rounded-full
                    bg-emerald-500/20
                    blur-3xl
                '
            />

            {/* Modal Wrapper */}
            <div className='relative w-full max-w-md'>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='
                                absolute
                                top-6
                                right-3
                                z-50
                                w-10
                                h-10
                                rounded-xl
                                bg-transparent
                                backdrop-blur-xl
                                flex items-center justify-center
                                text-white
                                shadow-lg
                                hover:text-white
                                transition-all duration-300
                            '
                >
                    <FaTimes size={16} />
                </button>

                {/* Auth Component */}
                <Auth isModel={true} />

            </div>
        </div>
    )
}

export default AuthModel