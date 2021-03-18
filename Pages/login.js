function login() {
    var id = document.getElementById("userID");
    var errMsg = document.getElementById("errorMsg");
    var password = document.getElementById("userPass");

    var isErr = false;
    errMsg.innerHTML="<br>";
    /*
    if(){
        isErr=true;
    }else{
        isErr=false;
    }
    */
    if(isErr==true)
    {
        errMsg.innerHTML = "User ID/ password wrong. Please input again.";
    }else{
        errMsg.innerHTML = "<br>";
    }
}

function switchForm(){
    var container = document.querySelector(".container");
    container.classList.toggle("active");
}

function loginCheck(){

}

function regCheck(){

}

function sendValidation(){
    
}