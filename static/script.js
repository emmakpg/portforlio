//ES6 JS
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // current index of word
    const current = this.wordIndex % this.words.length;

    //Get full text of current word
    const fulltxt = this.words[current];

    //Check if Deleting
    if (this.isDeleting) {
      //Remove a character
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      //Add a character
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    //Insert text into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial TypeSpeed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    //If word is complete
    if (!this.isDeleting && this.txt === fulltxt) {
      typeSpeed = this.wait;
      //set deleting to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      //move to next word
      this.wordIndex++;
      //pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

//Init on DOM Load
document.addEventListener("DOMContentLoaded", init);
//Init function
function init() {
  const txtElement = document.getElementById("role");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}
