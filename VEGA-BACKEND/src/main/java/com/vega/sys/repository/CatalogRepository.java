package com.vega.sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

}