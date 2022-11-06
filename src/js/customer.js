import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { collection, doc, getDocs, setDoc, getFirestore, addDoc, deleteDoc, updateDoc , Timestamp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"

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

const add_new_project = document.getElementById('add-new-project');

add_new_project.addEventListener('click',async (e) =>{

  var project_name=document.getElementById('project-name').value;
  var project_owner=document.getElementById('project-owner').value;
  var project_details=document.getElementById('project-details').value;
  var project_workings=document.getElementById('project-workings').value;
  var project_status = document.getElementById('project-workings').value;


  // Add a new document with an auto generated id.

const docRef = await addDoc(collection(db, "Projects"), {
    ProjectName:project_name,
    owner:project_owner,
    WorkingOn:project_workings,
    projectDetails: project_details,
    status: project_status



});
console.log(doc.id)
if (doc.id){
  window.location.reload()
}


alert("Project added successfully")
  });


  //.............adding data to the customer table...................//
  window.addEventListener("load", async(e)=>{
    var tasksDiv = document.getElementById("customer-project-table")
    var projects = ``
    const querySnapshot = await getDocs(collection(db, "Projects"));
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log(doc.id, " => ", doc.data());
  
      projects += `
      <tr  id="${doc.id}">
      
      <td id="project-project-name-${doc.id}" >${data.ProjectName}</td>
      <td id="project-project-owner-${doc.id}" >${data.owner}</td>
      <td id="project-project-details-${doc.id}" >${data.projectDetails}</td>
      <td id="project-project-workings-${doc.id}" >${data.WorkingOn}</td>
      <td id="project-project-status-${doc.id}" >${data.assignedto}</td>
      <td>
       <span class="operations-center"> 
       <input type="image" src="images/edit.png" value="edit" class="edit" id="edit-task-${doc.id}" onclick="window.editProject('${doc.id}')">
      <input type="image" src="images/delete.png" value="delete" class="delete" 
      id="delete-task-${doc.id}" onclick="window.deleteProject('${doc.id}','${data.ProjectName}')">
      <input type="button" value="Save" class="save" id="save-task-${doc.id}" onclick="window.saveProject('${doc.id}')">
      </span>



        
      </td>
      </tr>
      `
  
    });
    tasksDiv.innerHTML = projects;
  })



const add_project_form = document.getElementById("add-new-project")
const add_project_id = document.getElementById("add-project-id")

add_project_form.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-project-form");
    element.style.display = "none";
    e.preventDefault();
})

add_project_id.addEventListener('click', (e) => {
    console.log('yees')
    var element = document.getElementById("add-project-form");
    element.style.display = "block";
    e.preventDefault();
});

//........delete project............//

const deleteProject = async (doc_id, project_name)=>{
    var result = confirm("Are you sure you want to delete task: " + project_name)
  if (result) {
      await deleteDoc(doc(db, "Projects", doc_id));
      window.location.reload()
  }
  }
  window.deleteProject = deleteProject

  //................ Edit project .................//
  const editProject = (taskId) =>
{
 document.getElementById("edit-task-"+taskId).style.display="none";
 document.getElementById("delete-task-"+taskId).style.display="none";
 document.getElementById("save-task-"+taskId).style.display="block";
	
var  project_name=document.getElementById("project-project-name-"+taskId);
 var project_owner=document.getElementById("project-project-owner-"+taskId);
 var project_details=document.getElementById("project-project-details-"+taskId);
 var project_workings=document.getElementById("project-project-workings-"+taskId);
 var status=document.getElementById("project-project-status-"+taskId);
  project_name.innerHTML="<input type='text' id='updated-project_name-"+taskId+"' value='"+project_name.innerHTML+"'>";
  project_owner.innerHTML="<input type='text' id='updated-project-owner-"+taskId+"' value='"+project_owner.innerHTML+"'>";
  project_details.innerHTML="<input type='text' id='updated-project-details-"+taskId+"' value='"+project_details.innerHTML+"'>";
  project_workings.innerHTML="<input type='text' id='updated-project-workings-"+taskId+"' value='"+project_workings.innerHTML+"'>";
  status.innerHTML="<input type='text' id='updated-project-status-"+taskId+"' value='"+status.innerHTML+"'>";

}
window.editProject = editProject

const saveProject = async(taskId)=>
{
  
  var  ProjectName = document.getElementById("updated-project_name-"+taskId).value;
  var owner = document.getElementById("updated-project-owner-"+taskId).value;
  var projectDetails = document.getElementById("updated-project-details-"+taskId).value;
  var WorkingOn= document.getElementById("updated-project-workings-"+taskId).value;
  var status = document.getElementById("updated-project-status-"+taskId).value;



  const taskRef = doc(db, "Projects", taskId);
  var result = confirm("Are you sure you want to editproject: " + ProjectName)
  if (result) {
await updateDoc(taskRef, {
  ProjectName,
owner,
status,
projectDetails,
WorkingOn
});
window.location.reload()
}
}

window.saveProject = saveProject
