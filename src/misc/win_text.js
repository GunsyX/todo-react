import fruits from './fruits';


const getWinText = (win) => {
    if(win === '0'){
        return 'FANTASTIC ROLL - 40 points awarded';
    }else if(win === '1'){
        return 'BANANAS!!! - 20 points awarded';
    }else if(win === '2'){
        return 'Winning roll - 10 points awarded';
    }else if(win === '3'){
        return 'WOW! - 30 points awarded';
    }
}


export default getWinText;
