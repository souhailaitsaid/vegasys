package com.vega.sys.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vega.sys.model.Client;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.persistence.*;
import lombok.*;
import javax.validation.constraints.*;
import java.util.EnumSet;

@Entity
public class User {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter private Long userId;
	@Column(unique = true)
    @Getter @Setter private String username;
    @Getter @Setter private String password = "";
    @Getter @Setter private String company;
    @Getter @Setter private String firstName;
    @Getter @Setter private String lastName;
	@Column(unique = true)
    @Getter @Setter private String email;

    @JsonIgnore @Getter @Setter private int    securityProviderId;
    @JsonIgnore @Getter @Setter private int    defaultCustomerId;

    @JsonIgnore @Getter @Setter private String phone;
    @JsonIgnore @Getter @Setter private String address1;
    @JsonIgnore @Getter @Setter private String address2;
    @JsonIgnore @Getter @Setter private String country;
    @JsonIgnore @Getter @Setter private String postal;

    @Enumerated(EnumType.STRING)
    @Getter @Setter private Role role;

    //@JsonIgnore
    @JsonIgnore @Getter @Setter private boolean isActive;
    //@JsonIgnore
    @JsonIgnore @Getter @Setter private boolean isBlocked;
    @JsonIgnore @Getter @Setter private String  secretQuestion;
    @JsonIgnore @Getter @Setter private String  secretAnswer;
    @JsonIgnore @Getter @Setter private boolean enableBetaTesting;
    @JsonIgnore @Getter @Setter private boolean enableRenewal;
    
	@ManyToOne(optional = true, fetch = FetchType.LAZY)
	@Getter @Setter private Client client;

    public User(){
        this("new", "PASSWORD", Role.USER, "new", "new", true, "", "", "", "", "", "", "", "", true, false,"",null);
    }

    public User(String userId, String password, String firstName, String lastName){
        this(userId, password, Role.ADMIN, firstName, lastName, true, "", "", "", "", "", "", "", "", true, false,"",null);
    }

    public User(String userId, String password,String email, Role role, String firstName, String lastName,Client client){
        this(userId, password, role, firstName, lastName, true, "", "", "", "", "", "", "", "", true, false,email,client);
    }

    public User(String userId, String password, Role role, String firstName, String lastName, boolean isActive){
        this(userId, password, role, firstName, lastName, isActive, "", "", "", "", "", "", "", "", true, false,"",null);
    }

    public User(String username, String password, Role role, String firstName, String lastName, boolean isActive,
         String company, String phone, String address1, String address2, String country, String postal,
         String secretQuestion, String secretAnswer, boolean enableRenewal, boolean enableBetaTesting,String email,Client client){
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword((password));
        this.setRole(role);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setActive(isActive);
        this.setCompany(company);
        this.setPhone(phone);
        this.setAddress1(address1);
        this.setAddress2(address2);
        this.setCountry(country);
        this.setPostal(postal);
        this.setSecretQuestion(secretQuestion);
        this.setSecretAnswer(secretAnswer);
        this.setEnableRenewal(enableRenewal);
        this.setClient(client);
        this.setEnableBetaTesting(enableBetaTesting);
    }

    public String getFullName(){
        return this.firstName + this.lastName;
    }
}
