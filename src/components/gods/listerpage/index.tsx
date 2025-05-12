"use client";

import { useEffect, useState } from "react";
import { GodsList } from "../list";
import { godsListerDefaultValue, getGodsListerPageData } from "./data";

const GodsListerPage = ({
	buildTimeDefaultValue,
}: {
	buildTimeDefaultValue?: typeof godsListerDefaultValue;
}) => {
	const [isLoading, setIsLoading] = useState(!buildTimeDefaultValue);
	const [{ gods, godsResponseMeta }, setData] = useState<
		Awaited<ReturnType<typeof getGodsListerPageData>>
	>(buildTimeDefaultValue ?? godsListerDefaultValue);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getGodsListerPageData();
			setData(data);
		};

		fetchData().then(() => {
			setIsLoading(false);
		});
	}, []);

	if (isLoading)
		return (
			<div className="flex flex-col items-center justify-center w-full my-auto min-h-screen pt-40">
				<span className="-mt-40">Loading...</span>
			</div>
		);

	return (
		<div className="flex flex-col items-center w-full gap-5">
			<div>
				<p>
					Total Gods: {godsResponseMeta.pagination?.total} | Page:{" "}
					{godsResponseMeta.pagination?.page} | Page Size:{" "}
					{godsResponseMeta.pagination?.pageSize}
				</p>
			</div>
			<GodsList
				gods={{
					data: gods,
					meta: godsResponseMeta,
				}}
				instantMount={!!buildTimeDefaultValue}
			/>
		</div>
	);
};

export default GodsListerPage;
