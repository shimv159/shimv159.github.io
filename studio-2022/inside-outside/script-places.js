console.log("WE ARE NOT GOING ANYWHERE!");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({apiKey: 'keyWT5PjLBhwUlwmK'}).base('appomTPLYKfa4K1mD');

base("chineseamericans").select({maxRecords: 89, view:"setting"}).eachPage(gotImage, gotAllImages);

const chineseamericans = [];

//function that receives our data
function gotImage(records, fetchNextPage){
  console.log("gotImage()");
  //add the records from this image to our books array
  chineseamericans.push(...records);
  //request more pages
  fetchNextPage();
}

//call function
function gotAllImages(err) {
  console.log("gotAllImages()");

  //report an error
  if (err){
    console.log("error loading books");
    console.error(err);
    return;
  }

  //call functions to long and show books
  showImages();
}

function showImages(){
  console.log("showImages()");

  const gridContainer = document.querySelector(".grid-container");

  chineseamericans.forEach((img) => {
    const a = document.createElement("a");
    const div = document.createElement("div");
    const imgTag = document.createElement("img");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");

    a.appendChild(div);
    div.classList.add("item1");
    a.classList.add("item-container");
    // a.href = "gallery-expanded.html";
    
    div.appendChild(imgTag);
    imgTag.classList.add("photo");
    imgTag.src = img.fields.Images[0].url;


    div.appendChild(h3);
    h3.classList.add("year");
    h3.innerText = img.fields.Year;

    div.appendChild(h4);
    h4.classList.add("name");
    h4.innerText = img.fields.Name;

    // showImage(img);
    gridContainer.appendChild(a);
  });
}

// function showImage(img) {
//   console.log("showImages()", img);

//   //find the book detail element
//   const imageDetail = document.querySelector(".item1 ");

//   // //populate template
//   imageDetail.getElementsByClassName("name")[0].innerText = img.fields.Name;
//   imageDetail.getElementsByClassName("year")[0].innerText = img.fields.Year;
//   imageDetail.getElementsByClassName("photo")[0].src = img.fields.Images[0].url;

// }




///////////////
