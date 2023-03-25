import './App.css';
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GameProvider } from './gamecontext';
import { Card } from './card/card';

function App() {
  const [userShip, setUserShip] = useState();
  const [compShip, setCompShip] = useState();
  const [show, setShow] = useState(false);
  const [contentResult, setContentResult] = useState();
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [totalRound, setTotalRound] = useState(1);
  const [listShipRaw, setListShipRaw] = useState([]);

  const [reset, setReset] = useState([]);
  const myRef = useRef()

  useEffect(() => {
    async function fetchData() {
      try {
        const res1 = await fetch('https://swapi.dev/api/starships');
        const listShip1 = await res1.json();
        const res2 = await fetch('https://swapi.dev/api/starships/?page=2');
        const listShip2 = await res2.json();
        const listShip = listShip1.results.concat(listShip2.results);
        console.log('listShip', listShip);
        setListShipRaw(listShip);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, [reset])
  useEffect(() => {
    if (listShipRaw) {
      getRandomShip();
    }
  }, [listShipRaw])
  const speedCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1);
      if ((!isNaN(userShip.max_atmosphering_speed) && userShip.max_atmosphering_speed > compShip.max_atmosphering_speed) || isNaN(compShip.max_atmosphering_speed)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (!isNaN(userShip.max_atmosphering_speed) && compShip.max_atmosphering_speed && userShip.max_atmosphering_speed == compShip.max_atmosphering_speed) {
        setShow(true);
        setContentResult('Draw');
      } else {
        setShow(true);
        setContentResult('You lose');
        setCompScore(compScore + 1);
      }

    } else {
      if (userScore > compScore) {
        setContentResult('You finally win');
        setShow(true);
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
        setShow(true);
      } else {
        setContentResult('You finally lose')
        setShow(true);
      }
    }
  }
  const costCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1);
      if ((!isNaN(userShip.cost_in_credits) && userShip.cost_in_credits > compShip.cost_in_credits) || isNaN(compShip.cost_in_credits)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (!isNaN(userShip.cost_in_credits) && compShip.cost_in_credits && userShip.cost_in_credits == compShip.cost_in_credits) {
        setShow(true);
        setContentResult('Draw');
      } else {
        setShow(true);
        setContentResult('You lose');
        setCompScore(compScore + 1);
      }

    } else {
      if (userScore > compScore) {
        setContentResult('You finally win');
        setShow(true);
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
        setShow(true);
      } else {
        setContentResult('You finally lose')
        setShow(true);
      }
    }
  }
  const passCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1);
      if ((!isNaN(userShip.passengers) && userShip.passengers > compShip.passengers) || isNaN(compShip.passengers)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (isNaN(userShip.passengers) && compShip.passengers && userShip.passengers == compShip.passengers) {
        setShow(true);
        setContentResult('Draw');
      } else {
        setShow(true);
        setContentResult('You lose');
        setCompScore(compScore + 1);
      }

    } else {
      if (userScore > compScore) {
        setShow(true);
        setContentResult('You finally win');
      } else if (userScore == compScore) {
        setShow(true);
        setContentResult('You finally draw')
      } else {
        setShow(true);
        setContentResult('You finally lose')
      }
    }
  }
  const filmCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1);
      if (userShip.films.length > compShip.films.length) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (userShip.films.length == compShip.films.length) {
        setShow(true);
        setContentResult('Draw');
      } else {
        setShow(true);
        setContentResult('You lose');
        setCompScore(compScore + 1);
      }

    } else {
      if (userScore > compScore) {
        setContentResult('You finally win');
        setShow(true);
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
        setShow(true);
      } else {
        setContentResult('You finally lose')
        setShow(true);
      }
    }
  }
  const handleClose = () => {
    setShow(false);
    getRandomShip();
    myRef.current.refreshCardState();
  }
  const getRandomShip = () => {
    let newUserShip = listShipRaw.splice(Math.random() * listShipRaw.length, 1);
    let newCompShip = listShipRaw.splice(Math.random() * listShipRaw.length, 1);
    setUserShip(newUserShip[0]);
    setCompShip(newCompShip[0]);
  }
  
  const resetGame = () => {
    setCompScore(0);
    setUserScore(0);
    setTotalRound(1);
    myRef.current.refreshCardState();
    setReset(true);
    setShow(false);
  }

  return (
    <div className="contain">
      <div className="cardLeft">
        <p className="compScore">{compScore}</p>
        <Card ship={compShip} type='comp' ></Card>
      </div>

      <div className="cardRight">
        <Card ship={userShip} type='user' speedCb={speedCb} costCb={costCb} passCb={passCb} filmCb={filmCb} ref={myRef}></Card>
        <p className="userScore">{userScore}</p>
      </div>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>{contentResult}</Modal.Body>
        {(totalRound == 11) ? <Modal.Footer><Button onClick={resetGame}>Reset game</Button></Modal.Footer> : ''}
      </Modal>

    </div>

  );
}

export default App;
