package com.reimbursement.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.reimbursement.model.*;

public class TicketDAO implements TicketDAOInterface {
	private static String db_url = "jdbc:oracle:thin:@db1028.cspirgmhfavi.us-east-2.rds.amazonaws.com:1521:orcl";
	private static String db_username = "CDD";
	private static String db_password = "p4ssw0rd";
	

	@Override
	public void insertTicket(ERS_Ticket x) {
		
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("INSERT INTO ERS_REIMBURSEMENT VALUES(REIMB_SEQUENCE.nextval,?,?,?,?,?,?,?,?,?)");
			ps.setDouble(1,x.getAmount());
			ps.setTimestamp(2,x.getSubmit_date());
			ps.setTimestamp(3,x.getResolve_date());
			ps.setString(4,x.getDescription());
			ps.setBlob(5,x.getReceipt());
			ps.setInt(6,x.getAuthor());
			ps.setInt(7,x.getResolver());
			ps.setInt(8,x.getStatus_id());
			ps.setInt(9,x.getType_id());
			
			ps.executeUpdate();
			
			System.out.println("Success!");

		} catch (SQLException e) {
			System.out.println("Connection Failed! InsertTicket");
			e.printStackTrace();
		}

	}

	@Override
	public ERS_Ticket selectTicket(int x) {//Select ticket by (ticket_id) primary key for tickets.
		ERS_Ticket tick = null;
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {

			PreparedStatement ps = conn.prepareStatement("SELECT * FROM ERS_REIMBURSEMENT WHERE REIMB_ID=?");
			ps.setInt(1, x);
			
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				tick = new ERS_Ticket(
						rs.getInt(1),
						rs.getInt(2),
						rs.getTimestamp(3),
						rs.getTimestamp(4),
						rs.getString(5),
						rs.getBlob(6),
						rs.getInt(7),
						rs.getInt(8),
						rs.getInt(9),
						rs.getInt(10));
			}
		} catch (SQLException e) {
			System.out.println("Connection Failed! SelectTicket");
			e.printStackTrace();
		}
		return tick;
		
	}

	@Override
	public ArrayList<ERS_Ticket> selectAllTickets() {
		ArrayList<ERS_Ticket> ticketList = new ArrayList<ERS_Ticket>();
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {

			PreparedStatement ps = conn.prepareStatement("SELECT * FROM ERS_REIMBURSEMENT");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ticketList.add(new ERS_Ticket(
						rs.getInt(1),
						rs.getInt(2),
						rs.getTimestamp(3),
						rs.getTimestamp(4),
						rs.getString(5),
						rs.getBlob(6),
						rs.getInt(7),
						rs.getInt(8),
						rs.getInt(9),
						rs.getInt(10)));
			}
		} catch (SQLException e) {
			System.out.println("Connection Failed! Select All ticket");
			e.printStackTrace();
		}
		return ticketList;
		

	}
	
	public ERS_Ticket[] selectByEmployee(ERS_User x) { 
		ArrayList<ERS_Ticket> ticketList = new ArrayList<ERS_Ticket>();
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {

			PreparedStatement ps = conn.prepareStatement("SELECT * FROM ERS_REIMBURSEMENT WHERE REIMB_AUTHOR=?");
			ps.setInt(1,x.getUser_id());
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ticketList.add(new ERS_Ticket(
						rs.getInt(1),
						rs.getInt(2),
						rs.getTimestamp(3),
						rs.getTimestamp(4),
						rs.getString(5),
						rs.getBlob(6),
						rs.getInt(7),
						rs.getInt(8),
						rs.getInt(9),
						rs.getInt(10)));
			}
		} catch (SQLException e) {
			System.out.println("Connection Failed! SelectByEmployee");
			e.printStackTrace();
		}
		ERS_Ticket[] ticketArray = new ERS_Ticket[ticketList.size()];
		for(int i = 0; i<ticketList.size();i++) {
			ticketArray[i] = ticketList.get(i);
		}
		return ticketArray;
	}


	@Override
	public void updateTicket(ERS_Ticket x) { 
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("UPDATE ERS_REIMBURSEMENT SET "
					+ "ticket_id=?,"
					+ "ticket_amount=?,"
					+ "submit_date=?"
					+ "resolve_date=?,"
					+ "decreiption=?,"
					+ "receipt=?,"
					+ "status_id=?,"
					+ "type_id=? "
					+ "WHERE REIMB_ID=? ");
			
			ps.setInt(11, x.getTicket_Id());
			ps.setInt(1,x.getTicket_Id());
			ps.setDouble(2,x.getAmount());
			ps.setTimestamp(3,x.getSubmit_date());
			ps.setTimestamp(4,x.getResolve_date());
			ps.setString(5,x.getDescription());
			ps.setBlob(6,x.getReceipt());
			ps.setInt(7,x.getAuthor());
			ps.setInt(8,x.getResolver());
			ps.setInt(9,x.getStatus_id());
			ps.setInt(10,x.getType_id());
			
			ps.executeQuery();
		
						
		} catch (SQLException e) {
			System.out.println("Connection Failed! UpdateTicket");
			e.printStackTrace();
		}

		
		
	}

}