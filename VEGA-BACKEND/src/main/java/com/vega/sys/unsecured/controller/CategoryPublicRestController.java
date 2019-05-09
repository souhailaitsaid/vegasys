package com.vega.sys.unsecured.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.vega.sys.model.Category;
import com.vega.sys.repository.CategoryRepository;
import com.vega.sys.response.Response;

@RestController
@RequestMapping("/public/categories")
//@CacheConfig(cacheNames = "publicCategories")
@CrossOrigin(origins = "*")
public class CategoryPublicRestController {
	@Autowired
	private CategoryRepository categoryRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "categoryId");

	@GetMapping()
	//@Cacheable()
	public ResponseEntity<List<Category>> all() throws InterruptedException {
		
		List<Category> list = null;
		try {
			list = categoryRepository.findAll(SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Category>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Category>>(list, HttpStatus.OK);

	}
	

	@GetMapping("/find/{id}")
	public ResponseEntity<Category> find(@PathVariable("id") Long id) throws InterruptedException {
		
		Category r = null;
		try {
			r = categoryRepository.getOne(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Category>(r, HttpStatus.OK);
	}
	
}