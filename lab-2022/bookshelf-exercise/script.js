console.log("Hello bookshelf!");

// other data (animation effect)

// airtable data

var Airtable = require("airtable");
console.log(Airtable);

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyWT5PjLBhwUlwmK'}).base('appDZelMJZFvwF5hx');

// base("books").select({}).eachPage(gotPageOfBooks, gotAllBooks);

base("books").select({
  view: "classic"
}).eachPage(gotPageOfBooks, gotAllBooks);


// an empty array to hold our book data
const books = [];

// callback function that receives our data
function gotPageOfBooks(records, fetchNextPage) {
    console.log("gotPageOfBooks()");
    // add the records from this page to our books array
    books.push(...records);
    // request more pages
    fetchNextPage();
  }

// call back function that is called when all pages are loaded
function gotAllBooks(err) {
  console.log("gotAllBooks()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading books");
    console.error(err);
    return;
  }

  // call function to show the books
  showBooks();
}
  
/////////////////////////////////////////////////////////////////////////////////

console.log(books);

// create the book-spines on the shelf
function showBooks() {
  console.log("showBooks()");

  // find the shelf element
  const shelf = document.getElementById("shelf");

  // loop through the books loaded from the Airtable API
  books.forEach((book) => {
    // create the div, set its text and class
    const div = document.createElement("div");
    div.innerText = book.fields.title;
    div.classList.add("book-spine");
    // when the user clicks this book spine, call showBook and send the book data and this spine element
    div.addEventListener("click", () => {
      showBook(book, div);
      // set the background and links to the same random color
      document.querySelector("html").style.backgroundColor= color;
    });
    // put the newly created book spine on the shelf
    shelf.appendChild(div);
  });

  // reset the bookshelf and put the books away
  document.querySelector("#hide-books").addEventListener("click", () => {
    hideBook();
    document.querySelector("html").style.backgroundColor = "#fbfbfb";
  });
}

// show the detail info for a book, and highlight the active book-spine
function showBook(book, div) {
  console.log("showBook()", book);

  // find the book detail element
  const bookDetail = document.getElementById("book-detail");

  // populate the template with the data in the provided book
  bookDetail.getElementsByClassName("title")[0].innerText = book.fields.title; 
  bookDetail.getElementsByClassName("author")[0].innerText = book.fields.author; 
  bookDetail.getElementsByClassName("type")[0].innerText = "status: " + book.fields.type; 
  bookDetail.getElementsByClassName("description")[0].innerText =
    book.fields.description;

  bookDetail.getElementsByClassName("more")[0].href = book.fields.more;
  bookDetail.getElementsByClassName("cover-image")[0].src =
    book.fields.cover_image[0].url;

  // remove the .active class from any book spines that have it...
  const shelf = document.getElementById("shelf");
  const bookSpines = shelf.getElementsByClassName("active");
  for (const bookSpine of bookSpines) {
    bookSpine.classList.remove("active");
  }
  // ...and set it on the one just clicked
  div.classList.add("active");

  // reveal the detail element, we only really need this the first time
  // but its not hurting to do it more than once
  bookDetail.classList.remove("hidden");
}

function hideBook(book, div) {
  // find the book detail element
  const bookDetail = document.getElementById("book-detail");

  // hide the book info
  bookDetail.classList.add("hidden");

  // remove the .active class from any book spines that have it
  const shelf = document.getElementById("shelf");
  const bookSpines = shelf.getElementsByClassName("active");
  for (const bookSpine of bookSpines) {
    bookSpine.classList.remove("active");
  }
}

var typed = new Typed(".auto-type", {
  strings:["favorites", "current reads", "future reads"],
  typespeed: 30, 
  backspeed: 100,
  loop: true
})
