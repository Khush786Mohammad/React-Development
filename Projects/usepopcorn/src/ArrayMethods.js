//⭐ Array.from Method

function MyFunc(){
    const argsArr = Array.from(arguments);
    console.log(argsArr);
}

MyFunc("khush Mohammad");

const vals = Array.from("khush");
console.log(vals);


//⭐ with map function

const vals2 = Array.from("Mohammad", (char)=>{
    return char.toUpperCase();
});

console.log(vals2);

const newArray = Array.from({length: 10},);
console.log(newArray);
