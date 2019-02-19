package com.vega.sys.controller;


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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import com.vega.sys.domain.FolderConstant;
import com.vega.sys.service.IStorageService;

@Controller
@CacheConfig(cacheNames = "upload")
@CrossOrigin("*")
public class UploadController {
	

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	IStorageService storageService;
	


	
	@Value(value = "upload-folder")
	String uploadFolder;

	@CacheEvict(allEntries = true)
	@PostMapping("/post")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("id") Long id,@RequestParam("type") String type) {
		logger.info("==> handleFileUpload , fileName : {} ,  id : {} , type : {} ", file.getOriginalFilename(),id,type);
		String message = "";
		try {
			storageService.store(file,String.valueOf(id),type);
			
			if(FolderConstant.PAGE.getFolder().equalsIgnoreCase(type)) {
//				Ressource r = ressourceRepository.getOne(id);
//				r.setProfilePhoto(file.getOriginalFilename());
//				ressourceRepository.save(r);
			}

			

			message = "You successfully uploaded " + file.getOriginalFilename() + "!";
			logger.info("<== handleFileUpload , fileName : {} successfully uploaded", file.getOriginalFilename());
			return ResponseEntity.status(HttpStatus.OK).body(message);
		} catch (Exception e) {
			message = "FAIL to upload " + file.getOriginalFilename() + "!";
			logger.info("handleFileUpload , failed to upload : {}", file.getOriginalFilename());
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
		}
	}

	@Cacheable()
	@GetMapping("/getFile/{id}/{type}")
	public ResponseEntity<String> getFileFromRessourceDirectory(Model model,@PathVariable("id") Long id,@PathVariable("type") String type) {
		logger.debug("==> getFileFromRessourceDirectory  ,  id : {} , type : {} ",id,type);
		
		String fileDbName = null;
		
		if(FolderConstant.PAGE.getFolder().equalsIgnoreCase(type)) {
//			Ressource r = ressourceRepository.getOne(id);
//			fileDbName = r.getProfilePhoto();
		}
		String fileName = MvcUriComponentsBuilder.fromMethodName(UploadController.class, "getFile", fileDbName,id,type).build().toString();
		logger.debug("<== getFileFromRessourceDirectory  ,  id : {} , type : {}, filePath : {} ",id,type,fileName);
		
		return ResponseEntity.ok().body("\""+fileName+"\"");
	}

	@Cacheable()
	@GetMapping("/files/{filename:.+}/{id}/{type}")
	@ResponseBody
	public ResponseEntity<Resource> getFile(@PathVariable String filename,@PathVariable("id") Long id,@PathVariable("type") String type) {
		logger.debug("==> getFile  , filename : {},  id : {} , type : {} ",filename, id,type);
		Resource file = storageService.loadFile(filename,String.valueOf(id),type);
		
		logger.debug("<== getFile  , filename : {}",file.getFilename());
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}
	

}
