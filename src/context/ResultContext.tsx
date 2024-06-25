import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  memo,
} from "react";
import { Result } from "../types/assessmentTypes";
import { Instruction } from "../types/instructionTypes";
import useFetch from "../hooks/useFetch";

interface ResultContextTypes {
  instruction: Instruction | null;
  score: number;
  result: Result | null;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

const ResultContext = createContext<ResultContextTypes | null>(null);

export const useResult = () => {
  return useContext(ResultContext);
};

export const ResultContextProvider: React.FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const { data } = useFetch<Instruction>("/instruction.json");
    const instruction = data;

    const initialScore = () => {
      const storedScore = localStorage.getItem("score");
      return storedScore ? parseInt(storedScore) : 0;
    };

    const initialResult = () => {
      const storedResult = localStorage.getItem("result");
      return storedResult ? JSON.parse(storedResult) : null;
    };

    const [score, setScore] = useState<number>(initialScore);
    const [result, setResult] = useState<Result | null>(initialResult);

    // Update localStorage when score or result changes
    useEffect(() => {
      localStorage.setItem("score", score.toString());
    }, [score]);

    useEffect(() => {
      if (result) {
        localStorage.setItem("result", JSON.stringify(result));
      } else {
        localStorage.removeItem("result");
      }
    }, [result]);

    return (
      <ResultContext.Provider value={{instruction, score, result, setScore, setResult }}>
        {children}
      </ResultContext.Provider>
    );
  }
);
