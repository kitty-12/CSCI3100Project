/* check the input format and return a boolean */
function loginCheck(f){
    var iEmail = document.getElementById("iEmail").value;
    var n = iEmail.search("@");
    window.alert(n);
    if(n == -1){
        document.getElementById("emailAlert").innerHTML="Please enter a valid email.";
        window.alert("login fail");
        return false;
    }
    else{
        document.getElementById("emailAlert").innerHTML="";
        window.alert("login success");
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