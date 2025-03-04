// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function() {

    // Select all navigation links
    let navLinks = document.querySelectorAll("nav ul li a");

    // Loop through each link and add a click event listener
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default page reload
            alert(`Navigating to: ${this.innerText}`); // Show an alert
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
// Ensure the script runs after the document loads
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Centralize JavaScript Management ---
    console.log("JavaScript loaded successfully!"); // Confirms JS file is connected

    // --- Utilize Descriptive Variable Names & Distinct Data Types ---
    // let visitorName = "Alex"; // String (text)
    // let itemsInCart = 3; // Integer (number)
    
    // console.log(`Welcome, ${visitorName}! You have ${itemsInCart} items in your cart.`);

    // --- Implement Mathematical Operations ---
    let itemPrice = 20; // Price per item
    let totalCost = itemPrice * itemsInCart; // Multiply price by number of items
    
    console.log(`Total cost: $${totalCost}`); // Display total price

    // --- Create Decision Making with 'if-else' ---
    if (totalCost > 50) {
        console.log("You qualify for free shipping!");
    } else {
        console.log("Spend more than $50 to get free shipping.");
    }

    // --- Utilize Logical Operators for Complex Conditions ---
    let isMember = true;
    let hasDiscountCode = false;

    if (isMember || hasDiscountCode) {
        console.log("You get a discount on your purchase!");
    } else {
        console.log("Sign up as a member or use a discount code for savings.");
    }

    // --- Showcase JavaScript Output Techniques ---
    let outputDiv = document.createElement("div");
    outputDiv.innerHTML = `<p>Hello, ${visitorName}! Your total cost is $${totalCost}.</p>`;
    outputDiv.style.color = "green";
    document.body.appendChild(outputDiv); // Display message on the webpage

    // --- Interactive Elements: Click Events on Sections ---
    let sections = document.querySelectorAll(".flex-box");

    sections.forEach(section => {
        section.addEventListener("click", function() {
            this.style.backgroundColor = "#dfffd6"; // Change color on click
            setTimeout(() => {
                this.style.backgroundColor = ""; // Reset after 1 sec
            }, 1000);
        });
    });

    // --- Floating Circle in Top Right ---
    let circle = document.createElement("div");
    circle.classList.add("floating-circle");
    document.body.appendChild(circle);

});

// --- Floating Circle Styling ---
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
