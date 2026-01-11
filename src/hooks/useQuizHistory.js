import { useState, useEffect } from 'react';

const STORAGE_KEY = 'quiz_app_history';

export const useQuizHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const addToHistory = (gameData) => {
        // gameData: { topic, score, total, date, difficulty }
        const newEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...gameData
        };
        const updated = [newEntry, ...history];
        setHistory(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { history, addToHistory, clearHistory };
};
