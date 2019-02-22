package com.vega.sys.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Client implements Persistable<Long>  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long clientId;
	@Column(unique=true)
	String clientName;
	String description;
	@Column(unique=true)
	String email;
	Long phoneNumber;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "client",cascade = CascadeType.PERSIST)
	private List<Catalog> catalogs = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "client",cascade = CascadeType.PERSIST)
	private List<Store> stores = new ArrayList<>();
	
	
	 @ManyToMany(fetch = FetchType.LAZY)
	 @JoinTable(name = "client_categories",
	 joinColumns = { @JoinColumn(name = "clientId") },
	 inverseJoinColumns = { @JoinColumn(name = "categoryId") })
	 private Set<Category> categories = new HashSet<Category>();

	public Long getClientId() {
		return clientId;
	}

	public void setClientId(Long clientId) {
		this.clientId = clientId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	


	@Override
	public Long getId() {
		return getClientId();
	}

	@Override
	public boolean isNew() {
		return null == getId();
	}
	
	
	
	
	public List<Catalog> getCatalogs() {
		return catalogs;
	}

	public void setCatalogs(List<Catalog> catalogs) {
		this.catalogs = catalogs;
	}

	public List<Store> getStores() {
		return stores;
	}

	public void setStores(List<Store> stores) {
		this.stores = stores;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Client() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Client(Long clientId, String clientName, String description, String email, Long phoneNumber) {
		super();
		this.clientId = clientId;
		this.clientName = clientName;
		this.description = description;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}

	public Client(Long clientId, String clientName, String description, String email, Long phoneNumber,
			Set<Category> categories) {
		super();
		this.clientId = clientId;
		this.clientName = clientName;
		this.description = description;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.categories = categories;
	}
	
	

	

}
