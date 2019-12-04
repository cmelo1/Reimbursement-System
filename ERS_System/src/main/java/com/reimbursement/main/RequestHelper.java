package com.reimbursement.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RequestHelper {
	
	//The idea behind this class is to route requests based on the URI that comes along with the request.
	
	public static String process(HttpServletRequest request, HttpServletResponse response) {
		
		switch(request.getRequestURI()) {
		case "/ERS_System/HTML/index2.do": //this is the login file, the path might be fucked up.
		return LoginController.login(request);
		
		//case "/Reimbursement_System_ERS_System/Register.do":
		//return RegisterController.Register(request);
		
		case "/ERS_System/home.do":
		return HomeController.Home(request, response); //Home is where they should go if the login works.
		
		default:
			return "/HTML/index2.html";
		}
		
	}

}
