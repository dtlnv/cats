export interface CatImage {
	id: string;
	url: string;
	width: number;
	height: number;
}

export interface CatImageData {
	image: CatImage;
	analysis: any;
	favouriteId: number | null;
}
