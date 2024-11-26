const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: false,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

/*
const book = getBook(1);

console.log(book);

// i want to know title publicationDate and other thing

const titleName = book.title;
const pubDate = book.publicationDate;
const pagesSize = book.pages;
console.log(titleName,pubDate,pagesSize);

//now using object destructing

const {title,author,reviews,publicationDate,translations,genres} = book;
console.log(title,author);


// array destructing + rest operator(...args)
const [primaryGenre, secondaryGenre, ...otherGenres] = genres; 

console.log(primaryGenre, secondaryGenre, otherGenres);


//object cloning
let a = {
  value: 10,
  type: 'int'
}

console.log(a);

let b = a;
console.log(b);
b.value = 20;
console.log(b)
console.log(a);

let c = Object.assign({},a);
c.value = "Khush";
c.type = 'String';
console.log(c);
console.log(a,b);

//using spread operator

let d = {
  ...c,
  value:'Mohamamd'
};
console.log(c,d);


//using spread operator on data array of objects
// on genre;

const newGenre = [...genres,"Horror"];
console.log(newGenre);

//spread operator on objects;
console.log(book);
const updateBook1 = {
  ...book,
  title: 'The Lord of the Rings-II',
  publicationDate:'1997,01-01'
}

console.log(updateBook1);

// Template literals;

const summary = `${updateBook1.title} is published on ${updateBook1.publicationDate}`;
summary;

console.log(`${author} wrote ${title} and published in the year ${publicationDate.slice(0,4)}`);

// Ternary Operator

console.log(getBook(4).pages > 500 ? "Over 500 pages":"less than 500 pages");

//nullish coalescing operator
let x;
x = x??5;
console.log(x);

console.log(getBook(3).translations.chinease??"No chinease translation avaliable");


getTotalReviewsCount = (book)=>{
    const reviewsCount = book?.reviews?.goodreads?.reviewsCount;
    const libraryCount = book?.reviews?.librarything?.reviewsCount;
    return reviewsCount??0 + libraryCount??0;
}


console.log(getTotalReviewsCount(data[3]));

*/

//Array map Methods

const book = getBooks();

const mul = [1,2,3,4,5].map((el)=>{
  return el*2;
});

console.log(mul);

const title = book.map((name)=>{
  return name.title;
});

console.log(title);

// title and authors

const ess = book.map((b)=>{
  return b.author + " "+ b.title;
})
console.log(ess);

// Array Filter methods

const longBooks = book
.filter((b) => (b.pages > 500))
.filter((b) => (b.hasMovieAdaptation));
console.log(longBooks);

const adventureBooks = book.filter((b)=>
   (b.genres.includes("adventure"))
).map((b)=>(b.title));

console.log(adventureBooks);

// Array reduce methods

const sum = book.reduce((acc,b)=> acc + b.pages, 0);
console.log(sum);

// Array sort methods

const x = [5,10,9,8,1,97];
const y = x.slice();

console.log(y);

x.sort((a,b) => {
  return a-b;
});

console.log(x);

x.sort((a,b) => {
  return b-a;
})
console.log(x);

const sortByPages = book.slice().sort((a,b) => {
  return b.pages - a.pages;
});

console.log(sortByPages);

const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K Rowling"
}

const booksAfterAdd = [...book, newBook];

console.log(booksAfterAdd);

const bookAfterDelete = booksAfterAdd.filter((b) => (b.id != 3));

console.log(bookAfterDelete);