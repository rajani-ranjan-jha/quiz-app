import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

const QuizGame = ({ questions, onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizHistory, setQuizHistory] = useState([]);

    const currentQuestion = questions[currentIndex];

    const handleOptionClick = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === currentQuestion.correct_answer;
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        // Save step history
        setQuizHistory([
            ...quizHistory,
            {
                question: currentQuestion.question,
                selected: option,
                correct: currentQuestion.correct_answer,
                isCorrect
            }
        ]);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            onFinish(score, quizHistory);
        }
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            {/* Progress Header */}
            <div className="mb-8">
                <div className="flex justify-between text-blue-100 mb-2 text-sm font-medium uppercase tracking-wider">
                    <span>Question {currentIndex + 1} / {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl animate-fade-in-up">

                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full mb-4 border border-blue-400/20">
                    {currentQuestion.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5 ">
                    Q({currentIndex + 1}) : {currentQuestion.question}
                </h2>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, idx) => {
                        let stateClass = "bg-white/5 border-white/10 hover:bg-white/10";

                        if (isAnswered) {
                            if (option === currentQuestion.correct_answer) {
                                stateClass = "bg-green-500/20 border-green-500 text-green-100";
                            } else if (option === selectedOption) {
                                stateClass = "bg-red-500/20 border-red-500 text-red-100";
                            } else {
                                stateClass = "bg-white/5 border-white/5 opacity-50";
                            }
                        } else if (selectedOption === option) {
                            stateClass = "bg-blue-500/20 border-blue-500 text-white";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(option)}
                                disabled={isAnswered}
                                className={`w-full p-4 rounded-xl border text-left text-lg transition-all duration-200 flex justify-between items-center group ${stateClass}`}
                            >
                                <span className="text-white/90">{option}</span>
                                {isAnswered && option === currentQuestion.correct_answer && (
                                    <CheckCircle2 className="text-green-400" size={24} />
                                )}
                                {isAnswered && option === selectedOption && option !== currentQuestion.correct_answer && (
                                    <XCircle className="text-red-400" size={24} />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer / Next Button */}
                <div className="mt-8 flex justify-end min-h-[52px]">
                    {isAnswered && (
                        <button
                            onClick={handleNext}
                            className="bg-white text-indigo-900 hover:bg-blue-50 font-bold py-3 px-8 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center gap-2 animate-bounce-in"
                        >
                            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            <ArrowRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizGame;
