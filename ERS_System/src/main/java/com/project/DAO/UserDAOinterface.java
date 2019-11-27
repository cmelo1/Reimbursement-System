package com.project.DAO;

import java.util.ArrayList;

import com.project.models.ERS_User;
import com.project.models.*;

public interface UserDAOinterface {

	public ArrayList<ERS_User> selectAllUsers(); 
	public ERS_User selectUser(int x);
	public void insertUser(ERS_User x);
	//public void updateUser(ERS_User x); I'm not sure if we are going to need this.
	
}
