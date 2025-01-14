type FetchOptions = {
	data?: object;
	params?: Record<string, string | number>;
	multipart?: boolean;
	headers?: Record<string, string | number>;
};

export type FetchResult = {
	message: string;
	success: boolean;
};

export type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ResponseData = {
	yupError?: {};
	message: string;
	success: boolean;
	args?: any;
};

export const fetchApi = async <T = any>(method: FetchMethods, url: string, options?: FetchOptions): Promise<FetchResult & T> => {
	const _options: RequestInit = {
		method,
		headers: {
			...(options?.headers as any),
		},
	};

	let urlWithParams = url;

	if (options?.params) {
		const params = new URLSearchParams(options.params as Record<string, string>).toString();
		urlWithParams = `${url}?${params}`;
	}

	if (options?.multipart) {
		// Only assign the FormData object to the body
		_options.body = options.data as FormData;
	} else if (method !== "GET" && options?.data) {
		_options.headers = {
			..._options.headers,
			"Content-Type": "application/json",
		};
		_options.body = JSON.stringify(options.data);
	}

	const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${urlWithParams}`, _options);

	const data = (await response.json()) as ResponseData;

	if (data.yupError) {
		return {
			message: data.yupError.toString(),
			success: false,
		} as FetchResult & T;
	}

	return {
		message: data.message,
		success: data.success,
		...(data.args ? data.args : {}),
	} as FetchResult & T;
};
