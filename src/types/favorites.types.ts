export interface Favorite {
	id: number;
	userId: string;
	subId: string;
	imageId: string;
	image: {
		id: string;
		url: string;
	};
	createdAt: string;
}
