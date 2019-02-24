package com.vega.sys.identity;

import java.util.Date;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.vega.sys.model.user.Role;
import com.vega.sys.model.user.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenUtil {

    //private static final long VALIDITY_TIME_MS = 10 * 24 * 60 * 60 * 1000;// 10 days Validity
    private static final long VALIDITY_TIME_MS =  2 * 60 * 60 * 1000; // 2 hours  validity
    private static final String AUTH_HEADER_NAME = "Authorization";
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    private String secret="mrin";

    public Optional<Authentication> verifyToken(HttpServletRequest request) {
      final String token = request.getHeader(AUTH_HEADER_NAME);
      logger.info("verifyToken : {}", token);
      if (token != null && !token.isEmpty()){
        final TokenUser user = parseUserFromToken(token.replace("Bearer","").trim());
        if (user != null) {
        	 logger.info("parsed UserFromToken,  user : {}", user);
            return  Optional.of(new UserAuthentication(user));
        }
      }
      logger.info("empty UserFromToken");
      return Optional.empty();

    }

    //Get User Info from the Token
    public TokenUser parseUserFromToken(String token){

        Claims claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody();

        User user = new User();
        user.setUserId( (String)claims.get("userId"));
        user.setRole(Role.valueOf((String)claims.get("role")));
        if (user.getUserId() != null && user.getRole() != null) {
            return new TokenUser(user);
        } else {
            return null;
        }
    }

    public String createTokenForUser(TokenUser tokenUser) {
      return createTokenForUser(tokenUser.getUser());
    }

    public String createTokenForUser(User user) {
      return Jwts.builder()
        .setExpiration(new Date(System.currentTimeMillis() + VALIDITY_TIME_MS))
        .setSubject(user.getFullName())
        .claim("userId", user.getUserId())
        .claim("role", user.getRole().toString())
        .signWith(SignatureAlgorithm.HS256, secret)
        .compact();
    }

}
