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
			request.getSession().setAttribute("CurrentUser", newUser); //CurrentUser will be the reference name.
			return "/HTML/home.html";
		}
			else return //"/HTML/home.html";
					"/HTML/index2.html";
		
	}
}
