package com.reimbursement.main;


import java.util.ArrayList;

import com.reimbursement.dao.*;
import com.reimbursement.model.*;


public class MainDriver {
	
	
	public static void main(String[] args) {
		
		login();
		
	}

	
	public static void login() { //in her example for logging in she uses a SelectUser instead of a select all.
		UserDAO user = new UserDAO();
		ArrayList<ERS_User> userList = user.selectAllUsers();
		for(ERS_User x:userList) {
			System.out.println(userList.toString());
		}
	
		
	}
}
