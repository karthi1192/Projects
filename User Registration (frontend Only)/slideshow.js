/* let i = 0;
let image = [];
let time = 3000;

image[0] = "image1.jpg"
image[1] = "image2.jpg";
image[2] = "image3.jpg";
image[3] = "image4.jpg";

function changeimg() {
    document.slide.src = image[i];
    if (i < image.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout(changeimg, time);
}

window.onload = changeimg; */

let i = 0;
const image = [];
const time = 6000; 

image[0] = "image1.jpg";
image[1] = "image2.jpg";
image[2] = "image3.jpg";
image[3] = "image4.jpg";

function changeimg() {
    const imgElement = document.querySelector('img[name="slide"]');
    imgElement.classList.add('hidden');

   
    setTimeout(() => {
        imgElement.src = image[i];
        imgElement.classList.remove('hidden');
        i = (i + 1) % image.length;
    }, 2000); 
}

window.onload = () => {
    changeimg();
    setInterval(changeimg, time); 
};
