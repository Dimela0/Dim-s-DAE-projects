// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Select all navigation links
    let navLinks = document.querySelectorAll("nav ul li a");

    // Loop through each link and add a click event listener
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default page reload
            window.location.href = this.href; // Redirect to the link
        });
    });

    // Select all product sections
    let sections = document.querySelectorAll(".flex-box");

    // Add event listeners for each section
    sections.forEach(section => {
        section.addEventListener("click", function() {
            // Change background color when clicked
            this.style.backgroundColor = "#dfffd6"; // Light green background
            setTimeout(() => {
                this.style.backgroundColor = ""; // Reset color after 1 second
            }, 1000);
        });
    });

    // Create a floating circle in the top right
    let circle = document.createElement("div");
    circle.classList.add("floating-circle");
    document.body.appendChild(circle);
});

// CSS for floating circle (added via JavaScript)
let style = document.createElement("style");
style.innerHTML = `
    .floating-circle {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        background-color: red;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

// Background image rotation for banner
const images = [
    "./images/background.jpg",
    "./images/background_2.jpg",
    "./images/background_3.jpg"
];

let currentIndex = 0;

function changeBannerBackground() {
    let banner = document.querySelector(".banner");
    if (!banner) {
        console.error("Error: No element with class 'banner' found!");
        return;
    }
    banner.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
}

// Change the banner background every 5 seconds
setInterval(changeBannerBackground, 5000);
changeBannerBackground();
