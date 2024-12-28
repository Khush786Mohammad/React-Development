export default function finished({points, maxPoints, highscore, dispatch}){
    const percentage = Math.ceil((points / maxPoints) * 100);
    let emoji;
    if(percentage === 100) emoji="🥇";
    if(percentage >= 80 && percentage <= 99) emoji="🏅";
    if(percentage >= 60 && percentage <= 79) emoji="🥈";
    if(percentage >= 40 && percentage <= 59) emoji="🥉";
    if(percentage >= 30 && percentage <= 39) emoji="👻";
    if(percentage >= 1 && percentage <= 29)  emoji="🛺";
    if(percentage === 0) emoji="💀";


    return(
        <>
            <p className="result">
            {emoji} You Scored<strong> {points}</strong> out of {maxPoints} ({percentage}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={ () => dispatch({type: "reset"}) }>Restart Quiz</button>
        </>
    );
}