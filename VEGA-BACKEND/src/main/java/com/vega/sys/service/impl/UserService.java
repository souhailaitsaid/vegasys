package com.vega.sys.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.vega.sys.model.user.User;
import com.vega.sys.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepo;
  
  
  
  public UserRepository getUserRepo() {
	return userRepo;
}

public void setUserRepo(UserRepository userRepo) {
	this.userRepo = userRepo;
}

	public String getLoggedInUserId(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth==null){
            return "nosession";
        }
		return auth.getName();
	}


	public User getLoggedInUser() {
		String loggedInUserId = this.getLoggedInUserId();
		User user = this.getUserInfoByUserName(loggedInUserId);
		return user;
	}

	public User getUserInfoByUserName(String userId){
			User user = this.userRepo.findOneByUsername(userId).orElseGet( () -> new User());
			return user;
	}

	public boolean insertOrSaveUser(User user) {
		this.userRepo.save(user);
		return true;
	}

	public boolean addNewUser(User user) {
		User newUser = this.getUserInfoByUserName(user.getUsername());
		if (newUser.getUserId().equals("new")){
			// This means the username is not found therfore its is returning a default value of "new"
			return this.insertOrSaveUser(user);
		}
		else{
			return false;
		}
	}

}
