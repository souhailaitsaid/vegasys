package com.vega.sys.unsecured.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.vega.sys.model.Catalog;
import com.vega.sys.repository.CatalogRepository;
import com.vega.sys.repository.ClientRepository;

@RestController
@RequestMapping("/public/catalogs")
//@CacheConfig(cacheNames = "catalogs")
@CrossOrigin(origins = "*")
public class CatalogPublicRestController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private CatalogRepository catalogRepository;
	@Autowired
	private ClientRepository clientRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "catalogId");

	@GetMapping()
	public ResponseEntity<List<Catalog>> all() throws InterruptedException {

		List<Catalog> list = null;
		try {
			list = catalogRepository.findAll(SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Catalog>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Catalog>>(list, HttpStatus.OK);

	}
	
	@GetMapping(value="/now")
	//@Cacheable()
	public ResponseEntity<List<Catalog>> byDateNow() throws InterruptedException {

		List<Catalog> list = null;
		try {
			list = catalogRepository.findByDateNow(new Date());
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Catalog>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Catalog>>(list, HttpStatus.OK);

	}

	@GetMapping("/client/{id}")
	//@Cacheable()
	public ResponseEntity<List<Catalog>> byClientId(@PathVariable("id") Long id) throws InterruptedException {

		List<Catalog> list = null;
		try {
			list = catalogRepository.findByClientClientId(id, SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Catalog>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Catalog>>(list, HttpStatus.OK);

	}


	@GetMapping("/find/{id}")
	public ResponseEntity<Catalog> find(@PathVariable("id") Long id) throws InterruptedException {

		Catalog r = null;
		try {
			r = catalogRepository.getOne(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Catalog>(r, HttpStatus.OK);
	}

}