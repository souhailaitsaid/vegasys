package com.vega.sys.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.springframework.data.domain.Persistable;

@Entity
public class Page implements Persistable<Long> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long pageId;
	private Integer number;
	private String filePath;
	
	@ManyToOne
	Catalog catalog;

	
	
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Catalog getCatalog() {
		return catalog;
	}

	public void setCatalog(Catalog catalog) {
		this.catalog = catalog;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public Long getPageId() {
		return pageId;
	}

	public void setPageId(Long pageId) {
		this.pageId = pageId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public Long getId() {
		return getPageId();
	}

	@Override
	public boolean isNew() {
		return null == getId();
	}

	public Page() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Page(Long pageId, Integer number, String filePath, Catalog catalog) {
		super();
		this.pageId = pageId;
		this.number = number;
		this.filePath = filePath;
		this.catalog = catalog;
	}
	
	

}
