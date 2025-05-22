// ✅ Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDIDvX9YnYDVjE-0RXVtlpiRwXAP5oJt8g",
  authDomain: "environmental-sustainabi-37bbd.firebaseapp.com",
  projectId: "environmental-sustainabi-37bbd",
  storageBucket: "environmental-sustainabi-37bbd.appspot.com",
  messagingSenderId: "720844755527",
  appId: "1:720844755527:web:3c04786dfc4aa46f5b9762",
  measurementId: "G-BF966X7HXR"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

// ✅ Profile Circle Update
auth.onAuthStateChanged(async (user) => {
  const button = document.getElementById("signupCircle");
  if (button && user) {
    try {
      const imageRef = storage.ref(`profileImages/${user.uid}`);
      const imageUrl = await imageRef.getDownloadURL();
      button.innerHTML = `<img src="${imageUrl}" alt="Profile" />`;
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  } else if (button) {
    button.innerHTML = "Log in";
  }
});

// ✅ DOM Interactions
document.addEventListener("DOMContentLoaded", function () {
  // ✅ Slideshow Banner
  const bannerImages = [
    "images/background.jpg",
    "images/background_2.jpg",
    "images/background_3.jpg"
  ];
  let currentIndex = 0;
  const bannerImg = document.getElementById("bannerImage");

  if (bannerImg) {
    bannerImg.style.opacity = 1;
    setInterval(() => {
      bannerImg.style.transition = "opacity 0.5s ease-in-out";
      bannerImg.style.opacity = 0;
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % bannerImages.length;
        bannerImg.src = bannerImages[currentIndex];
        bannerImg.onload = () => {
          bannerImg.style.opacity = 1;
        };
      }, 500);
    }, 3000);
  }

  // ✅ Floating Sign-In Button
  const signInBtn = document.createElement("div");
  signInBtn.textContent = "Sign In";
  signInBtn.className = "floating-signin";
  signInBtn.style.cursor = "pointer";
  signInBtn.title = "Click to sign in";
  document.body.appendChild(signInBtn);

  signInBtn.addEventListener("click", () => {
    window.open("Signup.html", "_blank");
  });

  const style = document.createElement("style");
  style.textContent = `
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
});


// ✅ OPTIONAL: Firestore Update + Delete Examples
async function updateUserName(userId, newName) {
  try {
    await db.collection("users").doc(userId).update({ name: newName });
    alert("User name updated successfully!");
  } catch (error) {
    console.error("Update error:", error);
  }
}

async function deleteUserData(userId) {
  try {
    await db.collection("users").doc(userId).delete();
    alert("User data deleted successfully.");
  } catch (error) {
    console.error("Delete error:", error);
  }
}

// ❗Usage examples (can be triggered by buttons or events)
// updateUserName("userIdHere", "New Name");
// deleteUserData("userIdHere");
