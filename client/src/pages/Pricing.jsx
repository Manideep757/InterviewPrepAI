
import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { BsStars, BsLightningChargeFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {

  const navigate = useNavigate()

  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners.",
      features: [
        "100 AI Credits",
        "Basic Reports",
        "Voice Interview",
        "Limited History",
      ],
      default: true,
    },

    {
      id: "basic",
      name: "Starter",
      price: "₹100",
      credits: 150,
      description: "Focused interview practice.",
      features: [
        "150 AI Credits",
        "Detailed Feedback",
        "Analytics",
        "Interview History",
      ],
    },

    {
      id: "pro",
      name: "Pro",
      price: "₹500",
      credits: 650,
      description: "Best for serious preparation.",
      features: [
        "650 AI Credits",
        "Advanced AI Feedback",
        "Skill Analysis",
        "Priority Processing",
      ],
      badge: "BEST VALUE",
    },
  ];

  const handlePayment = async (plan) => {

    try {

      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount: amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      )

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Manideep InterviewPrepAI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {

          const verifypay = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true }
          )

          dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");

          navigate("/")
        },

        theme: {
          color: "#22c55e",
        },

      }

      const rzp = new window.Razorpay(options)

      rzp.open()

      setLoadingPlan(null);

    } catch (error) {

      console.log(error)

      setLoadingPlan(null);
    }
  }

  return (

    <div className='
      min-h-screen
      bg-[#050505]
      overflow-hidden
      relative
      px-4
      py-12
    '>

      {/* GLOW */}
      <div className='absolute top-[-200px] left-[10%] w-[420px] h-[420px] bg-green-500/10 blur-[130px] rounded-full'></div>

      <div className='absolute bottom-[-200px] right-[10%] w-[420px] h-[420px] bg-emerald-500/10 blur-[130px] rounded-full'></div>

      <div className='max-w-6xl mx-auto relative z-10'>

        {/* HEADER */}
        <div className='flex items-start gap-4 mb-12'>

          <button
            onClick={() => navigate("/")}
            className='
              w-12 h-12
              rounded-2xl
              bg-[#111111]
              border border-[#1f1f1f]
              text-white
              flex items-center justify-center
              hover:border-green-500/30
              hover:scale-105
              transition-all
            '
          >

            <FaArrowLeft size={14} />

          </button>

          <div className='w-full text-center'>

            <div className='
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-full
              bg-green-500/10
              border border-green-500/20
              text-green-400
              text-xs
              mb-5
            '>

              <BsStars size={11} />

              PREMIUM ACCESS

            </div>

            <h1 className='
              text-3xl md:text-5xl
              font-black
              text-white
              leading-tight
            '>

              Choose Your

              <span className='block bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent'>
                Premium Plan
              </span>

            </h1>

            <p className='
              text-gray-400
              text-sm md:text-base
              mt-5
              max-w-xl
              mx-auto
              leading-relaxed
            '>

              Unlock AI interview simulations,
              detailed feedback,
              analytics,
              and premium features.

            </p>

          </div>

        </div>

        {/* CARDS */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>

          {plans.map((plan) => {

            const isSelected = selectedPlan === plan.id

            return (

              <motion.div

                key={plan.id}

                whileHover={{
                  y: -5,
                  scale: 1.01
                }}

                transition={{ duration: 0.25 }}

                onClick={() => !plan.default && setSelectedPlan(plan.id)}

                className={`
                  relative
                  rounded-[26px]
                  overflow-hidden
                  border
                  transition-all duration-300

                  ${isSelected
                    ? "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.14)]"
                    : "border-[#1f1f1f]"
                  }

                  bg-[#0b0b0b]
                  p-6
                `}
              >

                {/* GLOW */}
                <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'></div>

                {/* BADGES */}
                {plan.badge && (

                  <div className='
                    absolute top-5 right-5
                    bg-gradient-to-r
                    from-green-300
                    to-emerald-500
                    text-black
                    text-[10px]
                    font-bold
                    px-3 py-1.5
                    rounded-full
                  '>

                    {plan.badge}

                  </div>

                )}

                {plan.default && (

                  <div className='
                    absolute top-5 right-5
                    bg-[#151515]
                    border border-[#232323]
                    text-gray-300
                    text-[10px]
                    px-3 py-1.5
                    rounded-full
                  '>

                    FREE

                  </div>

                )}

                <div className='relative z-10'>

                  {/* TOP */}
                  <div className='mb-6'>

                    <div className='
                      w-14 h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-green-300
                      to-emerald-500
                      text-black
                      flex items-center justify-center
                      mb-5
                      shadow-[0_0_25px_rgba(34,197,94,0.20)]
                    '>

                      <BsLightningChargeFill size={20} />

                    </div>

                    <h3 className='text-2xl font-black text-white'>
                      {plan.name}
                    </h3>

                    <div className='mt-4'>

                      <span className='text-4xl font-black text-white'>
                        {plan.price}
                      </span>

                      <p className='text-green-400 mt-1 text-sm font-semibold'>
                        {plan.credits} Credits
                      </p>

                    </div>

                    <p className='text-gray-400 text-sm mt-4 leading-relaxed'>
                      {plan.description}
                    </p>

                  </div>

                  {/* FEATURES */}
                  <div className='space-y-3 mb-8'>

                    {plan.features.map((feature, i) => (

                      <div
                        key={i}
                        className='flex items-center gap-3'
                      >

                        <div className='
                          w-6 h-6
                          rounded-full
                          bg-green-500/10
                          flex items-center justify-center
                          text-green-400
                        '>

                          <FaCheckCircle size={10} />

                        </div>

                        <span className='text-gray-300 text-sm'>
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* BUTTON */}
                  {!plan.default && (

                    <button

                      disabled={loadingPlan === plan.id}

                      onClick={(e) => {

                        e.stopPropagation();

                        if (!isSelected) {
                          setSelectedPlan(plan.id)
                        } else {
                          handlePayment(plan)
                        }

                      }}

                      className={`
                        w-full
                        py-3.5
                        rounded-2xl
                        text-sm
                        font-bold
                        transition-all duration-300

                        ${isSelected
                          ? "bg-gradient-to-r from-green-300 to-emerald-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.18)] hover:scale-[1.02]"
                          : "bg-[#151515] border border-[#232323] text-white hover:border-green-500/30"
                        }
                      `}
                    >

                      {
                        loadingPlan === plan.id
                          ? "Processing..."
                          : isSelected
                            ? "Proceed to Payment"
                            : "Select Plan"
                      }

                    </button>

                  )}

                </div>

              </motion.div>

            )
          })}

        </div>

      </div>

    </div>
  )
}

export default Pricing

