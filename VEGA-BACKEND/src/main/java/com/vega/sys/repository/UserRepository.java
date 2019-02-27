package com.vega.sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findOneByUsername(String userName);
    Optional<User> findOneByUsernameAndPassword(String username, String password);
}

