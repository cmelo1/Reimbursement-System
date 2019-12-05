/**
 * implement a button.onclick with the submission of ticket, 
 */

window.onload = function(){
	getUserInfo();

}

function getUserInfo(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		console.log(xhttp.status);
		if(xhttp.readyState == 4 && xhttp.status == 200){
			let user = JSON.parse(xhttp.responseText); //The response gets turned into this.
			setValues(user); //Call set values function defined below
		}
	}

	//this goes straight to the request helper.
xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/employee.do',true); //Sends the set values 'request' to this.
xhttp.send();
}

//How to parse an array?
function getTicketInfo(){ //not in use lol
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		console.log(xhttp.status);
		if(xhttp.readyState == 4 && xhttp.status == 200){
			let user = JSON.parse(xhttp.responseText); //The response gets turned into this.
			setValues(user); //Call set values function defined below
		}
	}
}

function setValues(user){
	document.getElementById("username").innerHTML = "User's username is" + user.username; 
	document.getElementById("password").innerHTML = "User's password is" + user.password;
	
	
	
} //this will manipulate the elements on the next page.