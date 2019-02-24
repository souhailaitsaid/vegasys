package com.vega.sys.identity;

import org.springframework.security.core.authority.AuthorityUtils;

import com.vega.sys.model.user.User;

public class TokenUser extends org.springframework.security.core.userdetails.User {
    private User user;

    //For returning a normal user
    public TokenUser(User user) {
        super( user.getUserId(), user.getPassword(), AuthorityUtils.createAuthorityList(user.getRole().toString()  )  );
        //super(user.getUserName(), user.getPassword(), true, true, true, true,  AuthorityUtils.createAuthorityList(user.getRole().toString()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public String getRole() {
        return user.getRole().toString();
    }
}
