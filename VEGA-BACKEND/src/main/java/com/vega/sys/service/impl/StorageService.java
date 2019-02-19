package com.vega.sys.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.vega.sys.ConfigProperties;
import com.vega.sys.domain.FolderConstant;
import com.vega.sys.service.IStorageService;


@Service
public class StorageService implements IStorageService{
	Logger logger = LoggerFactory.getLogger(this.getClass().getName());
	
	@Autowired 
	ConfigProperties configPropeties;
	
	
	
	private String getPath(String id, String type ,String rootLocation) {
		if(FolderConstant.PAGE.getFolder().equalsIgnoreCase(type)) {
			return rootLocation+"/"+type+"/"+id;
		}else {
			return rootLocation+"/"+type+"/"+id;
		}
	}
	
	public Path store(MultipartFile file, String id, String type) {
		logger.info("==> StorageService.store() , type : {} , id : {} , fileName : {}",type,id,file.getOriginalFilename());
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		try {
			
			if(!Files.exists(rootLocation)) {
				logger.info("StorageService.store() , rootLocation  : {} doesn't exist" ,rootLocation );
				Files.createDirectories(rootLocation);
				logger.info("StorageService.store() , rootLocation  : {} created" ,rootLocation );
			}
			Path Foler =  Paths.get(getPath(id,type,configPropeties.getUploadFolder()));
			if(Files.exists(Foler)) {
				logger.info("StorageService.store() , rootLocation  : {} folder exist" ,rootLocation );
				deleteDirectoryRecursion(Foler);
				
			}			
			Files.createDirectories(Foler);
			Files.copy(file.getInputStream(), Foler.resolve(file.getOriginalFilename()));	
			logger.info("<== StorageService.store()");
			return Foler.resolve(file.getOriginalFilename());
			
		} catch (Exception e) {
			logger.error("StorageService.store() , rootLocation  : {} FAIL !" ,rootLocation );
			throw new RuntimeException("FAIL!");
		}
	}


	public Resource loadFile(String filename, String id, String type) {
		logger.debug("==> StorageService.loadFile() , type : {} , id : {} , fileName : {}",type,id,filename);
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		try {
			Path ressourceFolder =  Paths.get(getPath(id,type,configPropeties.getUploadFolder()));
			Path file = ressourceFolder.resolve(filename);
			
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				logger.debug("<== StorageService.loadFile()");
				return resource;
			} else {
				logger.error("StorageService.loadFile() , rootLocation  : {} FAIL !" ,rootLocation );
				throw new RuntimeException("FAIL!");
			}
		} catch (MalformedURLException e) {
			logger.error("StorageService.loadFile() , rootLocation  : {} FAIL MalformedURLException !" ,rootLocation );
			throw new RuntimeException("FAIL!");
		}
	}
	
	void deleteDirectoryRecursion(Path path) throws IOException {
		  if (Files.isDirectory(path, LinkOption.NOFOLLOW_LINKS)) {
		    try (DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
		      for (Path entry : entries) {
		        deleteDirectoryRecursion(entry);
		      }
		    }
		  }
		  Files.delete(path);
		}

	public void deleteAll() {
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	public void init() {
		try {
			final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
			Files.createDirectory(rootLocation);
		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}
}
