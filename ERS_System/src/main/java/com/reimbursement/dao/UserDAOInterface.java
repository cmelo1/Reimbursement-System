package com.reimbursement.dao;

import java.util.ArrayList;

import com.reimbursement.model.ERS_User;
import com.reimbursement.model.*;

public interface UserDAOInterface {

	public ArrayList<ERS_User> selectAllUsers(); 
	public ERS_User selectUser(String x);
	public void insertUser(ERS_User x);
	//public void updateUser(ERS_User x); I'm not sure if we are going to need this.
	
}