import { getGods } from "../../../logic/gods/handlers";
import { GodsResponse } from "../../../logic/gods/types/god";

export const godsListerDefaultValue = {
	gods: [] as GodsResponse["data"],
	godsResponseMeta: {
		pagination: {
			total: 0,
			page: 0,
			pageSize: 0,
			pageCount: 0,
		},
	},
};

const getFallbackData = async () => {
	const isServer = typeof window === "undefined";

	if (isServer) {
		return (await import(
			"../../../../public/data/fallback-response.json"
		).then((module) => module.default)) as GodsResponse;
	}
	return (await fetch(`/data/fallback-response.json`).then((res) => {
		if (!res.ok) {
			console.error(
				"Failed to fetch fallback data. Please check the file path.",
				res.status
			);
			return {
				data: [],
				meta: {
					pagination: {
						total: 0,
						page: 0,
						pageSize: 0,
						pageCount: 0,
					},
				},
			} as GodsResponse;
		}
		return res.json();
	})) as GodsResponse;
};

type GetGodsReturnType = Awaited<ReturnType<typeof getGods>>;

const getGodData = async () => {
	const isServer = typeof window === "undefined";

	if (isServer) {
		return await getGods({
			page: 1,
			pageSize: 900,
		});
	}

	const godsDataExpiry = localStorage.getItem("godsDataExpiry");
	const currentTime = new Date().getTime();
	const expiry = godsDataExpiry ? parseInt(godsDataExpiry) : 0;
	const isExpired = godsDataExpiry ? currentTime > expiry : true;

	if (!isExpired) {
		const hasCachedData = localStorage.getItem("godsData");
		const cachedData = JSON.parse(hasCachedData ?? "{}");
		const hasCorrectShape = cachedData
			? cachedData?.data?.data?.length > 0 &&
			  cachedData?.data?.meta?.pagination
			: false;

		if (hasCachedData && hasCorrectShape) {
			return JSON.parse(hasCachedData) as GetGodsReturnType;
		}
	}

	localStorage.removeItem("godsData");
	localStorage.removeItem("godsDataExpiry");

	const response = await getGods({
		page: 1,
		pageSize: 900,
	});

	const newExpiryTime = new Date().getTime() + 1000 * 60 * 60 * 24; // 1 day

	localStorage.setItem("godsData", JSON.stringify(response));
	localStorage.setItem("godsDataExpiry", newExpiryTime.toString());
	return response;
};

export const getGodsListerPageData = async () => {
	const response = await getGodData();
	const fallbackData = await getFallbackData();

	const { data: godsResponse } = response;

	let godsResponseData = godsResponse?.data;
	godsResponseData ??= fallbackData.data;

	let godsResponseMeta = godsResponse?.meta;
	godsResponseMeta ??= fallbackData.meta as Omit<
		GodsResponse["meta"],
		"undefined"
	>;

	return {
		gods: godsResponseData,
		godsResponseMeta,
	};
};
