/**
 * implement a button.onclick with the submission of ticket, 
 */

window.onload = function(){
	//getUserInfo();
	getTicketInfo();
}

//function getUserInfo(){
//	let xhttp = new XMLHttpRequest();
//	xhttp.onreadystatechange = function(){
//		console.log(xhttp.readyState);
//		console.log(xhttp.status);
//		if(xhttp.readyState == 4 && xhttp.status == 200){
//			let user = JSON.parse(xhttp.responseText); //The response gets turned into this.
//			setValues(user); //Call set values function defined below
//		}
//	}
//
//	//this goes straight to the request helper.
//xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/employee.do',true); //Sends the set values 'request' to this.
//xhttp.send();
//}




//How to parse an array?
function getTicketInfo(){ 
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			console.log("Inside if statement, HTTP STATE: " + xhttp.readyState + " , STATUS :" + xhttp.status);
			let ticketList = JSON.parse(xhttp.responseText); //The response gets turned into this.
			console.log(ticketList);
			console.log(ticketList.length);
			setTableValues(ticketList); //Call set values function defined below
		}
	}
		//this goes straight to the request helper.
		xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/displayTickets.do',true); //Sends the set values 'request' to this.
		xhttp.send();
	
}
function setTableValues(ticketList){
	let rowcount = 10; // 3 items per row
	html = "<tr>";
	 // Loop through array and add table cells
	  for (var i=0; i<ticketList.length; i++) {
		
		  let date = new Date (ticketList[i].submit_date);
		  //Insert row based on parameters.
	    html += "<td>" + ticketList[i].ticket_Id + "</td>"
	    +"<td>" + ticketList[i].amount + "</td>"
	    +"<td>" + date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear() + "</td>"
	    +"<td>" + ticketList[i].resolve_date + "</td>"
	    +"<td>" + ticketList[i].description + "</td>"
	    +"<td>" + ticketList[i].receipt + "</td>"
	    +"<td>" + ticketList[i].author + "</td>"
	    +"<td>" + ticketList[i].resolver + "</td>"
	    +"<td>" + ticketList[i].status_id + "</td>"
	    +"<td>" + ticketList[i].type_id + "</td>"
	    +"</tr>" ;
	    // Break into next row
	    
	    
//	    let next = i+1;
//	    console.log("NEXT value: "+next);
//	    if (next%rowcount==0 && next!=ticketList.length) {
//	      html += "</tr><tr>";
//	    }
	  }
	  //html += "</tr>";
	
<<<<<<< HEAD
} //this will manipulate the elements on the next page.

let today = new Date().toISOString().substr(0, 10);
document.querySelector("#autoToday").value = today;
=======
	  document.getElementById("tablebody").innerHTML = html;

} //this will manipulate the elements on the next page.
>>>>>>> 258ecf2ffc4c5409fd671ee168f9bb52f8f49b8f
