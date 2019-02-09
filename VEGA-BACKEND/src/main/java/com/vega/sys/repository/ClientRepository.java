package com.vega.sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vega.sys.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}