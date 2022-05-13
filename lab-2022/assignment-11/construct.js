// I was drawn into this code because of how the user’s input is a crucial part of the interaction. The premise of the site is simple enough: an empty card constructor with placeholders that will be replaced by the user’s input. I am intrigued by the potential this code has for game customization and functional websites. By dissecting the code, I hope to learn how the placeholders work to accomodate the user’s input. As my JS knowledge is minimal at best, I also want to observe how the original creator have organized their code.

// declares the const form variable 
const form = document.forms["myConstruct"];

// applies an array of changes to a source data array.
ApplyChanges = () => {
    const reader = new FileReader();
    const values = [form["f_class"].value, form["f_title"].value, form["f_score"].value, form["f_url"].value];
    let rarity, title, score, url
    rarity = values[0];
    title = values[1];
    score = values[2];
    url = values[3];

    // insert dynamic content using innherHTML
    Attributes.innerHTML = placeholder.innerHTML;
    
    // builds the card (object)
    const obj = [
        Frame,
        Title,
        Score,
        Attributes.childNodes
    ];
    
    // declares the const classes variable and fills it with array literals
    const classes = [
        ["frame ", "title ", "score "],
        ["common", "uncommon", "rare", "epic", "legendary"]
    ];
    
    for (i=0; i<obj.length-1; i++) {
        obj[i].classList = classes[0][i] + classes[1][rarity];
    }
    
    for(i=0; i<obj[3].length; i++) {
        obj[3][i].classList = classes[1][rarity];
    }
    
    // tells the computer that the background image will change based on the user's input
    reader.readAsDataURL(form["f_url"].files[0]);
    reader.onloadend = () => {
        Card.style.backgroundImage = "url(" + reader.result + ")";
    }
    
    title = title == "" ? "Title" : title;
    obj[1].innerHTML = title;
    
    score = score < 0 || score > 99 || score == "" ? 0 : score;
    obj[2].setAttribute("data-val", score);
}

// adds attributes like icons

AddAttribute = () => {
    let code = form["f_icon"].value.replace(" ", "_").toLowerCase();
    const li = placeholder.childNodes;
    const html = "<li><span class='material-icons'>" +
          code + "</span></li>";
    
    placeholder.innerHTML += html;
    

// if i is 0 or smaller than the list, then attribute is deleted on click

    for (i=0; i<li.length; i++) {
        li[i].addEventListener("click", DeleteAttribute);
    }
    
    form["f_icon"].value = "";
}

DeleteAttribute = (e) => {
    const et = e.target;
    
    et.tagName == "LI" ? placeholder.removeChild(et) : placeholder.removeChild(et.parentElement);
}

// applies changes based on user's input on click
form["f_submit"].addEventListener("click", ApplyChanges);
form["f_add"].addEventListener("click", AddAttribute);