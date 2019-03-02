package com.vega.sys.controller;


import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vega.sys.identity.TokenUtil;
import com.vega.sys.model.session.SessionItem;
import com.vega.sys.model.session.SessionResponse;
import com.vega.sys.model.user.Login;
import com.vega.sys.model.user.User;
import com.vega.sys.repository.UserRepository;
import com.vega.sys.response.OperationResponse.ResponseStatusEnum;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/*
This is a dummy rest controller, for the purpose of documentation (/session) path is map to a filter
 - This will only be invoked if security is disabled
 - If Security is enabled then SessionFilter.java is invoked
 - Enabling and Disabling Security is done at config/applicaton.properties 'security.ignored=/**'
*/

@RestController
@CrossOrigin("*")
@Api(tags = {"Authentication"})
public class SessionController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserRepository userRepo;

    
    @Autowired
    private BCryptPasswordEncoder encoder;

    @ApiResponses(value = { @ApiResponse(code = 200, message = "Will return a security token, which must be passed in every request", response = SessionResponse.class) })
    @RequestMapping(value = "/session", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public SessionResponse newSession(@RequestBody Login login, HttpServletRequest request, HttpServletResponse response) {
    	logger.info("checking login : {} ",login );
        User user = userRepo.findOneByUsernameAndPassword(login.getUsername(), login.getPassword()).orElse(null);
        SessionResponse resp = new SessionResponse();
        SessionItem sessionItem = new SessionItem();
        if (user != null){
        	
            sessionItem.setToken(new TokenUtil().createTokenForUser(user));
            sessionItem.setUserId(user.getUserId());
            sessionItem.setUsername(user.getUsername());
            sessionItem.setFirstName(user.getFirstName());
            sessionItem.setLastName(user.getLastName());
            sessionItem.setEmail(user.getEmail());
            sessionItem.setRoles(Arrays.asList(user.getRole().name()));
            sessionItem.setClient(user.getClient());
            resp.setOperationStatus(ResponseStatusEnum.SUCCESS);
            resp.setOperationMessage("Dummy Login Success");
            resp.setItem(sessionItem);
            logger.info("user authenticated, returning response  : {} ", resp );
      }
      else{
            resp.setOperationStatus(ResponseStatusEnum.ERROR);
            resp.setOperationMessage("Login Failed");
            logger.info("user not authenticated, returning response  : {} ", resp );
      }
      return resp;
  }

}
