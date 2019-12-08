package com.reimbursement.dao;

import java.util.ArrayList;

import com.reimbursement.model.*;

public interface TicketDAOInterface {

	public void insertTicket(ERS_Ticket x);
	public ERS_Ticket selectTicket(int x); //Select ticket by author of ticket.
	public ERS_Ticket[] selectAllTickets();
	public void updateTicket(ERS_Ticket x);
	
}