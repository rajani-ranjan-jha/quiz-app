import React from 'react';
import { ArrowLeft, Trash2, Calendar, Hash, Trophy } from 'lucide-react';

const History = ({ history, onBack, onClear }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={onBack}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                {history.length > 0 && (
                    <button
                        onClick={onClear}
                        className="p-2 text-red-300/70 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all flex items-center gap-2 text-sm"
                    >
                        <Trash2 size={16} /> Clear History
                    </button>
                )}
            </div>

            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-1">Quiz History</h2>
                <p className="text-blue-200/60">Your past learning journey</p>
            </div>

            {history.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                    <div className="text-white/20 mb-4 flex justify-center"><Calendar size={48} /></div>
                    <p className="text-white/50 text-lg">No history found yet.</p>
                    <p className="text-white/30 text-sm">Play a quiz to see your progress!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {history.map((game) => (
                        <div key={game.id} className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 transition-all flex justify-between items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-bold text-lg truncate">{game.topic}</h3>
                                <div className="flex gap-4 text-sm text-blue-200/60 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(game.date).toLocaleDateString()}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/5 text-xs border border-white/10 uppercase tracking-wide">{game.difficulty}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className={`text-2xl font-bold ${game.score / game.total >= 0.6 ? 'text-green-300' : 'text-red-300'}`}>
                                    {Math.round((game.score / game.total) * 100)}%
                                </div>
                                <div className="text-xs text-white/40">
                                    {game.score} / {game.total} Correct
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
