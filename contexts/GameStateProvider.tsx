import React, { ReactNode, useState, createContext, useContext, SetStateAction, Dispatch } from 'react';

type GameState = "Match Making" | "Starting" | "In Progress" | "Ended";
type GameMode = "Solo" | "Online" | "Private";

interface GameStateContextTypes {
  countdownSeconds: number;
  gameDuration: number;
  gameMode: GameMode | undefined;
  gameStartTime: Date | undefined;
  gameState: GameState | undefined;
  winner: string | undefined;
  setGameMode: Dispatch<SetStateAction<GameMode | undefined>>;
  setGameStartTime: Dispatch<SetStateAction<Date | undefined>>;
  setGameState: Dispatch<SetStateAction<GameState | undefined>>;
  setWinner: Dispatch<SetStateAction<string | undefined>>;
};

const GameStateContext = createContext<GameStateContextTypes>({
  countdownSeconds: 5,
  gameDuration: 60,
  gameMode: "Solo",
  gameStartTime: undefined,
  gameState: 'Starting',
  winner: undefined,
  setGameMode: () => {},
  setGameStartTime: () => {},
  setGameState: () => {},
  setWinner: () => {},
});

interface GameStateProviderProps {
  children: ReactNode;
};

export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const countdownSeconds = 5;
  const gameDuration = 60;
  const [gameMode, setGameMode] = useState<GameMode>();
  const [gameStartTime, setGameStartTime] = useState<Date>();
  const [gameState, setGameState] = useState<GameState>();
  const [winner, setWinner] = useState<string>();

  return (
    <GameStateContext.Provider value={{
      countdownSeconds,
      gameDuration,
      gameMode,
      gameStartTime,
      gameState,
      winner,
      setGameMode,
      setGameStartTime,
      setGameState,
      setWinner,
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);