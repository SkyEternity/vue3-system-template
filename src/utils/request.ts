import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// import router from '@/router';   //所有的router
import { ElMessage } from 'element-plus';


// 设置获取 baseURL
const baseURL = 'api'
const token = localStorage.getItem('token')||''
const service = axios.create({
	baseURL,
	timeout: 60000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'OCS-APIRequest': true
	}
})


service.interceptors.request.use(
	// 发送请求之前拦截
	(config: any) => {
		if(token) {
			config.headers['Authorization'] = token
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		// 返回code值为200请求成功
		if (response.status === 200) return Promise.resolve(response.data);
		ElMessage.error(response.data.message);
		return Promise.reject(response.data);
	},
	(error: AxiosError) => {
		console.log(error);
		// 登陆过期
		if ((error.response as any).status == 401) {
			// router.push("/login");
			return Promise.reject('登陆已过期');
		} else {
			// 其他错误
			ElMessage.error((error.response as any).data.message);
			return Promise.reject(error);
		}
		
	}
)

export default service;