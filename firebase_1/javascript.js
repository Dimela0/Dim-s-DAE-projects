//  IMPORTS
import { auth, storage, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  //  Slideshow Banner
  const bannerImage = document.getElementById("bannerImage");
  const images = [
    "images/background.jpg",
    "images/background_2.jpg",
    "images/background_3.jpg"
  ];
  let currentIndex = 0;

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    bannerImage.style.opacity = 0;

    setTimeout(() => {
      bannerImage.src = images[currentIndex];
      bannerImage.style.opacity = 1;
    }, 500);
  }

  setInterval(showNextImage, 4000); // Change image every 4 seconds

  // Profile Circle Update
  const button = document.getElementById("signupCircle");
  onAuthStateChanged(auth, async (user) => {
    if (user && button) {
      try {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        const url = await getDownloadURL(imageRef);
        button.innerHTML = `<img src="${url}" alt="Profile" />`;
      } catch (err) {
        console.error("Profile image error:", err);
      }

      // Display Firestore Info
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
        // Optional: inject into UI
      }
    } else if (button) {
      button.innerHTML = "Log in";
    }
  });

  // Media Upload
  const mediaInput = document.getElementById("mediaInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const mediaPreview = document.getElementById("mediaPreview");

  if (uploadBtn) {
    uploadBtn.addEventListener("click", async () => {
      const file = mediaInput.files[0];
      if (!file) return alert("Please select a file.");

      const fileType = file.type.startsWith("image/") ? "images" : "videos";
      const filePath = `${fileType}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        const element = document.createElement(fileType === "images" ? "img" : "video");
        element.src = downloadURL;
        if (fileType === "videos") element.controls = true;
        mediaPreview.appendChild(element);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Upload failed.");
      }
    });
  }

  // Logout Support
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logged out successfully");
        window.location.href = "Login.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }
});

// Firestore Update/Delete Functions
export async function updateUserName(userId, newName) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { name: newName });
}

export async function deleteUserData(userId) {
  const userRef = doc(db, "users", userId);
  await deleteDoc(userRef);
}
