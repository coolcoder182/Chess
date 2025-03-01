export const getPeiceColor = (peice) => {
    if (peice === '') {
        return '';  
    }
    return peice.toLowerCase() === peice ? 'b' : 'w';
}