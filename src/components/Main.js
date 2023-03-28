import React, { useEffect } from 'react';
import CardItem from './CardItem';
import Score from './Score';
import Message from './Message';
import Loading from './Loading';
import { useGame } from '../hooks/gamecontext';

export default function Main() {
  const { isLoading, userCard, comCard, fetchData } = useGame();
  
  useEffect(() => {
    console.log('fetch Data');
    fetchData();
  }, []);

  return (
    <div className='main'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Score />
          <div className='cards'>
            {userCard && <CardItem card={userCard} />}
            {comCard && <CardItem card={comCard} isSecretCard={true} />}
          </div>
          <Message />
        </>
      )}
    </div>
  );
}
