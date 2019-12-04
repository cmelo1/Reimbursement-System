/**
 * 
 */

window.onload = function(){
	getUserInfo();
	
}

function getUserInfo(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readystate == 4 && xhttp.status == 200){
			let user = JSON.parse(xhttp.responsiveText);
			setValues(user); //Call set values function defined below
		}
	}

xhttp.open("GET", 'http://localhost:8080/ERS_System/html/home.do',true); //Sends the set values 'request' to this.
xhttp.send();
}

function setValues(user){
	document.getElementById("username").innerHTML = "User's username is" + user.username; 
	document.getElementById("password").innerHTML = "User's password is" + user.password;
} //this will manipulate the elements on the next page.