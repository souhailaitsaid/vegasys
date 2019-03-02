package com.vega.sys.model.session;

import lombok.*;
import java.util.*;

import com.vega.sys.model.Client;

import io.swagger.annotations.ApiModelProperty;

@Data
public class SessionItem {
    private String  token;
    private Long  userId;
    private String  username;
    private String  firstName;
    private String  lastName;
    private String  email;
    private List<String> roles;
    private Client  client;
}
