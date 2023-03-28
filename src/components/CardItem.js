import React from 'react';
import { useGame } from '../hooks/gamecontext';
import bg from '../assets/bg.png';

export default function CardItem({ card, isSecretCard = false }) {
  const { isHidden, play } = useGame();
  return (
    <div className='card'>
      <div className='card-header'>{card.name}</div>
      <div className='card-image'>
        <img src={bg} />
      </div>
      <div className='card-body'>
        {card.categories.map((c) => (
          <a
            className='category-item'
            key={c.label}
            onClick={() => play(c.label)}
          >
            <div className='label'>{c.label}</div>
            <div className='value'>
              {isSecretCard && isHidden ? '?' : c.value}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
