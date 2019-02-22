package com.vega.sys.service;



import java.io.File;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {
	
	Path storePages(MultipartFile file, String clientId,String catalogId, String type);
	Resource loadFile(String filename,  String clientId,String catalogId, String type);
	File[] getAllFiles(String clientId, String catalogId);
}
