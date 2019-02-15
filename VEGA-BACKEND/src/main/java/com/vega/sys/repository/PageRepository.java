package com.vega.sys.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.Page;

public interface PageRepository extends JpaRepository<Page, Long> {

	List<Page> findByCatalogCatalogId(Long id,Sort sort);

}