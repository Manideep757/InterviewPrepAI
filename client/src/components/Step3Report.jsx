import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let currentY = 25;

  // ================= TITLE =================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(34, 197, 94);
  doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 5;

  // underline
  doc.setDrawColor(34, 197, 94);
  doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

  currentY += 15;

  // ================= FINAL SCORE BOX =================
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `Final Score: ${finalScore}/10`,
    pageWidth / 2,
    currentY + 12,
    { align: "center" }
  );

  currentY += 30;

  // ================= SKILLS BOX =================
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

  doc.setFontSize(12);

  doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
  doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
  doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

  currentY += 45;

  // ================= ADVICE =================
  let advice = "";

  if (finalScore >= 8) {
    advice =
      "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
  } else if (finalScore >= 5) {
    advice =
      "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
  } else {
    advice =
      "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
  }

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220);
  doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

  doc.setFont("helvetica", "bold");
  doc.text("Professional Advice", margin + 10, currentY + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
  doc.text(splitAdvice, margin + 10, currentY + 20);

  currentY += 50;

  // ================= QUESTION TABLE =================
  autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [["#", "Question", "Score", "Feedback"]],
  body: questionWiseScore.map((q, i) => [
    `${i + 1}`,
    q.question,
    `${q.score}/10`,
    q.feedback,
  ]),
  styles: {
    fontSize: 9,
    cellPadding: 5,
    valign: "top",
  },
  headStyles: {
    fillColor: [34, 197, 94],
    textColor: 255,
    halign: "center",
  },
  columnStyles: {
    0: { cellWidth: 10, halign: "center" }, // index
    1: { cellWidth: 55 }, // question
    2: { cellWidth: 20, halign: "center" }, // score
    3: { cellWidth: "auto" }, // feedback
  },
  alternateRowStyles: {
    fillColor: [249, 250, 251],
  },
});


  doc.save("AI_Interview_Report.pdf");
};


return (
  <div className='
    min-h-screen
    bg-[#050505]
    relative
    overflow-hidden
    px-4 sm:px-6 lg:px-10
    py-8
  '>

    {/* BACKGROUND GLOW */}
    <div className='absolute top-[-200px] left-[5%] w-[420px] h-[420px] bg-green-500/10 blur-[130px] rounded-full'></div>

    <div className='absolute bottom-[-200px] right-[5%] w-[420px] h-[420px] bg-emerald-500/10 blur-[130px] rounded-full'></div>

    <div className='relative z-10'>

      {/* TOP */}
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>

        <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>

          <button
            onClick={() => navigate("/history")}
            className='
              mt-1
              w-12 h-12
              rounded-2xl
              bg-[#111111]
              border border-[#1f1f1f]
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

            <h1 className='
              text-3xl md:text-5xl
              font-black
              text-white
              leading-tight
            '>

              Interview

              <span className='bg-gradient-to-r from-green-300 via-green-400 to-emerald-500 bg-clip-text text-transparent ml-3'>
                Analytics
              </span>

            </h1>

            <p className='text-gray-400 mt-3 text-sm md:text-base'>
              AI-powered performance insights
            </p>

          </div>

        </div>

        <button
          onClick={downloadPDF}

          className='
            bg-gradient-to-r
            from-green-300
            to-emerald-500
            text-black
            px-6 py-3
            rounded-2xl
            shadow-[0_0_30px_rgba(34,197,94,0.18)]
            transition-all duration-300
            font-semibold
            text-sm sm:text-base
            text-nowrap
            hover:scale-[1.02]
          '
        >

          Download PDF

        </button>

      </div>

      {/* MAIN GRID */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

        {/* LEFT */}
        <div className='space-y-6'>

          {/* SCORE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className='
              bg-[#0b0b0b]
              border border-[#1a1a1a]
              rounded-[28px]
              shadow-[0_0_40px_rgba(0,0,0,0.5)]
              p-6 sm:p-8
              text-center
            '
          >

            <h3 className='text-gray-400 mb-6 text-sm sm:text-base'>
              Overall Performance
            </h3>

            <div className='relative w-24 h-24 sm:w-28 sm:h-28 mx-auto'>

              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}

                styles={buildStyles({
                  textSize: "16px",
                  pathColor: "#22c55e",
                  textColor: "#ffffff",
                  trailColor: "#1f1f1f",
                })}
              />

            </div>

            <p className='text-gray-500 mt-3 text-xs sm:text-sm'>
              Out of 10
            </p>

            <div className='mt-5'>

              <p className='font-semibold text-white text-sm sm:text-base'>
                {performanceText}
              </p>

              <p className='text-gray-400 text-xs sm:text-sm mt-2'>
                {shortTagline}
              </p>

            </div>

          </motion.div>

          {/* SKILLS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className='
              bg-[#0b0b0b]
              border border-[#1a1a1a]
              rounded-[28px]
              shadow-[0_0_40px_rgba(0,0,0,0.5)]
              p-6 sm:p-8
            '
          >

            <h3 className='text-base sm:text-lg font-semibold text-white mb-6'>
              Skill Evaluation
            </h3>

            <div className='space-y-5'>

              {
                skills.map((s, i) => (

                  <div key={i}>

                    <div className='flex justify-between mb-2 text-sm sm:text-base'>

                      <span className='text-gray-300'>
                        {s.label}
                      </span>

                      <span className='font-semibold text-green-400'>
                        {s.value}
                      </span>

                    </div>

                    <div className='bg-[#1a1a1a] h-2.5 rounded-full overflow-hidden'>

                      <div
                        className='bg-gradient-to-r from-green-300 to-emerald-500 h-full rounded-full'
                        style={{ width: `${s.value * 10}%` }}
                      ></div>

                    </div>

                  </div>

                ))
              }

            </div>

          </motion.div>

        </div>

        {/* RIGHT */}
        <div className='lg:col-span-2 space-y-6'>

          {/* CHART */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className='
              bg-[#0b0b0b]
              border border-[#1a1a1a]
              rounded-[28px]
              shadow-[0_0_40px_rgba(0,0,0,0.5)]
              p-5 sm:p-8
            '
          >

            <h3 className='text-base sm:text-lg font-semibold text-white mb-6'>
              Performance Trend
            </h3>

            <div className='h-64 sm:h-72'>

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={questionScoreData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />

                  <XAxis dataKey="name" stroke="#6b7280" />

                  <YAxis domain={[0, 10]} stroke="#6b7280" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111111",
                      border: "1px solid #1f1f1f",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    fill="#14532d"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* BREAKDOWN */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className='
              bg-[#0b0b0b]
              border border-[#1a1a1a]
              rounded-[28px]
              shadow-[0_0_40px_rgba(0,0,0,0.5)]
              p-5 sm:p-8
            '
          >

            <h3 className='text-base sm:text-lg font-semibold text-white mb-6'>
              Question Breakdown
            </h3>

            <div className='space-y-6'>

              {questionWiseScore.map((q, i) => (

                <div
                  key={i}

                  className='
                    bg-[#111111]
                    p-4 sm:p-6
                    rounded-2xl
                    border border-[#1f1f1f]
                  '
                >

                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>

                    <div>

                      <p className='text-xs text-gray-500'>
                        Question {i + 1}
                      </p>

                      <p className='font-semibold text-white text-sm sm:text-base leading-relaxed'>
                        {q.question || "Question not available"}
                      </p>

                    </div>

                    <div className='
                      bg-green-500/10
                      border border-green-500/20
                      text-green-400
                      px-3 py-1
                      rounded-full
                      font-bold
                      text-xs sm:text-sm
                      w-fit
                    '>

                      {q.score ?? 0}/10

                    </div>

                  </div>

                  <div className='
                    bg-[#0d0d0d]
                    border border-[#1f1f1f]
                    p-4
                    rounded-xl
                  '>

                    <p className='text-xs text-green-400 font-semibold mb-2'>
                      AI Feedback
                    </p>

                    <p className='text-sm text-gray-300 leading-relaxed'>

                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </div>

    </div>

  </div>
)


}

export default Step3Report
