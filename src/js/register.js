  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC2Gvq3BGer8d5TgOBiVfVO2hpVX7st96Y",
    authDomain: "project-management-web.firebaseapp.com",
    databaseURL: "https://project-management-web-default-rtdb.firebaseio.com",
    projectId: "project-management-web",
    storageBucket: "project-management-web.appspot.com",
    messagingSenderId: "951092608945",
    appId: "1:951092608945:web:b6bdc970108a843a8c4790",
    measurementId: "G-J8V1K8MJJE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
 
  const auth = getAuth(app);

  const registerbtn = document.getElementById('registerbtn');
const btnlogin = document.getElementById('btnlogin');

const signupFunction =  () => {
  console.log('there we go')
  var firstname = document.getElementById('fname').value;
  var username = document.getElementById('Uname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('passw').value;
  var password2 = document.getElementById('passwr').value;


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        firstname: firstname,

      })
      alert('user created!')
      window.location.href = 'login.html'

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  }
  registerbtn.addEventListener('click', signupFunction)
