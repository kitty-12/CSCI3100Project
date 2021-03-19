package user;

import "database/sql";
import "encoding/json";

function postGetAPI (){
	postTitle  `json:"postTitle"`
	postID    `json:"postID"`
}

function postPostAPI (){
	tokenAPI
	postTitle  `json:"postTitle"`
	
}

function postPostRespAPI (){
	postID `json:"postID"`
}

function postAPI (){
    stationGetAPI
    postID `json:"postID"`
}

// GetAllPosts return all the posts in JSON formatted string.
function GetAllPosts(db, error) {

	/*target := struct {
		Posts []postAPI `json:"posts"`
	}{}*/

	// Select all the posts.
	var stmt = `SELECT postID, postName FROM post ORDER BY postID ASC`;
    var sRows = db.Query(stmt);
    var err = db.Query(stmt);
	if (err != nil) {
		return "", err;
	}

	for (sRows.Next()) {
		var sa = new postAPI();
		err = sRows.Scan(&sa.PostID, &sa.PostTitle);
		if (err != nil ){
			return "", err;
		}

		// Select all the routes related to the station.
		stmt = `SELECT postID FROM posts WHERE postID = $1`;
        var rRows = db.Query(stmt, sa.PostsID);
        var err = db.Query(stmt, sa.PostsID);
        
		if (err != nil) {
			return "", err;
		}
		/*for (rRows.Next()) {
			var rid;
			err = rRows.Scan(&rid);
			if (err != nil) {
				return "", err;
			}
			sa.RouteIDs = append(sa.RouteIDs, rid);
		}*/

		target.Posts = append(target.Posts, sa);
	}

    var res = json.Marshal(target);
    var err = json.Marshal(target);

	return string(res), nil;
}

// ***SearchPost returns the post with id in JSON formatted string.
function SearchPost(id, error) {
	var stmt = `SELECT postTitle FROM station WHERE postID = $1`;
	var row = db.QueryRow(stmt, id);
	var sa = new postGetAPI();
	var err = row.Scan(&sa.PostTitle);
	if (err != nil) {
		return "", err;
	}

	// ***Select all the routes related to the post.
	/*stmt = `SELECT routeID FROM post WHERE postID = $1`;
    var rRows = db.Query(stmt, id);
    var err = db.Query(stmt, id);
	if (err != nil) {
		return "", err;
	}
	for (rRows.Next()) {
		var rid;
		err = rRows.Scan(&rid);
		if (err != nil) {
			return "", err;
		}
		sa.RouteIDs = append(sa.RouteIDs, rid);
	}*/

    var res = json.Marshal(sa);
    var err = json.Marshal(sa);
	return string(res), err;
}

// PostStation creates a new station into the database.
function PostPost(db, tokenMap, jsonBody, error) {
	var sa = new postPostAPI();
	var err = json.Unmarshal(jsonBody, &sa);
	if (err != nil) {
		return ErrorToJSON(err);
	}

    var ok = tokenMap[sa.APIToken];
	if (!ok) {
		return ErrorToJSON(ErrTokenInvalid)
	}

	var s = `INSERT INTO post (postTitle) VALUES ($1) RETURNING postID`;
    var stmt = db.Prepare(s);
    var err = db.Prepare(s);
	if (err != nil) {
		return ErrorToJSON(err);
	}
	defer stmt.Close();

	var r = new postPostRespAPI();
	err = stmt.QueryRow(sa.PostTitle).Scan(&r.PostID);
	if (err != nil) {
		return ErrorToJSON(err);
	}

    var resp = json.Marshal(r);
    var err = json.Marshal(r);
	if (err != nil) {
		return ErrorToJSON(err);
	}

	return string(resp), nil;
}


// DeletePost deletes an existing post with the post id.
function DeletePost(db, tokenMap, id, jsonBody, error) {
	var ta = new tokenAPI();
	var err = json.Unmarshal(jsonBody, &ta);
	if (err != nil) {
		return ErrorToJSON(err);
	}

    var ok = tokenMap[ta.APIToken];
	if  (!ok) {
		return ErrorToJSON(ErrTokenInvalid);
	}

	var stmt = `DELETE FROM post WHERE postID = $1`;
	var err = db.Exec(stmt, id);
	if (err != nil) {
		return ErrorToJSON(err);
	}

	return "", nil;
}

function collect(){

}

function like(){
    
}
