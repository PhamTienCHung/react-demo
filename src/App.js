import React from 'react';
import Main from './components/Main';
import { GameProvider } from './hooks/gamecontext';

const App = () => {
  return (
    <GameProvider>
      <Main />
    </GameProvider>
  );
};

export default App;
