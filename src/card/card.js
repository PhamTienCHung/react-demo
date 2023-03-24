import { useImperativeHandle, useState, forwardRef } from 'react';
import profilePic from '../Star_Wars_Logo.svg.png'
import './card.css';
export const Card = forwardRef(({ ship, type, speedCb, costCb, passCb, filmCb }, ref) => {
    const [isShowSpeed, setIsShowSpeed] = useState(false);
    const [isShowCost, setIsShowCost] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowFilm, setIsShowFilm] = useState(false);
    const [selectedSpeed, setSelectedSpeed] = useState('');
    const [selectedCost, setSelectedCost] = useState('');
    const [selectedPass, setSelectedPass] = useState('');
    const [selectedFilm, setSelectedFilm] = useState('');
    useImperativeHandle(ref, () => ({
        refreshCardState() {
            setIsShowSpeed(false);
            setIsShowCost(false);
            setIsShowPass(false);
            setIsShowFilm(false);
            setSelectedSpeed('');
            setSelectedCost('');
            setSelectedPass('');
            setSelectedFilm('');
        }
    }))

    function compareSpeed() {
        setIsShowSpeed(true);
        setSelectedSpeed('selected');
        setTimeout(()=>{
            speedCb();
        },1000)
    }
    function compareCost() {
        setIsShowCost(true);
        setSelectedCost('selected');
        setTimeout(()=>{
            costCb();
        },1000)
    }
    function comparePass() {
        setIsShowPass(true);
        setSelectedPass('selected');
        setTimeout(()=>{
            passCb();
        },1000)
    }
    function compareFilm() {
        setIsShowFilm(true);
        setSelectedFilm('selected');
        setTimeout(()=>{
            filmCb();
        },1000)
    }
    return (
        <div className="cardHolder">
            <div className="header">
                {ship?.name}
            </div>
            <img alt="" src={profilePic} />
            <div className="content">
                <div className={selectedSpeed || ''} onClick={compareSpeed}>Max speed: {
                    (type === 'user' && !isShowSpeed) ? <p>?</p> : <p>{ship?.max_atmosphering_speed}</p>
                }</div>
                <div className={selectedCost || ''} onClick={compareCost}>Credist cost: {
                    (type === 'user' && !isShowCost) ? <p>?</p> : <p>{ship?.cost_in_credits}</p>
                }</div>
                <div className={selectedPass || ''} onClick={comparePass}>Passengers: {
                    (type === 'user' && !isShowPass) ? <p>?</p> : <p>{ship?.passengers}</p>
                }</div>
                <div className={selectedFilm || ''} onClick={compareFilm}>Film Apperances: {
                    (type === 'user' && !isShowFilm) ? <p>?</p> : <p>{ship?.films?.length}</p>
                }</div>
            </div>
        </div>
    )
})