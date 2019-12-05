package com.reimbursement.main;

import javax.servlet.http.HttpServletRequest;

import com.reimbursement.dao.UserDAO;
import com.reimbursement.model.ERS_User;

public class LoginController {

	
	public static String login(HttpServletRequest request){
		UserDAO user = new UserDAO();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		ERS_User newUser = new ERS_User();
		newUser = user.selectUser(username);
			
			if(username.equals(newUser.getUsername()) && password.equals(newUser.getPassword())) {
				if(newUser.getRole_id() == 5000) { //employee ID number
					request.getSession().setAttribute("CurrentUser", newUser); //CurrentUser will be the reference name.
					return "/HTML/employee.html";
				}
				else if(newUser.getRole_id() == 5100) { //Boss ID number
					request.getSession().setAttribute("CurrentUser", newUser); //CurrentUser will be the reference name.
					return "/HTML/Manager.html";
				}
				return "/HTML/index.html"; //Return back to main screen if the ROLE_ID doesnt match up..

		}
			else return
					"/HTML/index.html";
		
	}
}
