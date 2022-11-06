import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  getRedirectResult, GoogleAuthProvider, signInWithRedirect, signInWithPopup, FacebookAuthProvider,
  GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

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

const btnlogin = document.getElementById('btnlogin');
const position = document.getElementById('Position')
//---------Log in -------------//
const loginFunction = () => {
  console.log("i am ")

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      position.addEventListener('click', function (e) {
        console.log('here')
        alert('select')
        const admin_position = document.getElementById('admin-position').value;
        const team_lead_position = document.getElementById('team-lead-position').value;
        const customer_position = document.getElementById('customer-position').value;

        if (admin_position === 'Admin') {
          window.location.href = './admin.html'
        } else if (team_lead_position === 'Team Lead') {
          window.location.href = './teamLead.html'
        } else {
          window.location.href = './customer.html'
        }
      })

      // window.location.href = "./customer.html";
      // Signed in 
      const user = userCredential.user;
      console.log(user)

      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      })
      alert('user loged in!')

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
btnlogin.addEventListener('click', loginFunction)

//`````````````````````` Google signin`````````````````//
const provider = new GoogleAuthProvider(app);
const googleLogin = document.getElementById('googleLogin')

googleLogin.addEventListener('click', (e) => {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {

      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;



      // The signed-in user info.
      const user = result.user;

      // const dt = new Date();
      // update(ref(database, 'users/' + user.uid), {
      //   last_login: dt,
      // })
      alert('user loged in!')
      window.location.href = 'customer.html';
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });


})

// ############################# Facebook Signin ############################## //
// document.getElementById('facebookLogin').addEventListener('click', (e) => {
//   const provider = new FacebookAuthProvider();
//   provider.addScope('user_birthday');
//   auth.languageCode = 'it';
//   signInWithRedirect(auth, provider);

//   getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;

//       const user = result.user;
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);
//       // ...
//     });



// })



// function facebooksignin() {


// }

// const providerfb = new FacebookAuthProvider();
// providerfb.addScope('user_birthday');
// facebookLogin.addEventListener('click', (e) => {


//   signInWithPopup(auth, providerfb)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;
//       window.location.href = 'customer.html'

//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const accessToken = credential.accessToken;

//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);

//       // ...
//     });
// })

 //~~~~~~~~~~~~~~~~~~~~~~~~~ Github login ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
 const providergit = new GithubAuthProvider();
 githubLogin.addEventListener('click', (e) => {

   signInWithPopup(auth, providergit)
     .then((result) => {
       // This gives you a GitHub Access Token. You can use it to access the GitHub API.
       const credential = GithubAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;

       window.location.href = "admin.html"

       // The signed-in user info.
       const user = result.user;
       // ...
     }).catch((error) => {
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       // The email of the user's account used.
       const email = error.customData.email;
       // The AuthCredential type that was used.
       const credential = GithubAuthProvider.credentialFromError(error);
       // ...
     });
   alert('here we go')
 }) 

//................................... Twitter Login .........................//
