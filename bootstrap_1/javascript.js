<script>
document.addEventListener("DOMContentLoaded", function () {
    // --- Navigation Links ---
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = this.href;
        });
    });

    // --- Product Box Click Animation ---
    const productSections = document.querySelectorAll(".flex-box");
    productSections.forEach(section => {
        section.addEventListener("click", function () {
            this.style.backgroundColor = "#dfffd6";
            setTimeout(() => this.style.backgroundColor = "", 1000);
        });
    });

    // --- Floating Sign In Circle ---
    const signInBtn = document.createElement("div");
    signInBtn.textContent = "Sign In";
    signInBtn.classList.add("floating-signin");
    signInBtn.style.cursor = "pointer";
    signInBtn.title = "Click to sign in";
    document.body.appendChild(signInBtn);

    // Click shows modal if present
    signInBtn.addEventListener("click", () => {
        const modal = document.getElementById("signupModal");
        const openBtn = document.getElementById("openSignup");
        if (modal && openBtn) {
            openBtn.click(); // triggers modal open
        } else {
            // fallback: open new tab if modal is missing
            window.open("Signup.html", "_blank");
        }
    });

    // --- Add CSS styles dynamically ---
    const style = document.createElement("style");
    style.innerHTML = `
        .floating-signin {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            background-color: #dc3545;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            color: white;
            font-size: 0.8rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.3s, box-shadow 0.3s;
            z-index: 999;
        }

        .floating-signin:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
    `;
    document.head.appendChild(style);

    // --- Banner Image Rotation ---
    const images = [
        "./images/background.jpg",
        "./images/background_2.jpg",
        "./images/background_3.jpg"
    ];
    let currentIndex = 0;

    function changeBannerBackground() {
        const banner = document.querySelector(".banner");
        if (!banner) {
            console.warn("No element with class 'banner' found.");
            return;
        }
        banner.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    changeBannerBackground();
    setInterval(changeBannerBackground, 5000);
});
</script>
