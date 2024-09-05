import { useState, useEffect } from 'react';

interface StopwatchProps {}

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleStart = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setIsRunning(true);
      setIntervalId(id);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalId as NodeJS.Timeout);
      setIsRunning(false);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    clearInterval(intervalId as NodeJS.Timeout);
    setIntervalId(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl font-bold mb-4">{formatTime(seconds)}</div>
      <div className="flex space-x-4">
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isRunning ? 'disabled:opacity-50' : ''}`}
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${!isRunning ? 'disabled:opacity-50' : ''}`}
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;