import {useState} from "react";
import './style.css';

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(0);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem curOpen={curOpen} onOpen={setCurOpen} num={i} title={el.title} key={i}>{el.text}</AccordionItem>
      ))}
      <AccordionItem curOpen={curOpen} onOpen={setCurOpen} num={22} key={22} title="React jsx">
        <p>What you have learn this week?🙄</p>
          <ul>
             <li>Lifting Up States</li>
             <li>Controlled Elements</li>
             <li>Children Props</li>
          </ul>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {

  const isOpen = num === curOpen;
  console.log(isOpen);
  function handleToggle(){
    console.log("inside fn")
     onOpen((obj) => obj =  isOpen ? null : num);
     console.log("causing re-render");
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick = {handleToggle}>
      <p className="number">{num < 9 ? `0${num+1}` : num+1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}
