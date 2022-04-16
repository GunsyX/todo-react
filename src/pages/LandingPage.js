import React, { useContext, useEffect, useRef } from 'react';
import Slot from '../components/Slot';
import GeneralContext from '../context/general';
import RightContent from '../components/RightContent';

const footerText = "Added all required functionalities. Made in 7.3 hours. Looking forward to getting hired :)"
const LandingPage = () => {

    const { userCredit, gameCredit, slotValues, rollTheSlots, afterSpin, rollAvailability, setScreenText, screenText, cashOut } = useContext(GeneralContext);

    const getScoreDisplay = (score) => {
        // should be 3 digits with leading zeros
        return score.toString().padStart(3, '0');
    }

    const [slot1, setSlot1] = React.useState(null);
    const [slot2, setSlot2] = React.useState(null);
    const [slot3, setSlot3] = React.useState(null);

    const animateTo = (value, time, setSlot) => {
        const done = {value: false};
        const animateInterval = setInterval(()=>{
            if(done.value) {
                clearInterval(animateInterval);
                setSlot(value);
            } else {
                setSlot(x=>((x+1) % 3));
            }
        }, 100);
        setTimeout(()=>{
            done.value = true;
        }, time);

    }

    const animateResult = (result) => {
        // result = '012';

        const interval3 = 3000
        animateTo(result[0], 1000, setSlot1);
        animateTo(result[1], 2000, setSlot2);
        animateTo(result[2], interval3, setSlot3);
        setTimeout(()=>{
            afterSpin();
        }, interval3);
    }

    useEffect(()=>{
        // animateResult('321');
        if(slotValues[0] !== null) {
            animateResult(slotValues);
        }
    }, [slotValues]);

    const screenTextOffRef = React.useRef(null);
    useEffect(()=>{
        if(screenText){
            clearTimeout(screenTextOffRef.current);
            screenTextOffRef.current = setTimeout(()=>{
                setScreenText('');
            }, 1500)
        }
    }, [screenText]);

    const cashoutButton = useRef(null);
    const onCashOutHover = () => {
        console.log('hover')
        if(Math.random() < 0.5){
            // either X or Y should be 400 + or minus
            // other coord can be -400 to 400
            const chooseX = Math.random() < 0.5 ? 1: 0;
            const direction = Math.random() < 0.5 ? '400px' : '-400px';
            if(chooseX === 1){
                // x: 400px, y: -400 to 400
                cashoutButton.current.style.transform = `translate(${direction}, ${Math.floor(Math.random()*800-400)}px)`;
            }else{
                // y: 400px, x: -400 to 400
                cashoutButton.current.style.transform = `translate(${Math.floor(Math.random()*800-400)}px, ${direction})`;
            }
            // cashoutButton.current.style.transform = 'translate(400px, 200px)';
        }

        if(Math.random() < 0.6){
            cashoutButton.current.disabled = true;
            setTimeout(() => {
                cashoutButton.current.disabled = false;
            }, 4000);
        }
    }
    
    return (
        <div className='demo-main-container'>
            <div className='demo-main-left'>
                Welcome to the slot machine.

                <div className='d-game-container'>
                    <div className='d-game-screen'>
                        <div className='d-game-coin-counter'>
                            {getScoreDisplay(gameCredit || 0)}
                        </div>
                        <div className='d-game-slots-row'>
                            <Slot value={slot1} />
                            <Slot value={slot2} />
                            <Slot value={slot3} />
                        </div>
                        <div className='d-game-display-text'>
                            {screenText}
                        </div>
                    </div>
                    <div className='d-game-button-row'>
                        <button className='d-game-b-cash patch-cashout' ref={cashoutButton} onMouseEnter={onCashOutHover} onClick={cashOut}>Cash out</button>
                        <button className='d-game-b-spin' disabled={!rollAvailability} onClick={rollTheSlots}>Spin!</button>
                    </div>
                </div>

                <div className='d-footer'>
                    {footerText}
                </div>
            </div>
            <RightContent />
        </div>
    )
}


export default LandingPage;