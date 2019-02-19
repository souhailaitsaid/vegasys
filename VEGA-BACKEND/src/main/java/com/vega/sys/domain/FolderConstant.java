package com.vega.sys.domain;


public enum FolderConstant {
	PAGE("PAGE");
	
	FolderConstant(String folder) {
		this.folder = folder;
	}

	private final String folder;

	public String getFolder() {
		return folder;
	}

}
