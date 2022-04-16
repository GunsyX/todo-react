import React, { useContext } from 'react';
import GeneralContext from '../context/general';
import Pfp from '../styles/assets/images/pfp.jpg';

const RightContent = () => {

    const generateRandomNumber = () => {
        // 6 digit
        return Math.floor(Math.random() * 900000) + 100000;
    }

    const [id, setId] = React.useState(generateRandomNumber());

    const { userCredit, gameRolls } = useContext(GeneralContext);

    return (
        <div className='demo-main-right'>
            <img src={Pfp} alt='profile-pic' className='d-pfp' />
            <div className="d-profile-info">
                <div className='d-profile-info-text'>
                    User #{id}
                </div>
                <div className='d-profile-info-text-small'>
                    Credit Balance: {userCredit}
                </div>
                <div className='d-profile-info-text-small'>
                    Rolls: {gameRolls}
                </div>
            </div>

        </div>
    )
}

export default RightContent;