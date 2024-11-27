import './style.css';

function App(){
    return(
        <div className="container">
            <Image />
            <Heading />
            <Description />
            <SkillsContainer />
        </div>
    );
}

function Image(){
    return(
        <img src="./berserk.jpg" alt="berserk" style={{width:"400px"}}></img>
    );
}

function Heading(){
    return(
        <h1>Khush Mohammad</h1>
    );
}

function Description(){
    return(
        <p>Front-End web developer and B.Tech graduate student in Computer Science and Engineering. 
           When not coding and building anything I like to watch youtube, earlier I like to play football and 
           pc games and also love to spend evening time with a chai and bicuit
        </p>
    );
}

function SkillsContainer(){
    return(
        <div>
            <Skills
                value="HTML+CSS 💪"
                color="blue"
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
        <span style={style}>{props.value}</span>
    );
}

export default App;