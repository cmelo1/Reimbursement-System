/**
 * 
 */
window.onbeforeunload = function(e) {
 
	document.getElementById("username").innerHTML = localStorage.getItem("unloadUser");
};

window.onload = function(){
	getUserInfo();
	getTicketInfo();

}

function getUserInfo(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		console.log(xhttp.readyState);
		console.log(xhttp.status);
		if(xhttp.readyState == 4 && xhttp.status == 200){
			let user = JSON.parse(xhttp.responseText);
			setValues(user); //Call set values function defined below
			if(user!= undefined){
				localStorage.setItem("unloadUser", user);
			}
			
		}
	}

xhttp.open("GET",'http://localhost:8080/ERS_System/HTML/Manager.do',true); //Sends the set values 'request' to this.
xhttp.send();
}

function setValues(user){
	document.getElementById("username").innerHTML = "User's username is" + user.username; 
	
}

//How to parse an array?

function getTicketInfo() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var ticketList = JSON.parse(xhttp.responseText); // The response																// gets turned																// into this
			setTableValues(ticketList); // Call set values function defined
										// below
		}
	}
	// this goes straight to the request helper.
	xhttp.open("GET",
			'http://localhost:8080/ERS_System/HTML/displayAllTickets.do', true);																																			// this.
	xhttp.send();

}

function setValues(user) {
	document.getElementById("username").innerHTML = "Hello, " + user.fname;
}
function formatMoney(number) {
	  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}


//this is the ticketList recieved from the HTTP Request,
function setTableValues(ticketList) {
	let rowcount = 10; // 10 items per row
	html = "";
	// Loop through array and add table cells
	for (var i = 0; i < ticketList.length; i++) {

		let date = new Date(ticketList[i].submit_date);
		let rdate = new Date(ticketList[i].resolve_date);
		// Insert row based on parameters.
		
		let status = ticketList[i].status_id;
		switch(status){
		case 140:
			status = "PENDING";
			break;
		case 141: 
			status = "APPROVED";
			break;
		case 142:
			status = "DENIED";
			break;
		}
		
		let typeid = ticketList[i].type_id;
		switch(typeid){
		
		case 140:
			typeid = "LODGING";
			break;
		case 141: 
			typeid = "TRAVEL";
			break;
		case 142:
			typeid = "FOOD";
			break;
		case 143:
			typeid = "OTHER";
			break;
		}
		
		let resolver = ticketList[i].resolver;
		let tempResolveDate = "<td>" + (rdate.getMonth()+1) + "/" + rdate.getDate() + "/" + rdate.getFullYear() + "</td>";
		if(resolver == 0){
			tempResolveDate = "<td> PENDING </td>";
			resolver = " -";
		}
		html += "<tr> <td>" + ticketList[i].ticket_Id + "</td>" + "<td>"
				+ formatMoney(ticketList[i].amount) + "</td>" + "<td>" + (date.getMonth()+1)
				+ "/" + date.getDate() + "/" + date.getFullYear() + "</td>"
				+ tempResolveDate + "<td>"
				+ ticketList[i].description + "</td>" + "<td>"
				+ ticketList[i].receipt + "</td>" + "<td>"
				+ ticketList[i].author + "</td>" + "<td>"
				+ resolver + "</td>" + "<td>"
				+ status + "</td>" + "<td>" + typeid + "</td>" + "</tr>";
		// https://stackoverflow.com/questions/34880415/adding-id-to-html-table-row-in-javascript/34880611
		document.getElementById("tablebody").innerHTML = html;

	}
	addRowHandlers(ticketList);
	


} // this will manipulate the elements on the next page.

// new function


function addRowHandlers(arrayobj) {
	var table = document.getElementById("tablebody");
	var rows = table.getElementsByTagName("tr");
	for (i = 0; i < rows.length; i++) {
		var currentRow = table.rows[i];
		let passObj = arrayobj[i];
		var createClickHandler = function(row) {
			return function() {
				modalStuff(passObj);
			};
		};

		currentRow.onclick = createClickHandler(currentRow);
	}
}

// modal
function modalStuff(row) {
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	
	//convert number to string.
	let status = row.status_id;
	switch(status){
	case 140:
		status = "PENDING";
		break;
	case 141: 
		status = "APPROVED";
		break;
	case 142:
		status = "DENIED";
		break;
	}
	
	let typeid = row.type_id;
	switch(typeid){
	case 140:
		typeid = "LODGING";
		break;
	case 141: 
		typeid = "TRAVEL";
		break;
	case 142:
		typeid = "FOOD";
		break;
	case 143:
		typeid = "OTHER";
		break;
	}
	
	let resolver = row.resolver;
	let rdate = new Date(row.resolve_date);
	
	if(resolver == 0){
		document.getElementById("dateResolvedId").innerHTML = "Date Resolved: <i> PENDING </i>";
		resolver = " -";
	}
	else if (resolver!=0){
		document.getElementById("dateResolvedId").innerHTML = "Date Resolved: <i> " + (rdate.getMonth()+1)+"/"+rdate.getDate()+"/"+rdate.getFullYear() +"</i>";
	}
	
	
	
	let date = new Date(row.submit_date);
	document.getElementById("employeeNameId").innerHTML = "Employee ID: <i>"
			+ row.author + "</i>";
	document.getElementById("amountID").innerHTML = "Amount:<i> $" + formatMoney(row.amount);
	document.getElementById("dateSubmittedId").innerHTML = "Date Submitted: <i> "
			+ (date.getMonth()+1)
			+ "/"
			+ date.getDate()
			+ "/"
			+ date.getFullYear()
			+ "</i>";
	document.getElementById("descriptionId").innerHTML = "Description: <i> "
			+ row.description + "</i>";
	document.getElementById("receiptID").innerHTML = "Receipt: <i> "
			+ row.receipt + "</i>";
	document.getElementById("authorId").innerHTML = "Author: <i> " + row.author
			+ "</i>";
	document.getElementById("resolverId").innerHTML = "Resolver: <i> "
			+ resolver + "</i>";
	
	document.getElementById("statusId").innerHTML = "Status: <i> "
			+ status + "</i>";
	document.getElementById("expenseTypeId").innerHTML = "Expense Type: <i> "
			+ typeid + "</i>";

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
	
	// When the user clicks on <span> (x), close the modal
	approveButton.onclick = function() {
		approvedSnackbar();
		
		
		approveTicketRequest(row); //HTTP Request
		
		modal.style.display = "none";
	}

	// When the user clicks on <span> (x), close the modal
	denyButton.onclick = function() {
		deniedSnackbar();
		denyTicketRequest(row); //HTTP Request
		modal.style.display = "none";
	}
		
}

function approveTicketRequest(row){
	console.log(row);
	let xhttpReq = new XMLHttpRequest();
	xhttpReq.onreadystatechange = function(){
		if(xhttpReq.readyState == 4 && xhttpReq.status == 200){
			getTicketInfo();
		}
	}
	let id = row.ticket_Id;
	
xhttpReq.open("PUT",'http://localhost:8080/ERS_System/HTML/approveTicket.do',true); 
xhttpReq.setRequestHeader("ticketid","x-www-form-urlencoded");
xhttpReq.send(id);
}

function denyTicketRequest(row){
	console.log(row);
	let xhttpReq = new XMLHttpRequest();
	xhttpReq.onreadystatechange = function(){
		if(xhttpReq.readyState == 4 && xhttpReq.status == 200){
			getTicketInfo();	
		}
	}
	let id = row.ticket_Id;
	//this goes straight to the request helper.
xhttpReq.open("PUT",'http://localhost:8080/ERS_System/HTML/denyTicket.do',true); //Sends the set values 'request' to this.
xhttpReq.setRequestHeader("ticketid","x-www-form-urlencoded");
xhttpReq.send(id);
}


function approvedSnackbar() {
	var x = document.getElementById("snackbar");
	document.getElementById("snackbar").innerHTML = "Ticket Approved";
	document.getElementById("snackbar").style.backgroundColor = "#28a745"
	x.className = "show";
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}

function deniedSnackbar() {
	var x = document.getElementById("snackbar");
	document.getElementById("snackbar").innerHTML = "Ticket Denied";
	document.getElementById("snackbar").style.backgroundColor = "#dc3545"
	x.className = "show";
	setTimeout(function() {
		x.className = x.className.replace("show", "");
	}, 3000);
}




/**
 * THIS IS THE BEGINNING OF THE SORTABLE/SEARCHABLE TABLE JAVASCRIPT
 * *****************************************************************
 * 
 */

function myFunction() {
	  // Declare variables
	  var input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById("myInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("table1");
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      txtValue = td.textContent || td.innerText;
	      if (txtValue.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}

/**
 * THIS IS THE BEGINNING OF THE SORTABLE/SEARCHABLE TABLE JAVASCRIPT
 * *****************************************************************
 * 
 */

function searchFunction() {
	  // Declare variables
	  var input, filter, table, tr, td, i, txtValue;
	  input = document.getElementById("searchInput");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("table1");
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
	      txtValue = td.textContent || td.innerText;
	      if (txtValue.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    }
	  }
	}

