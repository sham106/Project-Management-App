import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { collection, doc, getDocs, setDoc, getFirestore, addDoc, deleteDoc, updateDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"
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
const db = getFirestore(app);
const auth = getAuth(app);

const add_team = document.getElementById('add-team');
const creat_team_btn = document.getElementById('creat-team-btn')

add_team.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-team-form");
    element.style.display = "block";
    e.preventDefault();
})

creat_team_btn.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-team-form");
    element.style.display = "none";
    e.preventDefault();
})

//...................Add teams to firestore...................//


creat_team_btn.addEventListener('click', async (e) => {

    var team_name = document.getElementById('team-name').value;
    var leader_name = document.getElementById('leader-name').value;
    var member1 = document.getElementById('member1').value;
    var member2 = document.getElementById('member2').value;
    var member3 = document.getElementById('member3').value;
    var member4 = document.getElementById('member4').value;
    var member5 = document.getElementById('member5').value;

    var leader_email = document.getElementById('leader-email').value;
    var member1_email = document.getElementById('member1-email').value;
    var member2_email = document.getElementById('member2-email').value;
    var member3_email = document.getElementById('member3-email').value;
    var member4_email = document.getElementById('member4-email').value;
    var member5_email = document.getElementById('member5-email').value;




    // Add a new document with an auto generated id.

    const docRef = await addDoc(collection(db, "Teams"), {
        team_name: team_name,
        leader_name: leader_name,
        member1: member1,
        member2: member2,
        member3: member3,
        member4: member4,
        member5: member5,

        leader_email: leader_email,
        member1_email: member1_email,
        member2_email: member2_email,
        member3_email: member3_email,
        member4_email: member4_email,
        member5_email: member5_email,

    });
    console.log(doc.id)
    if (doc.id) {
        window.location.reload()
    }


    alert("Team added successfully")
});

// .............Display teams................//
window.addEventListener("load", async (e) => {
    var teamsDiv = document.getElementById("teams-outer")
    var teams = ``
    
    const querySnapshot = await getDocs(collection(db, "Teams"));
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        // console.log(doc.id, " => ", doc.data());

    teams +=  `
    <div ${doc.id} class="teams-box">

    <h3 ${doc.id}>${data.team_name}</h3>
    <hr>
    <h3 ${doc.id}>Members</h3>
    <hr>
    <h4 ${doc.id}>Team Leader: ${data.leader_name}</h4>
    <h4 ${doc.id}>${data.member1}</h4>
    <h4 ${doc.id}>${data.member2}</h4>
    <h4 ${doc.id}>${data.member3}</h4>
    <h4 ${doc.id}>${data.member4}</h4>
    <h4 ${doc.id}>${data.member5}</h4>
   

  </div>
  `

    });
    teamsDiv.innerHTML = teams;
   
})
