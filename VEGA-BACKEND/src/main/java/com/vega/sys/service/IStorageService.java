package com.vega.sys.service;



import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {
	
	Path store(MultipartFile file, String id, String type);
	Resource loadFile(String filename, String ressourceId, String type);
}
