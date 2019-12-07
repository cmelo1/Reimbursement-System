/**
 * implement a button.onclick with the submission of ticket, 
 */



window.onbeforeunload = function(e) {
 
	document.getElementById("result").innerHTML = localStorage.getItem("lastname");
};


window.onload = function(){
	let user = localStorage.getItem("unloadUser");
	getUserInfo();
	getTicketInfo();
}

function getUserInfo(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		console.log(xhttp.status);
		if(xhttp.readyState == 4 && xhttp.status == 200){

			let user = JSON.parse(xhttp.responseText); //The response gets turned into this.
			setValues(user); //Call set values function defined below
			localStorage.setItem("unloadUser", user);
		}
	}
	//this goes straight to the request helper.
xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/employee.do',true); //Sends the set values 'request' to this.
xhttp.send();
}


//How to parse an array?

function getTicketInfo(){ 
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var ticketList = JSON.parse(xhttp.responseText); //The response gets turned into this
			setTableValues(ticketList); //Call set values function defined below
			
		}
	}
		//this goes straight to the request helper.
		xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/displayTickets.do',true); //Sends the set values 'request' to this.
		xhttp.send();
}

function setValues(user){
	document.getElementById("username").innerHTML = "Hello, " +user.fname;
}


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
	    //+"<td>" + ticketList[i].resolve_date + "</td>"
	    //+"<td>" + ticketList[i].description + "</td>"
	    //+"<td>" + ticketList[i].receipt + "</td>"
	    //+"<td>" + ticketList[i].author + "</td>"
	    //+"<td>" + ticketList[i].resolver + "</td>"
	    +"<td>" + ticketList[i].status_id + "</td>"
	    +"<td>" + ticketList[i].type_id + "</td>"
	    +"</tr>" ;
	    //https://stackoverflow.com/questions/34880415/adding-id-to-html-table-row-in-javascript/34880611
	    document.getElementById("tablebody").innerHTML = html;
	    

	  }
	  addRowHandlers(ticketList);
	  let today = new Date().toISOString().substr(0, 10);
	  document.querySelector("#autoToday").value = today;
	
	  

} //this will manipulate the elements on the next page.

//new function
function addRowHandlers(arrayobj) {
    var table = document.getElementById("tablebody");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        let passObj = arrayobj[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
                          
                                       
                                        modalStuff(passObj);
                         
                                 };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}



//modal
function modalStuff(row){
//Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
	let date = new Date (row.submit_date);
	document.getElementById("employeeNameId").innerHTML = "Employee ID: <i>" + row.author +"</i>" ;
	document.getElementById("amountID").innerHTML = "Amount:<i> $" + row.amount;
	document.getElementById("dateSubmittedId").innerHTML = "Date Submitted: <i> " + date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear() +"</i>";
	document.getElementById("dateResolvedId").innerHTML = "Date Resolved: <i> " + row.resolve_date +"</i>";
	document.getElementById("descriptionId").innerHTML = "Description: <i> " + row.description +"</i>";
	document.getElementById("receiptID").innerHTML = "Receipt: <i> " + row.receipt +"</i>";
	document.getElementById("authorId").innerHTML = "Author: <i> " + row.author +"</i>";
	document.getElementById("resolverId").innerHTML = "Resolver: <i> " + row.resolver +"</i>";
	document.getElementById("statusId").innerHTML = "Status: <i> " + row.status_id +"</i>";
	document.getElementById("expenseTypeId").innerHTML = "Expense Type: <i> " + row.type_id +"</i>";
	
	modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
}
