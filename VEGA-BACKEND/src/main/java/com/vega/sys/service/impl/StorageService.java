package com.vega.sys.service.impl;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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
public class StorageService implements IStorageService {
	Logger logger = LoggerFactory.getLogger(this.getClass().getName());

	@Autowired
	ConfigProperties configPropeties;

	private String getPagesPath(String clientId, String catalogId, String type, String rootLocation) {
		return rootLocation + "/CLIENT_" + clientId + "/CATALOG_" + catalogId;

	}

	public Path storePages(MultipartFile file, String clientId, String catalogId, String type) {
		logger.info("==> StorageService.store() , type : {} , clientId : {}  , catalogId : {}, fileName : {}", type,
				clientId, catalogId, file.getOriginalFilename());
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		try {

			if (!Files.exists(rootLocation)) {
				logger.info("StorageService.store() , rootLocation  : {} doesn't exist", rootLocation);
				Files.createDirectories(rootLocation);
				logger.info("StorageService.store() , rootLocation  : {} created", rootLocation);
			}
			Path Foler = Paths.get(getPagesPath(clientId, catalogId, type, configPropeties.getUploadFolder()));
			if (!Files.exists(Foler)) {
				logger.info("StorageService.store() , Foler  : {} doesn't exist", Foler);
				Files.createDirectories(Foler);
				logger.info("StorageService.store() , Foler  : {} created", Foler);
			}
			Files.copy(file.getInputStream(), Foler.resolve(file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
			logger.info("<== StorageService.store()");
			return Foler.resolve(file.getOriginalFilename());

		} catch (Exception e) {
			logger.error("StorageService.store() , rootLocation  : {} FAIL : {}", rootLocation, e.getMessage());
			throw new RuntimeException("FAIL!");
		}
	}

	public Resource loadFile(String filename, String clientId, String catalogId, String type) {
		logger.debug("==> StorageService.loadFile() , type : {} , id : {} , fileName : {}", type, clientId, catalogId,
				filename);
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		try {
			Path ressourceFolder = Paths
					.get(getPagesPath(clientId, catalogId, type, configPropeties.getUploadFolder()));
			Path file = ressourceFolder.resolve(filename);

			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				logger.debug("<== StorageService.loadFile()");
				return resource;
			} else {
				logger.error("StorageService.loadFile() , rootLocation  : {} FAIL !", rootLocation);
				throw new RuntimeException("FAIL!");
			}
		} catch (MalformedURLException e) {
			logger.error("StorageService.loadFile() , rootLocation  : {} FAIL MalformedURLException !", rootLocation);
			throw new RuntimeException("FAIL!");
		}
	}

	public File[] getAllFiles(String clientId, String catalogId) {
		logger.debug("==> StorageService.loadFile() , clientId : {} ", clientId, catalogId);
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder());
		File[] listOfFiles;
		try {
			Path ressourceFolder = Paths
					.get(getPagesPath(clientId, catalogId, catalogId, configPropeties.getUploadFolder()));
			File folder = ressourceFolder.toFile();
			listOfFiles = folder.listFiles();
			return listOfFiles;
		} catch (Exception e) {
			logger.error("StorageService.loadFile() , rootLocation  : {} FAIL MalformedURLException !", rootLocation);
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
	
	public void deleteClientCatalog(String clientId, String catalogId) {
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder()+ "/CLIENT_" + clientId + "/CATALOG_" + catalogId);
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
	
	public void deleteClient(String clientId) {
		final Path rootLocation = Paths.get(configPropeties.getUploadFolder()+ "/CLIENT_" + clientId);
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
