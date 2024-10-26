export interface PhotoEntry {
	title?: string;
	description?: string;
	tags?: string[];
}

export interface FolderMetadata {
	title: string;
	description: string;
	date: string;
	tags: string[];
	photos: {
		[filename: string]: PhotoEntry;
	};
}

export interface PhotoMetadata {
	tags: string[];
	title?: string;
	description?: string;
	folderTitle: string;
	folderDescription: string;
	folderDate: string;
}

export interface Photo extends PhotoMetadata {
	key: string;
}
