import React, { useState } from 'react';
import Home from './components/Home';
import QuizGame from './components/QuizGame';
import Result from './components/Result';
import History from './components/History';
import { generateQuiz } from './services/gemini';
import { useQuizHistory } from './hooks/useQuizHistory';

function App() {
  const [view, setView] = useState('HOME'); // HOME, QUIZ, RESULT, HISTORY
  const [questions, setQuestions] = useState([]);
  const [gameData, setGameData] = useState(null); // { score, total, savedHistory }
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentDifficulty, setCurrentDifficulty] = useState('');

  const { history, addToHistory, clearHistory } = useQuizHistory();

  const startQuiz = async ({ topic, count, difficulty }) => {
    try {
      const qs = await generateQuiz(topic, count, difficulty);
      if (qs && qs.length > 0) {
        setQuestions(qs);
        setCurrentTopic(topic);
        setCurrentDifficulty(difficulty);
        setView('QUIZ');
      }
    } catch (e) {
      throw e; // re-throw to be handled by Home component
    }
  };

  const finishQuiz = (score, quizHistory) => {
    const total = questions.length;
    // Add to history
    addToHistory({
      topic: currentTopic,
      score,
      total,
      difficulty: currentDifficulty,
      details: quizHistory
    });

    setGameData({
      score,
      total,
      history: quizHistory
    });
    setView('RESULT');
  };

  const goHome = () => {
    setView('HOME');
    setQuestions([]);
    setGameData(null);
  };

  const restartQuiz = () => {
    goHome();
  };

  return (
    <div className="p-20 min-h-screen w-full text-white font-sans flex items-center justify-center">

      {view === 'HOME' && (
        <Home
          onStart={startQuiz}
          onNavigateHistory={() => setView('HISTORY')}
        />
      )}

      {view === 'QUIZ' && (
        <QuizGame
          questions={questions}
          onFinish={finishQuiz}
        />
      )}

      {view === 'RESULT' && gameData && (
        <Result
          score={gameData.score}
          total={gameData.total}
          history={gameData.history}
          onRestart={restartQuiz}
          onHome={goHome}
        />
      )}

      {view === 'HISTORY' && (
        <History
          history={history}
          onBack={goHome}
          onClear={clearHistory}
        />
      )}

    </div>
  );
}

export default App;