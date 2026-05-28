import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import {motion} from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { BsArrowRight } from "react-icons/bs"
import { ServerUrl } from "../App"


function Step2Interview({interviewData, onFinish}) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const isRecognitionRunning = useRef(false);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions?.[0]?.timeLimit || 60
  );

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions?.[currentIndex];

  useEffect(()=>{
      const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice = 
        voices.find(v =>
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase(). includes("female")
        );
        if (femaleVoice) {
          setSelectedVoice(femaleVoice);
          setVoiceGender("female");
          return;
      }
      // Try known male voices first
      const maleVoice = voices.find (v =>
            v.name.toLowerCase().includes("david") ||
            v.name.toLowerCase().includes("mark") ||
            v.name.toLowerCase().includes("male")
        );
        if (maleVoice) {
          setSelectedVoice(maleVoice);
          setVoiceGender("male");
          return;
        }
        // Fallback: first voice (assume female)
          setSelectedVoice(voices[0]);
          setVoiceGender("female");
          };
          loadVoices();
          window.speechSynthesis.onvoiceschanged = loadVoices;
  },[])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

  // Speak Function

  const speakText = (text) => {
    return new Promise((resolve) => {
    if (!window.speechSynthesis || !selectedVoice) {
    resolve();
    return;
    }
    window.speechSynthesis.cancel();
      //Add natural pauses after commas and periods
      const humanText = text
      .replace (/,/g, ", ...")
      .replace(/\./g,". ...");
      
     const utterance = new SpeechSynthesisUtterance(humanText);

     utterance.voice = selectedVoice;

     // Human-like pacing
        utterance.rate = 0.92;   // slightly slower than normal
        utterance.pitch = 1.05;  // small warmth
        utterance.volume = 1; 
        
      utterance.onstart = () => {
          setIsAIPlaying(true) ;
          stopMic()
          videoRef. current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          setTimeout(() => {
            startMic();
          }, 400);
        }

        setTimeout(() =>{
          setSubtitle("");
          resolve();
        },300);
        };
        setSubtitle(text);
        window.speechSynthesis.speak(utterance);
      });
  };

  useEffect(() => {

    if (!selectedVoice) return;
  
    const runInterview = async () => {
  
      // INTRO PHASE
      if (isIntroPhase) {
  
        await speakText(
          `Hi ${userName}, it's great to meet you today.
          I hope you're feeling confident and ready today.`
        );
  
        await speakText(
          "I'll ask you a few questions. Just answer naturally and take your time."
        );
  
        // pause after intro
        await new Promise((r) => setTimeout(r, 1500));
  
        setIsIntroPhase(false);
  
        return;
      }
  
      // QUESTION PHASE
      if (currentQuestion) {
  
        await new Promise((r) => setTimeout(r, 800));
  
        if (currentIndex === questions.length - 1) {
          await speakText(
            "This one might be a little more challenging."
          );
        }
  
        await speakText(currentQuestion.question);
      }
    };

    runInterview();
  
    return () => {
      window.speechSynthesis.cancel();
    };
  
  }, [selectedVoice, isIntroPhase, currentIndex]);


  useEffect (()=>{
    if(isIntroPhase)return;
    if(!currentQuestion) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev)=>{
        if(prev <= 1) {
          clearInterval(timer)
          return 0;
    }
    return prev - 1
      })
    }, 1000);
    return ()=> clearInterval (timer)
  }, [isIntroPhase , currentIndex ])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
    setTimeLeft(currentQuestion.timeLimit || 60);
    }
    }, [currentIndex]);


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isRecognitionRunning.current = true;
    };
    
    recognition.onend = () => {
      isRecognitionRunning.current = false;
    };

    recognition.onresult = (event) => {

      let finalTranscript = "";
      let interimTranscript = "";
    
      for (let i = 0; i < event.results.length; i++) {
    
        const transcript = event.results[i][0].transcript;
    
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
    
      setAnswer(finalTranscript + interimTranscript);
    };

    recognitionRef.current = recognition;
  }, []);


  const startMic = () => {

    if (!recognitionRef.current) return;
  
    if (isRecognitionRunning.current) return;
  
    if (isAIPlaying) return;
  
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.log(error);
    }
  };

  const stopMic = () => {

    if (!recognitionRef.current) return;
  
    if (!isRecognitionRunning.current) return;
  
    recognitionRef.current.stop();
  };
  
    const toggleMic = () =>{
      if (isMicOn) {
        stopMic();
      }else{
        startMic ();
      }
      setIsMicOn(!isMicOn);
    };

    const submitAnswer = async () => {
      if (isSubmitting) return;
      stopMic()
      setIsSubmitting(true)

      try {
          const result = await axios.post(ServerUrl + "/api/interview/submit-answer",
           {
          interviewId, 
          questionIndex: currentIndex, 
          answer, 
          timeTaken:
          (currentQuestion?.timeLimit || 60) - timeLeft
      },{withCredentials:true})

        setFeedback(result.data.feedback);
        speakText(result.data.feedback);
        setIsSubmitting(false)

      } catch (error) {
          console.log(error);
          setIsSubmitting(false)

      }
    }

    const handleNext = async ()=>{
        setAnswer ("");
        setFeedback("");
        if(currentIndex + 1 >= questions. length) {
        finishInterview();
        return;
        }
        await speakText ("Alright, let's move to the next question.");
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => {
          if (isMicOn) startMic();
        },500) ;
      }     
      
      const finishInterview = async () => {
        stopMic()
        setIsMicOn(false)
        try {
        const result = await axios.post(ServerUrl +"/api/interview/finish",{
        interviewId} , {withCredentials:true})

        console.log(result.data)
        onFinish(result.data)

        }catch (error) 
        {
           console.log(error)
        }
      }

      useEffect (() => {
        if(isIntroPhase) return; 
        if(!currentQuestion) return;
        if (timeLeft === 0 && !isSubmitting && !feedback) {
          submitAnswer();
        }
      },[timeLeft]);

        useEffect(() =>{
        return () => {
        if (recognitionRef.current) {
        recognitionRef.current.stop(); 
        recognitionRef.current.abort ();
        }
        window.speechSynthesis.cancel();
      };
    },[]);


    return (
      <div
        className='
        min-h-screen
        bg-[#050505]
        relative
        overflow-hidden
        flex items-center justify-center
        p-4 sm:p-6
      '
      >
    
        {/* BACKGROUND GLOW */}
        <div className='absolute top-[-200px] left-[5%] w-[420px] h-[420px] bg-green-500/10 blur-[130px] rounded-full'></div>
    
        <div className='absolute bottom-[-200px] right-[5%] w-[420px] h-[420px] bg-emerald-500/10 blur-[130px] rounded-full'></div>
    
        <div
          className='
          w-full
          max-w-[1700px]
          min-h-[80vh]
          bg-[#0b0b0b]
          border border-[#1a1a1a]
          rounded-[32px]
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
          flex flex-col lg:flex-row
          overflow-hidden
          relative z-10
        '
        >
    
          {/* VIDEO SECTION */}
          <div
            className='
            w-full lg:w-[35%]
            bg-[#0d0d0d]
            flex flex-col items-center
            p-6 space-y-6
            border-r border-[#1a1a1a]
          '
          >
    
            {/* VIDEO */}
            <div
              className='
              w-full
              max-w-md
              rounded-2xl
              overflow-hidden
              border border-[#1f1f1f]
              shadow-[0_0_40px_rgba(34,197,94,0.08)]
            '
            >
    
              <video
                src={videoSource}
                key={videoSource}
                ref={videoRef}
                muted
                playsInline
                preload='auto'
                className='w-full h-auto object-cover'
              />
    
            </div>
    
            {/* SUBTITLE */}
            {subtitle && (
              <div
                className='
                w-full
                max-w-md
                bg-[#111111]
                border border-[#1f1f1f]
                rounded-xl
                p-4
                shadow-sm
              '
              >
    
                <p
                  className='
                  text-gray-200
                  text-sm sm:text-base
                  font-medium
                  text-center
                  leading-relaxed
                '
                >
                  {subtitle}
                </p>
    
              </div>
            )}
    
            {/* TIMER */}
            <div
              className='
              w-full
              max-w-md
              bg-[#111111]
              border border-[#1f1f1f]
              rounded-2xl
              shadow-md
              p-6
              space-y-5
            '
            >
    
              <div className='flex justify-between items-center'>
    
                <span className='text-sm text-gray-400'>
                  Interview Status
                </span>
    
                {isAIPlaying && (
                  <span className='text-sm font-semibold text-green-400'>
                    AI Speaking
                  </span>
                )}
    
              </div>
    
              <div className='h-px bg-[#1f1f1f]'></div>
    
              <div className='flex justify-center'>
    
                <Timer
                  timeLeft={timeLeft}
                  totalTime={currentQuestion?.timeLimit}
                />
    
              </div>
    
              <div className='h-px bg-[#1f1f1f]'></div>
    
              <div className='grid grid-cols-2 gap-6 text-center'>
    
                <div>
    
                  <span className='text-2xl font-bold text-green-400'>
                    {currentIndex + 1}
                  </span>
    
                  <span className='text-xs text-gray-500 block mt-1'>
                    Current Questions
                  </span>
    
                </div>
    
                <div>
    
                  <span className='text-2xl font-bold text-green-400'>
                    {questions.length - currentIndex - 1}
                  </span>
    
                  <span className='text-xs text-gray-500 block mt-1'>
                    Remaining Questions
                  </span>
    
                </div>
    
              </div>
    
            </div>
    
          </div>
    
          {/* RIGHT SECTION */}
          <div
            className='
            flex-1
            flex flex-col
            p-4 sm:p-6 md:p-8
            bg-[#0b0b0b]
            relative
          '
          >
    
            <h2 className='text-xl sm:text-2xl font-bold text-green-400 mb-6'>
              AI Smart Interview
            </h2>
    
            {!isIntroPhase && (
    
              <div
                className='
                relative
                mb-6
                bg-[#111111]
                p-4 sm:p-6
                rounded-2xl
                border border-[#1f1f1f]
                shadow-sm
              '
              >
    
                <p className='text-xs sm:text-sm text-gray-500 mb-2'>
    
                  Question {currentIndex + 1} of {questions.length}
    
                </p>
    
                <div
                  className='
                  text-base sm:text-lg
                  font-semibold
                  text-white
                  leading-relaxed
                '
                >
    
                  {currentQuestion?.question}
    
                </div>
    
              </div>
            )}
    
            {/* TEXTAREA */}
            <textarea
              placeholder='Type your answer here...'
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
    
              className="
              flex-1
              bg-[#111111]
              p-4 sm:p-6
              rounded-2xl
              resize-none
              outline-none
              border border-[#1f1f1f]
              focus:ring-2
              focus:ring-green-500/30
              transition
              text-white
              placeholder:text-gray-500
              "
            />
    
            {/* BUTTONS */}
            {!feedback ? (
    
              <div className='flex items-center gap-4 mt-6'>
    
                {/* MIC */}
                <motion.button
                  onClick={toggleMic}
                  whileTap={{ scale: 0.9 }}
    
                  className='
                  w-12 h-12 sm:w-14 sm:h-14
                  flex items-center justify-center
                  rounded-full
                  bg-[#151515]
                  border border-[#232323]
                  text-white
                  shadow-lg
                '
                >
    
                  {
                    isMicOn
                      ? <FaMicrophone size={20} />
                      : <FaMicrophoneSlash size={20} />
                  }
    
                </motion.button>
    
                {/* SUBMIT */}
                <motion.button
    
                  onClick={submitAnswer}
    
                  disabled={isSubmitting}
    
                  whileTap={{ scale: 0.95 }}
    
                  className='
                  flex-1
                  bg-gradient-to-r
                  from-green-300
                  to-emerald-500
                  text-black
                  py-3 sm:py-4
                  rounded-2xl
                  shadow-[0_0_30px_rgba(34,197,94,0.18)]
                  hover:scale-[1.01]
                  transition
                  font-semibold
                  disabled:bg-[#202020]
                  disabled:text-gray-500
                '
                >
    
                  {
                    isSubmitting
                      ? "Submitting..."
                      : "Submit Answer"
                  }
    
                </motion.button>
    
              </div>
    
            ) : (
    
              <motion.div
    
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
    
                className='
                mt-6
                bg-[#111111]
                border border-[#1f1f1f]
                p-5
                rounded-2xl
                shadow-sm
              '
              >
    
                <p className='text-green-400 font-medium mb-4'>
                  {feedback}
                </p>
    
                <button
    
                  onClick={handleNext}
    
                  className='
                  w-full
                  bg-gradient-to-r
                  from-green-300
                  to-emerald-500
                  text-black
                  py-3
                  rounded-xl
                  shadow-[0_0_30px_rgba(34,197,94,0.18)]
                  hover:scale-[1.01]
                  transition
                  flex items-center justify-center
                  gap-1
                  font-semibold
                '
                >
    
                  Next Question
    
                  <BsArrowRight size={18} />
    
                </button>
    
              </motion.div>
            )}
    
          </div>
    
        </div>
    
      </div>
    )
        
}

export default Step2Interview