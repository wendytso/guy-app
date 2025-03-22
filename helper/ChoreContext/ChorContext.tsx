import React, { createContext, useContext, useState } from 'react';

// Define the shape of the chore object
interface Chore {
    id: string;
    description: string;
    name: string;
    points: number;
    icon: string;
}

// Create a context
interface ChoreContextType {
  chores: Chore[];
  addChore: (newChore: Chore) => void;
}

const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

// Create a context provider component
export const ChoreProvider: React.FC = ({ children }) => {
  const [chores, setChores] = useState<Chore[]>([]);

  // Function to add a chore to the global state
  const addChore = (newChore: Chore) => {
    setChores([...chores, newChore]);
  };

  const contextValue: ChoreContextType = {
    chores,
    addChore,
  };

  return (
    <ChoreContext.Provider value={contextValue}>
      {children}
    </ChoreContext.Provider>
  );
};

// Custom hook to access the context
export const useChore = (): ChoreContextType => {
  const context = useContext(ChoreContext);
  if (context === undefined) {
    throw new Error('useChore must be used within a ChoreProvider');
  }
  return context;
};
