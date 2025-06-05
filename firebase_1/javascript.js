// 🔁 IMPORTS
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
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  // 🔄 Slideshow Banner
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

  setInterval(showNextImage, 4000);

  // 👤 Profile Circle Update
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

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
      }
    } else if (button) {
      button.innerHTML = "Log in";
    }
  });

  // ⬆️ Media Upload
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

  // 🚪 Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logged out successfully");
        window.location.href = "login.html";
      } catch (err) {
        console.error("Logout error:", err);
      }
    });
  }

  // 🧠 CRUD Logic
  const createBtn = document.getElementById("createBtn");
  const readBtn = document.getElementById("readBtn");
  const updateBtn = document.getElementById("updateBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const output = document.getElementById("crud-output");

  function getFormValues() {
    const id = document.getElementById("crud-user-id").value.trim();
    const name = document.getElementById("crud-name").value.trim();
    const age = parseInt(document.getElementById("crud-age").value.trim());
    return { id, name, age };
  }

  if (createBtn) {
    createBtn.addEventListener("click", async () => {
      const { id, name, age } = getFormValues();
      if (!id || !name || isNaN(age)) return alert("All fields required.");
      try {
        await setDoc(doc(db, "users", id), { name, age });
        output.textContent = `✅ Created user "${id}"`;
      } catch (err) {
        output.textContent = `❌ Error creating: ${err.message}`;
      }
    });
  }

  if (readBtn) {
    readBtn.addEventListener("click", async () => {
      const { id } = getFormValues();
      if (!id) return alert("Enter user ID to read.");
      try {
        const docSnap = await getDoc(doc(db, "users", id));
        if (docSnap.exists()) {
          const data = docSnap.data();
          output.textContent = `📄 Name: ${data.name}, Age: ${data.age}`;
        } else {
          output.textContent = "❌ No such user.";
        }
      } catch (err) {
        output.textContent = `❌ Error reading: ${err.message}`;
      }
    });
  }

  if (updateBtn) {
    updateBtn.addEventListener("click", async () => {
      const { id, name, age } = getFormValues();
      if (!id || !name || isNaN(age)) return alert("All fields required.");
      try {
        await updateDoc(doc(db, "users", id), { name, age });
        output.textContent = `🔄 Updated user "${id}"`;
      } catch (err) {
        output.textContent = `❌ Error updating: ${err.message}`;
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      const { id } = getFormValues();
      if (!id) return alert("Enter user ID to delete.");
      try {
        await deleteDoc(doc(db, "users", id));
        output.textContent = `🗑️ Deleted user "${id}"`;
      } catch (err) {
        output.textContent = `❌ Error deleting: ${err.message}`;
      }
    });
  }
});
