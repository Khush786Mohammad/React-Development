export default function StartScreen({length}){
    return(
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{length} Question to test your React mastery</h3>
            <button className="btn">Let's Start</button>
        </div>
    );
}