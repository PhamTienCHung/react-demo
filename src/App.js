import './App.css';
import { useEffect, useState } from 'react'
import Card from './card/card';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [userShip, setUserShip] = useState();
  const [compShip, setCompShip] = useState();
  const [show, setShow] = useState(false);
  const [contentResult, setContentResult] = useState();
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [totalRound, setTotalRound] = useState(0);
  const [listShipRaw, setListShipRaw] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://swapi.dev/api/starships')
        const listShip = await res.json();
        console.log(listShip);
        setListShipRaw(listShip.results);
        getRandomShip();

      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData();
  }, [])
  const speedCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1)
      if ((userShip.max_atmosphering_speed && userShip.max_atmosphering_speed > compShip.max_atmosphering_speed) || isNaN(compShip.max_atmosphering_speed)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (userShip.max_atmosphering_speed && compShip.max_atmosphering_speed && userShip.max_atmosphering_speed == compShip.max_atmosphering_speed) {
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
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
      } else {
        setContentResult('You finally lose')
      }
    }
  }
  const costCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1)
      if ((userShip.cost_in_credits && userShip.cost_in_credits > compShip.cost_in_credits) || isNaN(compShip.cost_in_credits)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (userShip.cost_in_credits && compShip.cost_in_credits && userShip.cost_in_credits == compShip.cost_in_credits) {
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
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
      } else {
        setContentResult('You finally lose')
      }
    }
  }
  const passCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1)
      if ((userShip.passengers && userShip.passengers > compShip.passengers) || isNaN(compShip.passengers)) {
        setShow(true);
        setContentResult('You win');
        setUserScore(userScore + 1);
      } else if (userShip.passengers && compShip.passengers && userShip.passengers == compShip.passengers) {
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
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
      } else {
        setContentResult('You finally lose')
      }
    }
  }
  const filmCb = () => {
    if (totalRound < 10) {
      setTotalRound(totalRound + 1)
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
      } else if (userScore == compScore) {
        setContentResult('You finally draw')
      } else {
        setContentResult('You finally lose')
      }
    }
  }
  const handleClose = () => {
    setShow(false);
    getRandomShip();
  }
  const getRandomShip = () => {
    let newUserShip = listShipRaw.splice(Math.random() * listShipRaw.length, 1);
    let newCompShip = listShipRaw.splice(Math.random() * listShipRaw.length, 1);
    setUserShip(newUserShip);
    setCompShip(newCompShip);
  }
  return (
    <div className="contain">

      <div className="cardLeft">
        <p className="compScore">{compScore}</p>
        <Card ship={compShip} type='comp' ></Card>
      </div>

      <div className="cardRight">
        <Card ship={userShip} type='user' speedCb={speedCb} costCb={costCb} passCb={passCb} filmCb={filmCb}></Card>
        <p className="userScore">{userScore}</p>
      </div>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{contentResult}</Modal.Body>
      </Modal>
    </div>

  );
}

export default App;
