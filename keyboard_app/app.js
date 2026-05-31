const galleryImage =
    document.querySelector("#galleryImage");

const modal =
    document.querySelector("#modal");

const openModalBtn =
    document.querySelector("#openModal");

const closeModalBtn =
    document.querySelector("#closeModal");

const commandPalette =
    document.querySelector("#commandPalette");

const commandInput =
    document.querySelector("#commandInput");

const commandList =
    document.querySelectorAll("#commandList li");





const images = [

    "https://placehold.co/600x300?text=Image+1",
    "https://placehold.co/600x300?text=Image+2",
    "https://placehold.co/600x300?text=Image+3",
    "https://placehold.co/600x300?text=Image+4",
    "https://placehold.co/600x300?text=Image+5"

];





let currentIndex = 0;

let slideshow = null;





// OPEN MODAL
openModalBtn.addEventListener("click", () => {

    modal.classList.remove("hidden");

});





// CLOSE MODAL
closeModalBtn.addEventListener("click", () => {

    modal.classList.add("hidden");

});





// KEYBOARD EVENTS
document.addEventListener("keydown", (e) => {





    // RIGHT ARROW
    if(e.key === "ArrowRight"){

        nextImage();

    }





    // LEFT ARROW
    if(e.key === "ArrowLeft"){

        prevImage();

    }





    // NUMBER KEYS
    if(e.key >= 1 && e.key <= 5){

        currentIndex = Number(e.key) - 1;

        updateImage();

    }





    // SPACE = PLAY / PAUSE
    if(e.code === "Space"){

        e.preventDefault();





        if(slideshow){

            clearInterval(slideshow);

            slideshow = null;

        }

        else{

            slideshow = setInterval(() => {

                nextImage();

            }, 2000);

        }

    }





    // ESC CLOSE MODAL
    if(e.key === "Escape"){

        modal.classList.add("hidden");

        commandPalette.classList.add("hidden");

    }





    // CTRL + K
    if(e.ctrlKey && e.key.toLowerCase() === "k"){

        e.preventDefault();

        commandPalette.classList.remove("hidden");

        commandInput.focus();

    }

});





// NEXT IMAGE
function nextImage(){

    currentIndex++;





    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    updateImage();

}





// PREV IMAGE
function prevImage(){

    currentIndex--;





    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    updateImage();

}





// UPDATE IMAGE
function updateImage(){

    galleryImage.src = images[currentIndex];

}





// COMMAND SEARCH
commandInput.addEventListener("input", () => {

    const keyword =
        commandInput.value.toLowerCase();





    commandList.forEach(item => {

        const text =
            item.textContent.toLowerCase();





        if(text.includes(keyword)){

            item.style.display = "block";

        }

        else{

            item.style.display = "none";

        }

    });

});