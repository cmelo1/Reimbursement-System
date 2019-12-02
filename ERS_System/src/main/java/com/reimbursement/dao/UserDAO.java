package com.reimbursement.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.reimbursement.model.*;


public class UserDAO implements UserDAOInterface{
	//URL/username/password Subject to change until we figure out a proper Database.
	
	private static String db_url = "jdbc:oracle:thin:@db1028.cspirgmhfavi.us-east-2.rds.amazonaws.com:1521:orcl";
	private static String db_username = "customers";
	private static String db_password = "p4ssw0rd";
	
	public ArrayList<ERS_User> selectAllUsers() {//returns arrayList
		ArrayList<ERS_User> userList = new ArrayList<ERS_User>();
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM users");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				userList.add(new ERS_User(
						rs.getInt("user_id"),
						rs.getString("username"),  //Whatever the column names may be.
						rs.getString("password"),
						rs.getString("f_name"),
						rs.getString("l_name"),
						rs.getString("email"),
						rs.getInt("role_id")));
			}
		} catch (SQLException e) {
			System.out.println("Connection Failed!");
			e.printStackTrace();
		}
		return userList;
	}
	
	public void insertUser(ERS_User x) {
		try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
			PreparedStatement ps = conn.prepareStatement("INSERT INTO users VALUES(?,?,?,?,?,?)");
			
			ps.setString(1, x.getUsername());
			ps.setString(2, x.getPassword());
			ps.setString(3, x.getF_name());
			ps.setString(4, x.getL_name());
			ps.setString(5, x.getEmail());
			ps.setInt(6, x.getRole_id());
			ps.executeUpdate();

		} catch (SQLException e) {
			System.out.println("Connection Failed!");
			e.printStackTrace();
		}

	}
	
		public ERS_User selectUser(int x) {//Selecting a user by int passed to it.
			ERS_User cust = null;
			try (Connection conn = DriverManager.getConnection(db_url, db_username, db_password)) {
				PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE =?");
				// Putting in native SQL query
				ps.setInt(1, x);

				ResultSet rs = ps.executeQuery();
				// Converts from an SQL result, to usable results.
				// ResultSet is the object.

				while (rs.next()) {
					cust = new ERS_User(
							rs.getInt("user_id"),
							rs.getString("username"),  //Whatever the column names may be.
							rs.getString("password"),
							rs.getString("f_name"),
							rs.getString("l_name"),
							rs.getString("email"),
							rs.getInt("role_id"));
					return cust;
				}
	
	}
			catch (SQLException e) {
				System.out.println("Connection Failed!");
				e.printStackTrace();
			}
			return null;
		}
		}