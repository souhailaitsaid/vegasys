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

import com.vega.sys.model.Page;
import com.vega.sys.repository.PageRepository;
import com.vega.sys.response.Response;

@RestController
@RequestMapping("/pages")
@CacheConfig(cacheNames = "pages")
@CrossOrigin(origins = "*")
public class PageRestController {
	@Autowired
	private PageRepository pageRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "pageId");

	@GetMapping()
	@Cacheable()
	public ResponseEntity<List<Page>> all() throws InterruptedException {
		
		List<Page> list = null;
		try {
			list = pageRepository.findAll(SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Page>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Page>>(list, HttpStatus.OK);

	}

	@GetMapping("/catalog/{id}")
	@Cacheable()
	public ResponseEntity<List<Page>> byClientId(@PathVariable("id") Long id) throws InterruptedException {
		
		List<Page> list = null;
		try {
			list = pageRepository.findByCatalogCatalogId(id,SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Page>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Page>>(list, HttpStatus.OK);

	}
	
	@CacheEvict(value = { "pages", "catalogs" },allEntries = true)
	@PostMapping()
	public ResponseEntity<Response> save(@RequestBody Page page, UriComponentsBuilder builder) {
		String message = page.getId()!=null ?  "messages.updated" : "messages.added";
		try {
			pageRepository.save(page);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Page> find(@PathVariable("id") Long id) throws InterruptedException {
		
		Page r = null;
		try {
			r = pageRepository.getOne(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Page>(r, HttpStatus.OK);
	}
	
	@CacheEvict(value = { "pages", "catalogs" },allEntries = true)
	@DeleteMapping("/{id}")
	public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
		try {

			pageRepository.deleteById(id);
			return new ResponseEntity<Response>(new Response(true, "messages.deleted"), HttpStatus.OK);

		}  catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, "messages.error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}