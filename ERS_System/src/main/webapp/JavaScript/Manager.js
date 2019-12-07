/**
 * 
 */

window.onload = function(){
	getUserInfo();

}


//Copied over from employee.js not worked on it.
function setTableValues(ticketList){
	let rowcount = 10; // 10 items per row
	html = "";
	 // Loop through array and add table cells
	  for (var i=0; i<ticketList.length; i++) {
		
		  let date = new Date (ticketList[i].submit_date);
		  //Insert row based on parameters.
		  //"<tr id=" + "\"row"+ i +"\">" + "<td>"  + ticketList[i].ticket_Id +
	

		html += "<tr> <td>" + ticketList[i].ticket_Id + "</td>"
	    +"<td> $" + ticketList[i].amount + "</td>"
	    +"<td>" + date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear() + "</td>"
	    +"<td>" + ticketList[i].resolve_date + "</td>"
	    +"<td>" + ticketList[i].description + "</td>"
	    +"<td>" + ticketList[i].receipt + "</td>"
	    +"<td>" + ticketList[i].author + "</td>"
	    +"<td>" + ticketList[i].resolver + "</td>"
	    +"<td>" + ticketList[i].status_id + "</td>"
	    +"<td>" + ticketList[i].type_id + "</td>"
	    +"</tr>" ;
	    //https://stackoverflow.com/questions/34880415/adding-id-to-html-table-row-in-javascript/34880611
	    document.getElementById("tablebody").innerHTML = html;
	    

	  }
	  addRowHandlers(ticketList);
	  let today = new Date().toISOString().substr(0, 10);
	  document.querySelector("#autoToday").value = today;

}

function getUserInfo(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		console.log(xhttp.status);
		if(xhttp.readyState == 4 && xhttp.status == 200){
			let user = JSON.parse(xhttp.responseText);
			setValues(user); //Call set values function defined below
		}
	}

xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/Manager.do',true); //Sends the set values 'request' to this.
xhttp.send();
}

function setValues(user){
	document.getElementById("username").innerHTML = "User's username is" + user.username; 
	document.getElementById("password").innerHTML = "User's password is" + user.password;
	
}