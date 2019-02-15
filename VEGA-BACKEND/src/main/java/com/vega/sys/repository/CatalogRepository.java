package com.vega.sys.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

	List<Catalog> findByClientClientId(Long id,Sort sort);

}