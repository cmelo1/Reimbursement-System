package com.project.DAO;
import java.util.ArrayList;

import com.project.models.*;

public interface TicketDAOinterface {

	public void insertTicket(ERS_Ticket x);
	public ERS_Ticket selectTicket(int x); //Select ticket by author of ticket.
	public ArrayList<ERS_Ticket> selectAllTickets();
	public void updateTicket(ERS_Ticket x);
	
}
