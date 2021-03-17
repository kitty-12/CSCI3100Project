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