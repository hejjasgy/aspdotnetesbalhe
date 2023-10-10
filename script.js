const usersDiv = document.getElementById("users_div");
let addUserMode = false;

window.onload = () => {
   betoltes();
}


function betoltes(){
    usersDiv.innerHTML = "";
    axios.get("https://localhost:7019/users").then(async(response) => {
        const data = await response.data;
        console.log(data)
        data.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
                        <div class="card" style="color:aliceblue; background-color:#131313; border-radius:12px;">
                            <div class="card-body">
                                <h5 contenteditable="true" class="card-title ${user.id}">${user.name}</h5>
                                <p class="card-text">Kor: <font contenteditable="true" class="${user.id}">${user.age}</font></p>
                                <p class="card-text ${user.id}">Regisztráció ideje: ${user.createdTime}</p>
                                <div style="display:flex;">
                                   <span class="material-symbols-outlined" datafld="${user.id}" style="width:49%; padding:0px;" onclick="save(this)"> check </span>
                                   <span class="material-symbols-outlined" datafld="${user.id}" style="width:49%; padding:0px;" onclick="deleteUser(this)"> person_remove </span>                          
                                </div>
                            </div>
                        </div>
                    `;

            usersDiv.appendChild(card);
        });
    }).catch(error => alert(error))
}

function save(element){
    const userID = element.getAttribute("datafld");
    const nev = document.getElementsByClassName(userID)[0];
    const kor = document.getElementsByClassName(userID)[1];

    const user = {
        "name": nev.innerHTML,
        "age": parseInt(kor.innerHTML)
    }

    axios.put("https://localhost:7019/users?id="+userID, user).then(response => {
        betoltes()
    }).catch(error => alert(error))

}

function deleteUser(element){
    const userID = element.getAttribute("datafld");

    axios.delete("https://localhost:7019/users/"+userID).then(response => {
        betoltes()
    }).catch(error => alert(error))
}

function addUser(){
    if(addUserMode) return;
    else{
        addUserMode = true;
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
                        <div class="card" style="color:aliceblue; background-color:#131313; border-radius:12px;">
                            <div class="card-body">
                                <h5 contenteditable="true" class="card-title" id="new_user_name">Ide írhatja a nevét</h5>
                                <p class="card-text">Kor: <font contenteditable="true" id="new_user_age">Kor</font></p>
                                <p class="card-text">Regisztráció ideje: létrehozáskor</p>
                                <div style="display:flex;">
                                   <span class="material-symbols-outlined" style="width:100%; padding:0px;" onclick="addNewUser()"> check </span>
                                </div>
                            </div>
                        </div>
                    `;

        usersDiv.appendChild(card);
    }
}

function addNewUser(){
    const user = {
        "name": document.getElementById("new_user_name").innerHTML,
        "age": parseInt(document.getElementById("new_user_age").innerHTML)
    }

    axios.post("https://localhost:7019/users", user).then(response => {
        betoltes()
    }).catch(error => alert(error))
}