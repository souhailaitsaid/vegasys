package com.vega.sys.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.data.domain.Persistable;

@Entity
public class Store implements Persistable<Long> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long storeId;
	String address;
	Integer phoneNumber;
	
	@ManyToOne
	Client	client;
	
	

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public Long getStoreId() {
		return storeId;
	}

	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public Long getId() {
		return getStoreId();
	}

	@Override
	public boolean isNew() {
		return null == getId();
	}

	public Integer getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Integer phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Store() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Store(Long storeId, String address, Integer phoneNumber, Client client) {
		super();
		this.storeId = storeId;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.client = client;
	}


}
