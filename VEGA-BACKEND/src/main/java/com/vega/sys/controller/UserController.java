package com.vega.sys.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.common.base.Strings;
import com.vega.sys.model.Client;
import com.vega.sys.model.Page;
import com.vega.sys.model.user.User;
import com.vega.sys.model.user.UserResponse;
import com.vega.sys.repository.UserRepository;
import com.vega.sys.response.OperationResponse;
import com.vega.sys.response.Response;
import com.vega.sys.response.OperationResponse.ResponseStatusEnum;
import com.vega.sys.service.impl.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CacheConfig(cacheNames = "users")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	@GetMapping("/users")
	@Cacheable()
	public ResponseEntity<List<User>> getAll() throws InterruptedException {
		
		List<User> list = null;
		try {
			list = userService.getUserRepo().findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<User>>(list, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<User>>(list, HttpStatus.OK);

	}
	
	@GetMapping("/users/find/{username}")
	public ResponseEntity<Optional<User>> find(@PathVariable("username") String username) throws InterruptedException {
		
		Optional<User> r = null;
		try {
			r =  userService.getUserRepo().findOneByUsername(username);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Optional<User>>(r, HttpStatus.OK);
	}
	@CacheEvict(allEntries = true)
	@GetMapping("/users/changePassword/{username}")
	public ResponseEntity<Response> changePassword(@PathVariable("username") String username,@RequestParam("oldPassword") String oldPassword,@RequestParam("newPassword") String newPassword) throws InterruptedException {
		String message =  null;
		boolean status;
		Optional<User> r = null;
		try {
			r =  userService.getUserRepo().findOneByUsername(username);
			if(r.isPresent()) {
				User u = r.get();
				if(oldPassword.equals(u.getPassword())){
					u.setPassword((newPassword));
					userService.getUserRepo().save(u);
					message = "profile.password.changed";
					status = true;
				}
				else {
					message = "profile.password.noMatch";
				}
			}
			else {
				message = "profile.user.notPresent";
				return new ResponseEntity<Response>(new Response(false, message), HttpStatus.OK);
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.CREATED);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
	}
	
	@CacheEvict(allEntries = true)
	@PostMapping()
	public ResponseEntity<Response> save(@RequestBody User user, UriComponentsBuilder builder) {
		String message = user.getUserId()!=null ?  "messages.updated" : "messages.added";
		try {
			if(user.getUserId()!= null) {
				User r =  userService.getUserRepo().getOne(user.getUserId());
				user.setPassword(r.getPassword());		
			}
			userService.getUserRepo().save(user);
			
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			message = "messages.user.unique";
			return new ResponseEntity<Response>(new Response(false, message), HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Response>(new Response(false, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Response>(new Response(true, message), HttpStatus.CREATED);
	}

	@ApiOperation(value = "Gets current user information", response = UserResponse.class)
	@RequestMapping(value = "/user", method = RequestMethod.GET, produces = {"application/json"})
	public UserResponse getUserInformation(@RequestParam(value = "name", required = false) String userIdParam, HttpServletRequest req) {

		String loggedInUserId = userService.getLoggedInUserId();

		User user;
		boolean provideUserDetails = false;

		if (Strings.isNullOrEmpty(userIdParam)) {
			provideUserDetails = true;
			user = userService.getLoggedInUser();
		}
		else if (loggedInUserId.equals(userIdParam)) {
			provideUserDetails = true;
			user = userService.getLoggedInUser();
		}
		else {
			//Check if the current user is superuser then provide the details of requested user
			provideUserDetails = true;
			user = userService.getUserInfoByUserName(userIdParam);
		}

		UserResponse resp = new UserResponse();
		if (provideUserDetails) {
            resp.setOperationStatus(ResponseStatusEnum.SUCCESS);
		}
		else {
            resp.setOperationStatus(ResponseStatusEnum.NO_ACCESS);
			resp.setOperationMessage("No Access");
		}
		resp.setData(user);
		return resp;
	}


	@ApiOperation(value = "Add new user", response = OperationResponse.class)
	@RequestMapping(value = "/user", method = RequestMethod.POST, produces = {"application/json"})
	public OperationResponse addNewUser(@RequestBody User user, HttpServletRequest req) {
		boolean userAddSuccess = userService.addNewUser(user);
		OperationResponse resp = new OperationResponse();
		if (userAddSuccess==true){
      resp.setOperationStatus(ResponseStatusEnum.SUCCESS);
			resp.setOperationMessage("User Added");
		}
		else{
      resp.setOperationStatus(ResponseStatusEnum.ERROR);
			resp.setOperationMessage("Unable to add user");
		}
		return resp;
	}


}
