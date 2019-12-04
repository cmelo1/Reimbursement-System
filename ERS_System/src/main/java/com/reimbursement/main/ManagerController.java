package com.reimbursement.main;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reimbursement.model.ERS_User;

public class ManagerController {
	
public static String Home(HttpServletRequest request, HttpServletResponse response) {
		
		ERS_User ManagerUser = (ERS_User)request.getSession().getAttribute("CurrentUser");
		//Marshalling tool - the idea of converting an object into a data format 
		//in our case - User to JSON (Jackson)
		try {
			response.getWriter().write(new ObjectMapper().writeValueAsString(ManagerUser));
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
