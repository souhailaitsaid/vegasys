package com.vega.sys.secured.controller;

import java.util.Arrays;
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
import com.vega.sys.model.Client;
import com.vega.sys.repository.CatalogRepository;
import com.vega.sys.repository.ClientRepository;
import com.vega.sys.response.Response;

@RestController
@RequestMapping("/catalogs")
@CacheConfig(cacheNames = "catalogs")
@CrossOrigin(origins = "*")
public class CatalogRestController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private CatalogRepository catalogRepository;
	@Autowired
	private ClientRepository clientRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "catalogId");

	@GetMapping("/catalogsByClient")
	@Cacheable()
	public ResponseEntity<Map<String, List<Integer>>> catalogsByClient() throws InterruptedException {
		Map<String, List<Integer>> dash = new HashMap<String, List<Integer>>();
		logger.info("==> CatalogRestController.catalogsByClient()");
		List<Client> list = null;
		try {
			list = clientRepository.findAll();
			for (Client  c : list) {
				Integer count = catalogRepository.countCatalogsByClient(c.getId());
				List<Integer> object = Arrays.asList(count != null ? count : 0);
				dash.put(c.getClientName(), object);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("CatalogRestController.catalogsByClient() , error : {}", e.getMessage());
			return new ResponseEntity<Map<String, List<Integer>>>(dash, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		logger.info("<== CatalogRestController.catalogsByClient() , dash : {}", dash);
		return new ResponseEntity<Map<String, List<Integer>>>(dash, HttpStatus.OK);
	}

	@GetMapping()
	@Cacheable()
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

	@GetMapping("/client/{id}")
	@Cacheable()
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

	@CacheEvict(allEntries = true)
	@PostMapping()
	public ResponseEntity<Response> save(@RequestBody Catalog catalog, UriComponentsBuilder builder) {
		String message = catalog.getId() != null ? "messages.updated" : "messages.added";
		try {
			catalogRepository.save(catalog);
			
		} 
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
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

	@CacheEvict(allEntries = true)
	@DeleteMapping("/{id}")
	public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
		try {

			catalogRepository.deleteById(id);
			return new ResponseEntity<Response>(new Response(true, "messages.deleted"), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, "messages.error"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}