const item = [1,2,3,4,5,6,7];

console.log(item);

const newItem = item.map( (it) => it !== 2);
console.log(newItem);
console.log(item);

const age = [10,18,20,24,9,14];

const voters = age.filter((ag) => ag!==18);
console.log(voters);
console.log(item);

const sliceMethod = item.slice();
console.log(sliceMethod);
console.log(item.slice(2,5));

const itemsList = ["socks", "shirt","charger","laptop","antibiotics"];

const slice = itemsList.slice().sort((a,b) => {return a.localeCompare(b)});
console.log(slice);