package com.vega.sys;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.vega.sys.model.Catalog;
import com.vega.sys.model.Category;
import com.vega.sys.model.Client;
import com.vega.sys.model.Page;
import com.vega.sys.model.user.Role;
import com.vega.sys.model.user.User;
import com.vega.sys.repository.CatalogRepository;
import com.vega.sys.repository.CategoryRepository;
import com.vega.sys.repository.ClientRepository;
import com.vega.sys.repository.PageRepository;
import com.vega.sys.repository.UserRepository;

@Component
public class InitDataLoader implements ApplicationRunner {
	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ClientRepository clientRepository;

	@Autowired
	CatalogRepository catalogRepository;
	
	@Autowired
	PageRepository pageRepository;
	
	@Autowired
	UserRepository userRepository;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		Category c1 = categoryRepository.save(new Category(null, "CAT1", "Description of category 1"));
		Category c2 = categoryRepository.save(new Category(null, "CAT2", "Description of category 2"));
		Category c3 = categoryRepository.save(new Category(null, "CAT3", "Description of category 3"));
		Category c4 = categoryRepository.save(new Category(null, "CAT4", "Description of category 4"));
		Category c5 = categoryRepository.save(new Category(null, "CAT5", "Description of category 5"));
		Category c6 = categoryRepository.save(new Category(null, "CAT6", "Description of category 6"));

		Client cl1 = clientRepository.save(new Client(null, "Marjane", "Marjane vente gros & particulier",
				"marjane@marjane.marjane", 21260000009L, new HashSet<>(Arrays.asList(c1, c2, c3))));
		Client cl2 = clientRepository.save(new Client(null, "Carrefour", "Carrefour vente gros & particulier",
				"Carrefour@Carrefour.Carrefour", 212606546569L, new HashSet<>(Arrays.asList(c1, c5, c4, c6))));
		Client cl3 = clientRepository.save(new Client(null, "Asima", "Asima vente gros & particulier",
				"Asima@Asima.Asima", 2128888869L, new HashSet<>(Arrays.asList(c3, c4, c5, c6))));
		
		Client cl4 = clientRepository.save(new Client(null, "Electro Planet", "Electro Planet vente gros & particulier",
				"Electro@Electro.Electro", 2128888869L, new HashSet<>(Arrays.asList(c3, c4, c5, c6))));
		
		Client cl5 = clientRepository.save(new Client(null, "Atakadaw", "Atakadaw vente gros & particulier",
				"Atakadaw@Atakadaw.Atakadaw", 2128888869L, new HashSet<>(Arrays.asList(c3, c4, c5, c6))));
		
		Client cl6 = clientRepository.save(new Client(null, "Planet Sport", "Planet sport vente gros & particulier",
				"Planet@sport.Planet", 2128888869L, new HashSet<>(Arrays.asList(c3, c4, c5, c6))));

		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl1,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl1,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl1,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl1,"Catalog description"));

		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl2,"Catalog description"));

		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		Catalog ca1 =catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		/*pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));
		pageRepository.save(new Page(null, 1, "path1/path1", ca1));*/
		Catalog ca2 =catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		/*pageRepository.save(new Page(null, 1, "path1/path1", ca2));
		pageRepository.save(new Page(null, 1, "path1/path1", ca2));*/
		Catalog ca3 =catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		/*pageRepository.save(new Page(null, 1, "path1/path1", ca3));
		pageRepository.save(new Page(null, 1, "path1/path1", ca3));
		pageRepository.save(new Page(null, 1, "path1/path1", ca3));*/
		Catalog ca4 = catalogRepository.save(new Catalog(null, new Date(), new Date(), cl3,"Catalog description"));
		/*pageRepository.save(new Page(null, 1, "path1/path1", ca4));
		pageRepository.save(new Page(null, 1, "path1/path1", ca4));
		pageRepository.save(new Page(null, 1, "path1/path1", ca4));
		pageRepository.save(new Page(null, 1, "path1/path1", ca4));*/
		
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl4,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl4,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl4,"Catalog description"));
		
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl5,"Catalog description"));
		
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
		catalogRepository.save(new Catalog(null, new Date(), new Date(), cl6,"Catalog description"));
	
	
		userRepository.save(new User("admin", "admin","admin@admin",Role.ADMIN, "demo", "demo",null));
		 userRepository.save(new User("user", "user","user@user",Role.USER, "user", "user",cl1));
		 userRepository.save(new User("user5", "user5","user5@user5",Role.USER, "user5", "user5",cl5));
		 userRepository.save(new User("user2", "user2","user2@user2",Role.USER, "user2", "user2",cl2));
		 userRepository.save(new User("user3", "user3","user3@user3",Role.USER, "user3", "user3",cl3));
		 userRepository.save(new User("user4", "user4","user4@user4",Role.USER, "user4", "user4",cl4));
	}

}
