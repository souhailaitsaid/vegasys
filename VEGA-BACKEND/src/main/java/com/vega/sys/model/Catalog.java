package com.vega.sys.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.data.domain.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Catalog implements Persistable<Long>  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long catalogId;
	String description;
	@Temporal(TemporalType.DATE)
	Date debut;
	@Temporal(TemporalType.DATE)
	Date fin;

	@ManyToOne
	private Client client;
	

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "catalog",cascade = CascadeType.PERSIST)
	private List<Page> pages = new ArrayList<>();
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDebut() {
		return debut;
	}

	public void setDebut(Date debut) {
		this.debut = debut;
	}

	public Date getFin() {
		return fin;
	}

	public void setFin(Date fin) {
		this.fin = fin;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public List<Page> getPages() {
		return pages;
	}

	public void setPages(List<Page> pages) {
		this.pages = pages;
	}

	public Long getCatalogId() {
		return catalogId;
	}

	public void setCatalogId(Long catalogId) {
		this.catalogId = catalogId;
	}

	

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	

	@Override
	public Long getId() {
		return getCatalogId();
	}

	@Override
	public boolean isNew() {
		return null == getId();
	}
	
	
	
	
	
	public Catalog(Long catalogId, Date debut, Date fin, Client client,String description) {
		super();
		this.catalogId = catalogId;
		this.debut = debut;
		this.fin = fin;
		this.client = client;
		this.description = description;
	}

	public Catalog() {
		super();
		// TODO Auto-generated constructor stub
	}


}
