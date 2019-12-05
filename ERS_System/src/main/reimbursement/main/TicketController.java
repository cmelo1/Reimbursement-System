package com.reimbursement.main;

import java.sql.Blob;
import java.sql.Timestamp;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.reimbursement.dao.TicketDAO;
import com.reimbursement.model.ERS_Ticket;
import com.reimbursement.model.ERS_User;

public class TicketController { //NEEDS TO BE WORKED ON LOL 
	
	public static String submitTicket(HttpServletRequest request){
		ERS_User EmployeeUser = (ERS_User)request.getSession().getAttribute("CurrentUser");
		TicketDAO ticketDAO = new TicketDAO();
		Date date= new Date();
		int ticket_Id = 0;
		//this Integer parsing might cause trouble later.
		double ticket_amount = Integer.parseInt(request.getParameter("ticket_amount"));
		Timestamp current_date = new Timestamp(date.getTime());
		Timestamp resolve_date=null;
		String ticket_description = request.getParameter("description");
		Blob receipt = null;
		int author = EmployeeUser.getUser_id();
		int resolver = 0;
		int status_id = 140;
		int type_id = Integer.parseInt(request.getParameter("type_id"));
		ERS_Ticket newTicket = new ERS_Ticket(
				ticket_Id,
				ticket_amount,
				current_date,
				resolve_date,
				ticket_description,
				receipt,
				author,
				resolver,
				status_id,
				type_id);
		
		ticketDAO.insertTicket(newTicket);
		return "/HTML/employee.html";
		
			
	
	
	
	}

}
