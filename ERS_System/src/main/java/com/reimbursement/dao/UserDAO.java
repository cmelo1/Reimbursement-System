package com.reimbursement.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.reimbursement.model.*;

public class UserDAO implements UserDAOInterface {
	// URL/username/password Subject to change until we figure out a proper
	// Database.

    static{ //Static block places by her.
           try {
               Class.forName("oracle.jdbc.driver.OracleDriver");
           } catch (ClassNotFoundException e) {
               e.printStackTrace();
           }
       }
    
    
	private static String db_url = "jdbc:oracle:thin:@db1028.cspirgmhfavi.us-east-2.rds.amazonaws.com:1521:orcl";
	private static String db_username = "CDD";
	private static String db_password = "p4ssw0rd";

	public ArrayList<ERS_User> selectAllUsers() {// returns arrayList
		ArrayList<ERS_User> userList = new ArrayList<ERS_User>();
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM ERS_USERS");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				userList.add(new ERS_User(
						rs.getInt(1),
						rs.getString(2), 
						rs.getString(3),
						rs.getString(4),
						rs.getString(5),
						rs.getString(6),
						rs.getInt(7))); //Column Numbers to recieve from.
			}
		} catch (SQLException e) {
			System.out.println("Connection Failed!");
			e.printStackTrace();
		}
		return userList;
	}

	public ERS_User selectUser(String x) {//This might be used as the login method
		ERS_User cust = null;
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM ERS_USERS WHERE ERS_USERNAME = ?");
			// Putting in native SQL query
			ps.setString(1, x);

			ResultSet rs = ps.executeQuery();
			// Converts from an SQL result, to usable results.
			// ResultSet is the object.

			while (rs.next()) {
				cust = new ERS_User(rs.getInt(1), rs.getString(2), // Whatever the column names may be.
						rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6),
						rs.getInt(7));
				return cust;
			}

		} catch (SQLException e) {
			System.out.println("Connection Failed! SelectUser");
			e.printStackTrace();
		}
		return null;
	}

	public void insertUser(ERS_User x) { // not really going to be needed, but keeping it here for now.
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("INSERT INTO ERS_USERS VALUES(?,?,?,?,?,?)");

			ps.setString(1, x.getUsername());
			ps.setString(2, x.getPassword());
			ps.setString(3, x.getFname());
			ps.setString(4, x.getLname());
			ps.setString(5, x.getEmail());
			ps.setInt(6, x.getRole_id());
			ps.executeUpdate();

		} catch (SQLException e) {
			System.out.println("Connection Failed!");
			e.printStackTrace();
		}

	}

}