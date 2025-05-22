<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Firebase App</title>
  </head>
  <body>
    <script type="module">
      // 1. Import directly from the CDN
      import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
      import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js';
      import { getAuth }      from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
      import { getStorage }   from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

      // 2. Your config (note the correct storageBucket)
      const firebaseConfig = {
        apiKey: "AIzaSyDIDvX9YnYDVjE-0RXVtlpiRwXAP5oJt8g",
        authDomain: "environmental-sustainabi-37bbd.firebaseapp.com",
        projectId: "environmental-sustainabi-37bbd",
        storageBucket: "environmental-sustainabi-37bbd.appspot.com",  // <-- .appspot.com
        messagingSenderId: "720844755527",
        appId: "1:720844755527:web:3c04786dfc4aa46f5b9762",
        measurementId: "G-BF966X7HXR"
      };

      // 3. Initialize
      const app       = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const auth      = getAuth(app);
      const storage   = getStorage(app);

      console.log("✅ Firebase initialized modularly", app);
    </script>
  </body>
</html>
