package com.reimbursement.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestHelper {

	// The idea behind this class is to route requests based on the URI that comes
	// along with the request.

	public static String process(HttpServletRequest request, HttpServletResponse response) {

		switch (request.getRequestURI()) {
		case "/ERS_System/HTML/index.do": 
			try {
			return LoginController.login(request);
			}
			catch(NullPointerException e) {
			return "/HTML/index.html";
			}
		case "/ERS_System/HTML/employee.do"://recently changed
			return EmployeeController.Home(request, response); 
		case "/ERS_System/HTML/Manager.do":
			return ManagerController.Home(request,response);
		case "/ERS_System/HTML/submitTicket.do":
			//must have an action from a submit button to a form as action="submitTicket.do"
			return TicketController.submitTicket(request);
		case "/ERS_System/HTML/displayTickets.do":
			return TicketController.displayTickets(request,response);
		case "/ERS_System/HTML/displayAllTickets.do":
			return TicketController.displayAllTickets(request,response);
		case "/ERS_System/HTML/approveTicket.do":
			return TicketController.approveTicket(request);
		case "/ERS_System/HTML/denyTicket.do":
			return TicketController.denyTicket(request);
		default:
			
			return "/HTML/index.html";
		}

	}

}
