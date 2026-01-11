import React, { useEffect } from 'react';
import { Trophy, Home, RotateCcw, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const Result = ({ score, total, history, onRestart, onHome }) => {
    const percentage = Math.round((score / total) * 100);

    useEffect(() => {
        if (percentage > 60) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#60A5FA', '#34D399', '#F87171', '#FBBF24']
            });
        }
    }, [percentage]);

    const getFeedback = () => {
        if (percentage === 100) return "Perfect Score! You're a Genius! 🌟";
        if (percentage >= 80) return "Excellent Work! Almost Perfect! 🚀";
        if (percentage >= 60) return "Good Job! Keep Learning! 📚";
        if (percentage >= 40) return "Not Bad, But You Can Do Better! 💪";
        return "Don't Give Up! Try Again! 🔥";
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 animate-fade-in-up pb-20">

            {/* Score Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-center mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="mb-4 flex justify-center">
                    <div className={`p-4 rounded-full ${percentage >= 60 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} ring-4 ring-white/10`}>
                        <Trophy size={48} />
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-white mb-2">{percentage}%</h2>
                <p className="text-blue-200 text-lg mb-6">You got {score} out of {total} questions correct</p>

                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-8">
                    {getFeedback()}
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onHome}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all flex items-center gap-2"
                    >
                        <Home size={18} /> Home
                    </button>
                    <button
                        onClick={onRestart}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                    >
                        <RotateCcw size={18} /> Review & Restart
                    </button>
                </div>
            </div>

            {/* Review Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 px-2">Review Answers</h3>
                {history.map((item, idx) => (
                    <div key={idx} className={`bg-black/20 rounded-xl p-4 border border-white/5 ${item.isCorrect ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}>
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <p className="text-white font-medium text-lg mb-2">{item.question}</p>

                                <div className="grid gap-2 text-sm">
                                    <div className={`flex items-center gap-2 ${item.isCorrect ? 'text-green-300' : 'text-red-300 line-through opacity-75'}`}>
                                        {item.isCorrect ? <Check size={16} /> : <X size={16} />}
                                        <span className="font-semibold">Your Answer:</span> {item.selected || "Skipped"}
                                    </div>

                                    {!item.isCorrect && (
                                        <div className="flex items-center gap-2 text-green-300">
                                            <Check size={16} />
                                            <span className="font-semibold">Correct Answer:</span> {item.correct}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Result;
