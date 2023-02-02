import { defineStore } from 'pinia';
import { store } from '@/store';

interface TagState {
	name: string;
	path: string;
	title: string;
}


export const tagStore = defineStore({
	id: 'tag',
	state: () => {
		return {
			list: <TagState[]>[]
		};
	},
	getters: {
		show: state => {
			return state.list.length > 0;
		},
		nameList: state => {
			return state.list.map(item => item.name);
		}
	},
	actions: {
		delTagsItem(index: number) {
			this.list.splice(index, 1);
		},
		setTagsItem(data: TagState) {
			this.list.push(data);
		},
		clearTags() {
			this.list = [];
		},
		closeTagsOther(data: TagState[]) {
			this.list = data;
		},
		closeCurrentTag(data: any) {
			for (let i = 0, len = this.list.length; i < len; i++) {
				const item = this.list[i];
				if (item.path === data.$route.fullPath) {
					if (i < len - 1) {
						data.$router.push(this.list[i + 1].path);
					} else if (i > 0) {
						data.$router.push(this.list[i - 1].path);
					} else {
						data.$router.push('/');
					}
					this.list.splice(i, 1);
					break;
				}
			}
		}
	}
});


export function useUserStoreWithOut() {
	return tagStore(store);
}



