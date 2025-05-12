"use client";

import { useEffect, useState } from "react";
import { GodsResponse } from "../../logic/gods/types/god";
import { GodProfile } from "./profile";
import { Link } from "waku";
import { getGodSlug } from "../../logic/gods/utils/slug";
import { sortGods } from "../../logic/gods/utils/sort";

interface GodsListProps {
	gods: GodsResponse;
}

export const GodsList = ({
	gods: ssrGods,
	instantMount = false,
}: GodsListProps & {
	gods: GodsResponse;
	instantMount?: boolean;
}) => {
	const [isMounted, setIsMounted] = useState(instantMount);
	const [show, setShow] = useState({
		showAttributes: {
			pantheon: true,
		},
	});

	const gods = sortGods(ssrGods.data, {
		sortBy: "Name",
		sortOrder: "asc",
	});

	const [amountLimit, setAmountLimit] = useState(12);

	const [limitedGods, setLimitedGods] = useState(() =>
		gods.slice(0, amountLimit)
	);

	const handleLimit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const target = event.target as HTMLButtonElement;
		const isButton = target.tagName === "BUTTON";

		let currentTarget = target;
		if (!isButton) {
			currentTarget = target.closest("button") as HTMLButtonElement;
		}
		const all =
			currentTarget.getAttribute("data-trigger-get-all") === "true";

		if (all === true) {
			setLimitedGods(gods);
			setAmountLimit(gods.length);
			return;
		}

		const newAmount = limitedGods.length + 12;
		const reachedLimit = newAmount >= gods.length;

		if (reachedLimit) {
			setLimitedGods(gods);
			setAmountLimit(gods.length);
			return;
		}

		setAmountLimit(newAmount);
		setLimitedGods(gods.slice(0, newAmount));
	};

	useEffect(() => {
		const showAllQuery = new URLSearchParams(window.location.search).get(
			"showAll"
		);
		if (showAllQuery === "true") {
			setLimitedGods(gods);
			setAmountLimit(gods.length);
		}
		setShow((prev) => ({
			...prev,
			showAttributes: {
				...prev.showAttributes,
				pantheon: true,
			},
		}));
		setTimeout(() => {
			setIsMounted(true);
		}, 200);
	}, []);

	return (
		<div
			className="flex flex-col items-center w-full pb-10 min-h-screen"
			style={{
				opacity: isMounted ? 1 : 0,
				transition: "opacity 0.5s ease-in-out",
			}}
		>
			<div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center py-5">
				{limitedGods.map((god) => {
					if (!god) return null;
					return (
						<Link
							key={god.id}
							to={`/god/${getGodSlug(god.attributes.Name)}`}
						>
							<GodProfile
								god={god}
								show={{
									pantheon: show.showAttributes.pantheon,
								}}
							/>
						</Link>
					);
				})}

				<div className="fixed bottom-5 left-3 border bg-background text-foreground p-2 rounded-md">
					<span className="sr-only">
						Showing now {limitedGods.length} of {gods.length} gods
					</span>
					{limitedGods.length} / {gods.length} gods
				</div>

				<button
					className="bg-background fixed bottom-25 right-3 border flex flex-col p-2 max-w-20 max-h-20 text-foreground rounded-md cursor-pointer disabled:pointer-events-none"
					onClick={handleLimit}
					disabled={limitedGods.length >= gods.length}
					style={{
						display:
							limitedGods.length >= gods.length ? "none" : "",
					}}
					data-trigger-get-all="true"
				>
					<div className="max-w-20 max-h-20 flex flex-col">
						<span className="sr-only">Show all gods</span>
						<span className="max-w-10">Load All</span>
					</div>
				</button>

				<button
					className="bg-background fixed bottom-5 right-3 border flex flex-col p-2 max-w-20 max-h-20 text-foreground rounded-md cursor-pointer disabled:pointer-events-none"
					onClick={handleLimit}
					disabled={limitedGods.length >= gods.length}
				>
					<div
						style={{
							display:
								limitedGods.length >= gods.length ? "none" : "",
						}}
						className="max-w-20 max-h-20 flex flex-col"
					>
						<span className="sr-only">Show more gods</span>
						<span className="max-w-10">Load More</span>
					</div>
					<div
						style={{
							display:
								limitedGods.length >= gods.length ? "" : "none",
						}}
						className="max-w-20 max-h-20 flex flex-col"
					>
						<span className="sr-only">
							Showing all available gods
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="checkmark"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							width="22"
							height="22"
						>
							<path d="M20 6L9 17l-5-5" />
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
};
