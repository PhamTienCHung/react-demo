import React from 'react';
import { useGame } from '../hooks/gamecontext';

export default function Score() {
  const { userScore, comScore } = useGame();
  return (
    <div>
      <div className='user-score'>User Score : {userScore}</div>
      <div className='com-score'>Computer Score : {comScore}</div>
    </div>
  );
}
