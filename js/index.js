let siteNameInput = document.getElementById('site-name');
let siteUrlInput = document.getElementById('site-url');
let searchInput = document.getElementById("searchInput")
let btnSubmit = document.getElementById("btn-submit")
let btnUpdate = document.getElementById("btn-update")
let index = 0;

let sitesList = [];




if (localStorage.getItem("siteContainer") !== null) {
    sitesList = JSON.parse(localStorage.getItem("siteContainer"));
    displayItems();
}


function addSite() {
    if (validateName() == true && validateUrl() == true) {
        let site = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }

        sitesList.push(site)

        displayItems();

        localStorage.setItem("siteContainer", JSON.stringify(sitesList));

        clearItems();
        siteNameInput.classList.remove('is-valid')
        siteUrlInput.classList.remove('is-valid')
    } 
    else {
        document.getElementById('bg-close').classList.remove('d-none')
        document.body.style.overflow = "hidden";
    }



}

function closeModal() {
    document.getElementById('bg-close').classList.add('d-none')
    document.body.style.overflow = "visible";

}

function displayItems() {
    let box = ''
    for (let i = 0; i < sitesList.length; i++) {
        box += `
        <tr>
        <td>${i + 1}</td>
        <td >${sitesList[i].name}</td>
        <td>
<a href="https://${sitesList[i].url}" target="_blank">
<button class="btn btn-visit btn-outline-success" >

<i class="fa-solid fa-eye pe-2 "></i>Visit
</button>
</a>  </td>
<td><button onclick="setFormUpdate(${i})" class="update-btn btn btn-outline-warning "><i class="fa-solid fa-pen "></i>
update</button></td>

        <td><button class="btn btn-delete  btn-outline-danger" onclick="deleteItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button></td>

      </tr>


        `

    }
    document.getElementById('demo').innerHTML = box
}
function clearItems() {
    siteNameInput.value = "";
    siteUrlInput.value = "";

}
function deleteItem(deletedIndex) {
    sitesList.splice(deletedIndex, 1);
    displayItems();
    localStorage.setItem("siteContainer", JSON.stringify(sitesList));

}

function searchItem() {
    
    let term = searchInput.value;
    let box = ''
    for (let i = 0; i < sitesList.length; i++) {
        if (sitesList[i].name.toLowerCase().includes(term.toLowerCase())) { 
            box += `
        <tr>
        <td>${i + 1}</td>
        <td >${sitesList[i].name}</td>
        <td>
<a href="${sitesList[i].url}" target="_blank">
<button class="btn btn-visit btn-outline-success" >

<i class="fa-solid fa-eye pe-2 "></i>Visit
</button>
</a>  </td>
<td><button onclick="setFormUpdate(${i})" class="btn btn-outline-warning "><i class="fa-solid fa-pen "></i>
update</button></td>

        <td><button class="btn btn-delete  btn-outline-danger" onclick="deleteItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button></td>

      </tr>


        `}
       

    }
    document.getElementById('demo').innerHTML = box
}

function setFormUpdate(indexElement){
    
   
    siteNameInput.value = sitesList[indexElement].name;
    siteUrlInput.value = sitesList[indexElement].url;

    btnSubmit.classList.add("d-none")
    btnUpdate.classList.remove("d-none")

    index = indexElement;


}

function updateData(){
    if (validateName() == true && validateUrl() == true) {
        let site = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }
    
        sitesList.splice(index,1,site)
    
        displayItems();
    
        localStorage.setItem("siteContainer", JSON.stringify(sitesList));
    
        clearItems();
        btnSubmit.classList.remove("d-none")
        btnUpdate.classList.add("d-none")
    }
  
}

function validateName() {

    let text = siteNameInput.value;
    let regex = /^\w{3,}(\s+\w+)*$/

    let alertNameElement = document.getElementById('alert-name')

    if (regex.test(text) == true) {

        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        alertNameElement.classList.add("d-none");
        return true;

    } else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-valid");
        alertNameElement.classList.remove("d-none");
        return false;

    }



}
function validateUrl() {

    let website = siteUrlInput.value;
    let regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$/gm

    let alertUrlElement = document.getElementById('alert-url')

    if (regex.test(website) == true) {

        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        alertUrlElement.classList.add("d-none");
        return true;

    } else {
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("is-valid");
        alertUrlElement.classList.remove("d-none");
        return false;

    }



}
