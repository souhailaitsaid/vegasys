package com.vega.sys.response;

import java.util.HashSet;
import java.util.Set;

public class Response {
	Boolean success;
	String message;
	Double unitValue;
	Set<String> messages = new HashSet<String>();

	public Set<String> getMessages() {
		return messages;
	}


	public void setMessages(Set<String> messages) {
		this.messages = messages;
	}


	public Double getUnitValue() {
		return unitValue;
	}


	public void setUnitValue(Double unitValue) {
		this.unitValue = unitValue;
	}


	public Response(Boolean success, String message, Double unitValue) {
		super();
		this.success = success;
		this.message = message;
		this.unitValue = unitValue;
	}


	public Response(Boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}


	public Boolean getSuccess() {
		return success;
	}


	public void setSuccess(Boolean success) {
		this.success = success;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public Response() {
		super();
	}
	
	
	

}
