package com.vega.sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}