package com.vega.sys.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import com.vega.sys.domain.FolderConstant;
import com.vega.sys.service.IStorageService;

@RestController
@CacheConfig(cacheNames = "upload")
@CrossOrigin("*")
public class UploadController {
	

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	IStorageService storageService;
	
	List<String> files = new ArrayList<String>();

	
	@Value(value = "upload-folder")
	String uploadFolder;
	

	@CacheEvict(allEntries = true)
	@PostMapping("/uploadFile")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("clientId") Long clientId,@RequestParam("catalogId") Long catalogId,@RequestParam("type") String type) {
		logger.info("==> handleFileUpload , fileName : {} ,  id : {} , type : {} ", file.getOriginalFilename(),catalogId,type);
		String message = "";
		try {
			storageService.storePages(file,String.valueOf(clientId),String.valueOf(catalogId),type);



			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			logger.info("<== handleFileUpload , fileName : {} successfully uploaded", file.getOriginalFilename());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			logger.info("handleFileUpload , failed to upload : {}", file.getOriginalFilename());
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	
	@GetMapping("/getallfiles/{clientId}/{catalogId}")
	public ResponseEntity<List<String>> getListFiles(@PathVariable("clientId") String clientId,@PathVariable("catalogId") String catalogId) {
		File [] files  = storageService.getAllFiles(clientId, catalogId);
		List<String> fileNames = files != null ?
				Arrays.asList(storageService.getAllFiles(clientId, catalogId))
				.stream().map(fileName -> MvcUriComponentsBuilder
						.fromMethodName(UploadController.class, "getFile",clientId,catalogId,fileName.getName()).build().toString())
				.collect(Collectors.toList()) : new ArrayList<>();
		return ResponseEntity.ok().body(fileNames);
	}
	
	
	@GetMapping("/files/{clientId}/{catalogId}/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable("clientId") String clientId,@PathVariable("catalogId") String catalogId,@PathVariable("filename") String filename) {
		Resource file = storageService.loadFile(filename,clientId,catalogId,filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
	

}
