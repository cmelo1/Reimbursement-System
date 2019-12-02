package com.reimbursement.model;

import java.sql.Blob;
import java.sql.Timestamp;
import java.util.Date;


public class ERS_Ticket {
	/*
	 * 
	 */
private int ticket_id;
private int amount;
private Timestamp submit_date; //getters/setters might have to convert between SQL time if its different.
private Timestamp resolve_date;
private String	description;
private Blob receipt; //wtf is a blob lmao??
private int author;
private int resolver;
private int status_id;
private int type_id;

public ERS_Ticket() {}
public ERS_Ticket(int id,int amount,Timestamp resolve_date,Timestamp submit_date, //SQL constructor
		String description,Blob receipt,int author,int resolver ,int status_id,int type_id) {
	
	this.ticket_id = id;
	this.amount=amount;
	this.submit_date = submit_date;
	this.resolve_date = resolve_date;
	this.description = description;
	this.receipt = receipt;
	this.author = author;
	this.resolver = resolver;
	this.status_id = status_id;
	this.type_id = type_id;
	
	
}

public int getTicket_Id() {
	return ticket_id;
}
public void setTicket_id(int id) {
	this.ticket_id = id;
}
public int getAmount() {
	return amount;
}
public void setAmount(int amount) {
	this.amount = amount;
}
public Timestamp getSubmit_date() {
	return submit_date;
}
public void setSubmit_date(Timestamp submit_date) {
	this.submit_date = submit_date;
}
public Timestamp getResolve_date() {
	return resolve_date;
}
public void setResolve_date(Timestamp resolve_date) {
	this.resolve_date = resolve_date;
}
public String getDescription() {
	return description;
}
public void setDescription(String description) {
	this.description = description;
}
public Blob getReceipt() {
	return receipt;
}
public void setReceipt(Blob receipt) {
	this.receipt = receipt;
}
public int getAuthor() {
	return author;
}
public void setAuthor(int author) {
	this.author = author;
}
public int getResolver() {
	return resolver;
}
public void setResolver(int resolver) {
	this.resolver = resolver;
}
public int getStatus_id() {
	return status_id;
}
public void setStatus_id(int status_id) {
	this.status_id = status_id;
}
public int getType_id() {
	return type_id;
}
public void setType_id(int type_id) {
	this.type_id = type_id;
}



}