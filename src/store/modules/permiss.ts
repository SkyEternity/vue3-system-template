
import { defineStore } from 'pinia';
import { store } from '@/store';

interface ObjectList {
	[key: string]: string[];
}

export const permissStore = defineStore({
	id: 'permiss',
	state: () => {
		const keys = localStorage.getItem('ms_keys');
		return {
			key: keys ? JSON.parse(keys) : <string[]>[],
			defaultList: <ObjectList>{
				admin: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
				user: ['1', '2', '3', '11', '13', '14', '15']
			}
		};
	},
	actions: {
		handleSet(val: string[]) {
			this.key = val;
		}
	}
});


export function useUserStoreWithOut() {
	return permissStore(store);
}