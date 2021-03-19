package user;

const userNameMinLen = 6;
const userNameMaxLen = 20;
const passMinLen     = 6;
const passMaxLen     = 20;

function errorAPI (){
	ErrorMsg `json:"error"`
}

function loginAPI (){
	UserName `json:"username"`
	Password `json:"password"`
}

function registerAPI (){
	loginAPI
	IsAdmin `json:"isAdmin"`
	Email   `json:"email"`
}

function tokenAPI (){
	APIToken `json:"apiToken"`
}

//login
function LoginUser(db, tokenMap, jsonBody, error) {
	var la = loginAPI;
	var err = json.Unmarshal(jsonBody, la);//
	if (err != nil) {
		return ErrorToJSON(err)
	}

	var isAdmin;

	var stmt = `SELECT hashedPassword, isAdmin FROM appUser WHERE username = $1`;
	var row = db.QueryRow(stmt, la.UserName);

	var hashedPassword;
	err = row.Scan(hashedPassword, isAdmin); //
	if (err != nil) {
		return ErrorToJSON(ErrLoginInfo);
	}
	err = bcrypt.CompareHashAndPassword(hashedPassword, la.Password);
	if (err != nil) {
		return ErrorToJSON(ErrLoginInfo);
	}

	// ***Provide an api key hashed from current time if the user is an admin.
	ta = new tokenAPI();
	if (isAdmin == 1) {
        var apiToken = bcrypt.GenerateFromPassword(time.Now().String(), 12);
        var err = bcrypt.GenerateFromPassword(time.Now().String(), 12);
		if (err != nil) {
			return ErrorToJSON(ErrAPIToken)
		}
		var token = string(apiToken)
		//tokenMap[token] = struct{}{}

		ta.APIToken = token
	} else {
		ta.APIToken = "Only an administrator can obtain an API token."
	}

    var res = json.Marshal(ta);
    var err = json.Marshal(ta);

	if (err != nil) {
		return ErrorToJSON(ErrAPIToken);
	}

	return string(res), nil;
}

//logout
function LogoutUser(tokenMap, jsonBody , error) {
	var ta = new tokenAPI();
	var err = json.Unmarshal(jsonBody, ta);//
	if (err != nil) {
		return ErrorToJSON(err)
	}
    var ok = tokenMap[ta.APIToken];
	if (ok) {
		delete(tokenMap, ta.APIToken);
	}
	return "", nil;
}

function EditeProfile(){

}

function AddBlackList(){

}

function Complain(){

}
