import { useState } from 'react';
import profilePic from '../Star_Wars_Logo.svg.png'
import './card.css';
export default function Card({ ship, type, speedCb, costCb, passCb, filmCb }) {
    const [isShowSpeed, setIsShowSpeed] = useState(false);
    const [isShowCost, setIsShowCost] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowFilm, setIsShowFilm] = useState(false);
    function compareSpeed() {
        setIsShowSpeed(true);
        speedCb();
    }
    function compareCost() {
        setIsShowCost(true);
        costCb();
    }
    function comparePass() {
        setIsShowPass(true);
        passCb();
    }
    function compareFilm() {
        setIsShowFilm(true);
        filmCb();
    }
    return (
        <div className="cardHolder">
            <div className="header">
                {ship?.name}
            </div>
            <img alt="" src={profilePic} />
            <div className="content">
                <div onClick={compareSpeed}>Max speed: {
                    (type === 'user' && !isShowSpeed) ? <p>?</p> : <p>{ship?.max_atmosphering_speed}</p>
                }</div>
                <div onClick={compareCost}>Credist cost: {
                    (type === 'user' && !isShowCost) ? <p>?</p> : <p>{ship?.cost_in_credits}</p>
                }</div>
                <div onClick={comparePass}>Passengers: {
                    (type === 'user' && !isShowPass) ? <p>?</p> : <p>{ship?.passengers}</p>
                }</div>
                <div onClick={compareFilm}>Film Apperances: {
                    (type === 'user' && !isShowFilm) ? <p>?</p> : <p>{ship?.films?.length}</p>
                }</div>
            </div>
        </div>
    )
}