package com.vega.sys.secured.controller;

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
@RequestMapping("/categories")
@CacheConfig(cacheNames = "categories")
@CrossOrigin(origins = "*")
public class CategoryRestController {
	@Autowired
	private CategoryRepository categoryRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "categoryId");

	@GetMapping()
	@Cacheable()
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
	
	
	@CacheEvict(allEntries = true)
	@PostMapping()
	public ResponseEntity<Response> save(@RequestBody Category category, UriComponentsBuilder builder) {
		String message = category.getId()!=null ?  "messages.updated" : "messages.added";
		try {
			categoryRepository.save(category);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
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
	
	@CacheEvict(allEntries = true)
	@DeleteMapping("/{id}")
	public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
		try {

			categoryRepository.deleteById(id);
			return new ResponseEntity<Response>(new Response(true, "messages.deleted"), HttpStatus.OK);

		}  catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, "messages.error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}