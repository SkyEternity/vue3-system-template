
import { defineStore } from 'pinia';
import { store } from '@/store';

interface SidebarState {
	collapse: boolean
}

export const sidebarStore = defineStore({
	id: 'sidebar',
	state: (): SidebarState => ({
		collapse: false, 
	}),
	getters: {

	},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		}
	},
});


export function useUserStoreWithOut() {
	return sidebarStore(store);
}



