import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { collection, doc, getDocs, setDoc, getFirestore, addDoc, deleteDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"

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
const db = getFirestore(app);
const auth = getAuth(app);

//...........Adding data to firestore..................//

const save_task = document.getElementById('save-task');

save_task.addEventListener('click',async (e) =>{

  var project_name=document.getElementById('admin-project-name').value;
  var team_name=document.getElementById('team-name').value;
  var task=document.getElementById('task').value;
  var startdate=document.getElementById('startdate').value;
  var progress = document.getElementById('progress').value;


  // Add a new document with an auto generated id.

const docRef = await addDoc(collection(db, "Tasks"), {
    AdminProjectName:project_name,
    teamName:team_name,
    task:task,
    progress: progress,
    startdate: startdate



});
console.log(doc.id)
if (doc.id){
  window.location.reload()
}


alert("Task added successfully")
  });

// ................showing add task Form........................ //

const assign_task = document.getElementById("assign-task")

save_task.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-task");
    element.style.display = "none";
    e.preventDefault();
})

assign_task.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-task");
    element.style.display = "block";
    e.preventDefault();
})


window.addEventListener("load", async (e) => {
    var projectsDiv = document.getElementById("head-project-section")
    var adminprojects =``
    const querySnapshot = await getDocs(collection(db, "Projects"));
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        // console.log(doc.id, " => ", doc.data());

         adminprojects += `
        <div ${doc.id} class="project-section">

    <h3 ${doc.id}>${data.ProjectName}</h3>
    <p ${doc.id}>${data.projectDetails}</p>

  </div>`
  
    });
    projectsDiv.innerHTML = adminprojects;
})


//>>>>>>>>>>>>>>>>>>> Assign Task >>>>>>>>>>>>>>>>>//
window.addEventListener("load", async(e)=>{
    var tasksDiv = document.getElementById("admin-task-table")
    var tasks = ``
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log(doc.id, " => ", doc.data());
  
      tasks += `
      <tr  id="${doc.id}">
      
      <td id="project-project-name-${doc.id}" >${data.ProjectName}</td>
      <td id="project-project-owner-${doc.id}" >${data.teamName}</td>
      <td id="project-project-details-${doc.id}" >${data.task}</td>
      <td id="project-project-workings-${doc.id}" >${data.progress}</td>
      <td id="project-project-status-${doc.id}" >${data.startdate}</td>
      <td>
       <span class="operations-center"> 
       <input type="image" src="images/edit.png" value="edit" class="edit" id="edit-task-${doc.id}" onclick="window.editTask('${doc.id}')">
      <input type="image" src="images/delete.png" value="delete" class="delete" 
      id="delete-task-${doc.id}" onclick="window.deleteProject('${doc.id}','${data.ProjectName}')">
      <input type="button" value="Save" class="save" id="save-task-${doc.id}" onclick="window.saveTask('${doc.id}')">
      </span>



        
      </td>
      </tr>
      `
  
    });
    tasksDiv.innerHTML = tasks;
  })
