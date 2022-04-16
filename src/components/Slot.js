import React from 'react';
import fruits from '../misc/fruits';

const Slot = ({ value:val }) => {



    return (
        <>
            {
                val === null?
                <div className='d-game-slot'></div>:

                <div className={fruits[val].className}>
                    <img src={fruits[val].src} alt={fruits[val].alt} />
                </div>
                
            }
        </>
    )
}

export default Slot;