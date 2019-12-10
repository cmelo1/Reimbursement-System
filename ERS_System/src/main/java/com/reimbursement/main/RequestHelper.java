package com.reimbursement.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestHelper {



	public static String process(HttpServletRequest request, HttpServletResponse response) {

		switch (request.getRequestURI()) {
		case "/ERS_System/HTML/index.do":
			try {
				return LoginController.login(request);
			} catch (NullPointerException e) {
				return "/HTML/index.html";
			}
		case "/ERS_System/HTML/employee.do": //Employee Redirect
			return EmployeeController.Home(request, response);
		case "/ERS_System/HTML/Manager.do": //Manager Redirect
			return ManagerController.Home(request, response);
		case "/ERS_System/HTML/submitTicket.do": //Ticket Methods
			return TicketController.submitTicket(request);
		case "/ERS_System/HTML/displayTickets.do":
			return TicketController.displayTickets(request, response);
		case "/ERS_System/HTML/displayAllTickets.do":
			return TicketController.displayAllTickets(request, response);
		case "/ERS_System/HTML/approveTicket.do":
			return TicketController.approveTicket(request);
		case "/ERS_System/HTML/denyTicket.do":
			return TicketController.denyTicket(request);
		default:

			return "/HTML/index.html";
		}

	}

}
