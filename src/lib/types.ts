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
