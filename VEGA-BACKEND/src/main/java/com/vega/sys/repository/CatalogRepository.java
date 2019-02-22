package com.vega.sys.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vega.sys.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

	List<Catalog> findByClientClientId(Long id,Sort sort);
	
	@Query("select count(b) from Catalog b where b.client.clientId = :id")
	Integer countCatalogsByClient(@Param("id") Long id);

}