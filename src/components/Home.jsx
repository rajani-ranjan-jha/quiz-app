import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, History, Settings, Play, Loader2 } from 'lucide-react';
import { setApiKey } from '../services/gemini';

const Home = ({ onStart, onNavigateHistory }) => {
    const [topic, setTopic] = useState('');
    const [count, setCount] = useState(5);
    const [difficulty, setDifficulty] = useState('Medium');
    const [isGenerating, setIsGenerating] = useState(false);
    const [key, setKey] = useState(localStorage.getItem("GEMINI_API_KEY") || "");
    const [showSettings, setShowSettings] = useState(!localStorage.getItem("GEMINI_API_KEY") && !import.meta.env.VITE_GEMINI_API_KEY);

    const handleStart = async () => {
        if (!topic.trim()) return;
        setIsGenerating(true);
        try {
            await onStart({ topic, count, difficulty });
        } catch (error) {
            alert(error.message);
            setIsGenerating(false);
        }
    };

    const handleSaveKey = () => {
        setApiKey(key);
        setShowSettings(false);
    };

    return (
        <div className="border border-white/20 flex flex-col items-center justify-center w-full mx-auto p-6 rounded-2xl">

            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-down">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 shadow-xl">
                        <Brain size={48} className="text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 ">Quizzzy</h1>
                <p className="text-blue-100/80 text-lg">Generate quizzes on any topic instantly</p>
            </div>

            {/* Main Card */}
            <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fade-in-up">

                {/* Settings Toggle (API Key) */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>
                </div>

                {showSettings && (
                    <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/10">
                        <label className="block text-sm text-blue-200 mb-2">Gemini API Key</label>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                placeholder="Enter your API Key"
                                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-all"
                            />
                            <button
                                onClick={handleSaveKey}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Save
                            </button>
                        </div>
                        <p className="text-xs text-white/40 mt-2">
                            Get your free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline hover:text-blue-300">Google AI Studio</a>
                        </p>
                    </div>
                )}

                <div className="space-y-6">

                    {/* Topic Input */}
                    <div>
                        <label className="block text-sm font-medium text-blue-100 mb-2 uppercase tracking-wider">Topic</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Quantum Physics, 90s Pop Music..."
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white text-lg placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                            />
                            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 opacity-50" size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Question Count */}
                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2 uppercase tracking-wider">Questions</label>
                            <select
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                            >
                                <option value="5" className="bg-slate-800">5 Questions</option>
                                <option value="10" className="bg-slate-800">10 Questions</option>
                                <option value="15" className="bg-slate-800">15 Questions</option>
                                <option value="20" className="bg-slate-800">20 Questions</option>
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="block text-sm font-medium text-blue-100 mb-2 uppercase tracking-wider">Difficulty</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                            >
                                <option value="Easy" className="bg-slate-800">Easy</option>
                                <option value="Medium" className="bg-slate-800">Medium</option>
                                <option value="Hard" className="bg-slate-800">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            onClick={handleStart}
                            disabled={isGenerating || !topic.trim()}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="animate-spin" /> Generating. Please Wait...
                                </>
                            ) : (
                                <>
                                    Generate Quiz <Play size={20} fill="currentColor" />
                                </>
                            )}
                        </button>

                        <button
                            onClick={onNavigateHistory}
                            className="w-full bg-white/5 hover:bg-white/10 text-blue-100 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <History size={18} /> View History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
