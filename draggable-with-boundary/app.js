let slider = document.querySelector('.slider');
let innerSlider = document.querySelector('.slider-inner');

let pressed = false;
let startX;
let x;

// mousedown -> when the user click but don't release the click
slider.addEventListener('mousedown', (e) => {
    pressed = true;
    startX = e.offsetX - innerSlider.offsetLeft; // to be able to drag in proportion to where we are in the screen
    slider.style.cursor = 'grabbing'; // show the grabbing hand closing
});

// mouseenter -> hover the mouse to show the grabbing hand
slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab';
});

// mouseleave -> when the mouse leaves the area, change back to default cursor
// slider.addEventListener('mouseleave', () => {
//     slider.style.cursor = 'default';
// });

// mouseup -> change back to grab handing open
slider.addEventListener('mouseup', () => {
    slider.style.cursor = 'grab';
});

// mouseup -> not pressed when the mouse is up
window.addEventListener('mouseup', () => {
    pressed = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX;
    innerSlider.style.left = `${x - startX}px`; // now we can drag!

    checkBoundary();
});

function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = '0px';
    } else if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
}
