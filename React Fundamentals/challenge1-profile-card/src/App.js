import './style.css';

function App(){
    return(
        <div className="container">
            <Image 
                url="./berserk.jpg"
            />
            <Heading />
            <Description />
            <SkillsContainer />
        </div>
    );
}

function Image(props){
    console.log(props);
    const style = {
        backgroundImage: `url(${props.url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'

    }
    return(
        <div className='image-container' style={style}>

        </div>
    );
}

function Heading(){
    return(
        <h1 className='heading'>Khush Mohammad</h1>
    );
}

function Description(){
    return(
        <p className='desc'>Front-End web developer and B.Tech graduate student in Computer Science and Engineering. 
           When not coding and building anything I like to watch youtube, earlier I like to play football and 
           pc games and also love to spend evening time with a chai and bicuit.
        </p>
    );
}

function SkillsContainer(){
    return(
        <div className='skill-container'>
            <Skills
                value="HTML+CSS 💪"
                color="#338cff"
            />
            <Skills
                value="JavaScript 👍"
                color="yellow"
            />
            <Skills
                value="Web Design 💪"
                color="#90EE90"
            />
            <Skills
                value="Git and GitHub 💪"
                color="red"
            />
            <Skills
                value="React 👶"
                color="aqua"
             />
             <Skills
                value="Tailwind 💪"
                color="red"
             />
        </div>
    );
}

function Skills(props){
    const style={
        backgroundColor:props.color
    }
    console.log(props);
    return(
        <span className='skills' style={style}>{props.value}</span>
    );
}

export default App;