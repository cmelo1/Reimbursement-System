/**
 * 
 */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//Get the button that opens the modal
var approveButton = document.getElementById("approveButton");

// Get the button that opens the modal
var denyButton = document.getElementById("denyButton");

// When the user clicks on the button, open the modal
btn.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
approveButton.onclick = function() {
	approvedSnackbar();
	modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
denyButton.onclick = function() {
	deniedSnackbar();
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
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



