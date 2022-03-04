import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setMode(newMode);
    setHistory((prev) => [...prev, newMode]);
  }
  function back() {
    const tempHistory = history;
    tempHistory.pop();
    setHistory(tempHistory);
    if (tempHistory.length === 1) {
      setMode(initial);
    } else {
      setMode(tempHistory[tempHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}
