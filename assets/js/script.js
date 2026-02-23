// function filterGallery(category) {
//     const items = document.querySelectorAll('.gallery-box');
//     const buttons = document.querySelectorAll('.tab-btn');

//     // Update active button state
//     buttons.forEach(btn => {
//         btn.classList.remove('active');
//         if(btn.innerText.toLowerCase().includes(category)) {
//             btn.classList.add('active');
//         }
//     });

//     // Filter Logic
//     items.forEach(item => {
//         if (category === 'all') {
//             item.style.display = 'block';
//         } else if (item.classList.contains(category)) {
//             item.style.display = 'block';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// }

// let currentSlideIndex = 0;
// const slides = document.querySelectorAll('.slide');
// const dots = document.querySelectorAll('.dot');

// function showSlide(index) {
//     if (index >= slides.length) currentSlideIndex = 0;
//     if (index < 0) currentSlideIndex = slides.length - 1;

//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('active'));

//     slides[currentSlideIndex].classList.add('active');
//     dots[currentSlideIndex].classList.add('active');
// }

// function changeSlide(step) {
//     currentSlideIndex += step;
//     showSlide(currentSlideIndex);
// }

// function currentSlide(index) {
//     currentSlideIndex = index;
//     showSlide(currentSlideIndex);
// }

// // Auto Play
// setInterval(() => {
//     changeSlide(1);
// }, 5000);

// Burger Menu Logic
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Banner Slider Logic
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function changeSlide(step) {
    currentSlideIndex += step;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Gallery Filter Logic
function filterGallery(category) {
    const boxes = document.querySelectorAll('.gallery-box');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    boxes.forEach(box => {
        if (category === 'all' || box.classList.contains(category)) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.tab-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove 'active' class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Show/Hide cards based on filter
            eventCards.forEach(card => {
                // If "all" is selected, show everything
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    // Optional: Add a small fade-in effect
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.opacity = '1'; }, 10);
                } 
                // Otherwise, check if the card has the matching class
                else if (card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } 
                else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
    
    // Disable scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    
    // Enable scrolling again
    document.body.style.overflow = 'auto';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

let currentIndex = 0;
const images = [];

// Initialize images array when page loads
document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.photo-grid img');
    photoItems.forEach((img, index) => {
        images.push(img.src);
        // Update the onclick to pass the index
        img.onclick = () => openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = images[currentIndex];
    
    document.body.style.overflow = 'hidden'; // Stop scroll
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scroll
}

function changeImage(direction, event) {
    if (event) event.stopPropagation(); // Prevents lightbox from closing
    
    currentIndex += direction;

    // Loop logic: if at end, go to start. If at start, go to end.
    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    document.getElementById('lightbox-img').src = images[currentIndex];
}

// Support for Keyboard Arrow Keys
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "Escape") closeLightbox();
    }
});
