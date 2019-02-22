package com.vega.sys.controller;

import java.util.List;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
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

import com.vega.sys.model.Client;
import com.vega.sys.repository.ClientRepository;
import com.vega.sys.response.Response;

@RestController
@RequestMapping("/clients")
@CacheConfig(cacheNames = "clients")
@CrossOrigin(origins = "*")
public class ClientRestController {
	@Autowired
	private ClientRepository clientRepository;
	private static Sort SORTING_DESC = new Sort(Sort.Direction.DESC, "clientId");

	@GetMapping()
	@Cacheable()
	public ResponseEntity<List<Client>> all() throws InterruptedException {
		
		List<Client> list = null;
		try {
			list = clientRepository.findAll(SORTING_DESC);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Client>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Client>>(list, HttpStatus.OK);

	}
	
	
	@CacheEvict(allEntries = true)
	@PostMapping()
	public ResponseEntity<Response> save(@RequestBody Client client, UriComponentsBuilder builder) {
		String message = client.getId()!=null ?  "messages.updated" : "messages.added";
		try {
			clientRepository.save(client);
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			message = "messages.client.unique";
			return new ResponseEntity<Response>(new Response(false, message), HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<Client> find(@PathVariable("id") Long id) throws InterruptedException {
		
		Client r = null;
		try {
			r = clientRepository.getOne(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Client>(r, HttpStatus.OK);
	}
	
	@CacheEvict(allEntries = true)
	@DeleteMapping("/{id}")
	public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
		try {

			clientRepository.deleteById(id);
			return new ResponseEntity<Response>(new Response(true, "messages.deleted"), HttpStatus.OK);

		}  catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, "messages.error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}