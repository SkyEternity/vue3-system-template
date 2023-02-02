//纪要列表

import request from "@/utils/request"; 
export class ceshiApi {
	list(params: any, success: any, error: any): void {
		request.get(`/page/meetingAgendaCollect`, {
			params: {
				...params
			}
		}).then((res: any) => {
			res.code == 0?success(res.data):error(res.message)
		}).catch((err: any) => {
			error(err);
		});
	}
}
