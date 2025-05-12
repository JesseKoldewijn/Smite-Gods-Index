export type PantheonName =
	| "Egyptian"
	| "Roman"
	| "Celtic"
	| "Greek"
	| "Maya"
	| "Norse"
	| "Japanese"
	| "Chinese"
	| "Arthurian"
	| "Yoruba"
	| "VooDoo"
	| "Polynesian"
	| "Tales of Arabia"
	| "Hindu";

type PantheonAttributes = {
	Name: PantheonName;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: string;
	localizations: {
		data: any;
	};
	Image: PantheonImage;
};

type PantheonImage = {
	data: {
		id: number;
		attributes: PantheonImageAttributes;
	};
};

type PantheonImageAttributes = {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: PantheonImageAttributeFormats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: any;
	createdAt: string;
	updatedAt: string;
};

type PantheonImageAttributeFormats = {
	thumbnail: {
		name: string;
		hash: string;
		ext: string;
		mime: string;
		path: string | null;
		width: number;
		height: number;
		size: number;
		url: string;
	};
};

export type Pantheon = {
	data: { attributes: PantheonAttributes };
};
