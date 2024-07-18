export interface BuTree {
	key: string;
	label?: string;
	data?: any;
	imagePath?: string;
	// icon: string;
	children?: [key?: string, label?: string, data?: any, imagePath?: string, children?: any[]];
}
