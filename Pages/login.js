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

/* check the input format and return a boolean */
function loginCheck(f){
    var iEmail = document.getElementById("iEmail");
    var n = iEmail.search("@");
    window.alert("n=");
    if(n != 1){
        document.getElementById("emailAlert").innerHTML="Please enter a valid email.";
        window.alert("test");
        return false;
    }
    else{
        return true;
    }
}

function regCheck(){
    var flag = true;
    var email = document.getElementById("email");
    var n = email.search("@");
    if( n!=1){
        flag = false;
        document.getElementById("emailAlert").innerHTML="Please enter a valid email.";
    }

    /* check the password length */
    var pw1 = document.getElementById("firstPass");
    if (pw1.length < 6 || pw1.length > 20){
        flag = false;
        document.getElementById("passAlert").innerHTML="Please enter 6-20 characters."
    }

    var pw2 = document.getElementById("confirmPass");
    if(pw1 != pw2){
        document.getElementById("passAlert2").innerHTML="The two password are not same."
    }

    return flag;
}

function sendValidation(){
    
}
