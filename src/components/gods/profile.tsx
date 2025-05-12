import type { God } from "../../logic/gods/types/god";
import { cn } from "../../logic/utils/cn";

interface GodProfileProps {
	god: God;
	isCard?: boolean;
	show?: {
		pantheon?: boolean;
		abilities?: boolean;
		lore?: boolean;
	};
}

export const GodProfile = ({
	god,
	isCard = true,
	show = {},
}: GodProfileProps) => {
	if (!god) return null;
	if (!god.attributes) return null;

	const {
		lore: showLore = false,
		abilities: showAbilities = false,
		pantheon: showPantheon = false,
	} = show;

	const { Name, Subtitle, Lore, Portrait, pantheon, Ability } =
		god.attributes;

	return (
		<div
			className={cn("flex gap-2", {
				"border p-4 min-w-0 w-max h-screen max-h-[580px]": isCard,
				"flex-col w-full": !isCard,
			})}
		>
			<div
				className={cn("flex", {
					"items-center justify-between flex-col gap-4 sm:flex-row":
						!isCard,
					"items-start flex-col gap-1": isCard,
				})}
			>
				<div
					className={cn("flex flex-col", {
						"gap-1 w-full text-center": isCard,
						"gap-2 items-start": !isCard,
					})}
				>
					<strong>{Name}</strong>
					<i>{Subtitle}</i>
				</div>

				<div
					className={cn("flex flex-col gap-2 items-center", {
						"w-full": isCard,
						"w-auto pb-10": !isCard,
					})}
				>
					{Portrait?.data.attributes.url && (
						<img
							src={Portrait.data.attributes.url}
							alt={`${Name} portrait`}
							height={Portrait.data.attributes.height ?? 200}
							width={Portrait.data.attributes.width ?? 200}
							className="rounded-md pt-1"
							loading="lazy"
						/>
					)}

					{showPantheon && (
						<div className="flex gap-2 items-center mx-auto h-full pt-1">
							{pantheon?.data?.attributes?.Image?.data?.attributes
								?.url && (
								<img
									src={
										pantheon.data.attributes.Image.data
											.attributes.url
									}
									alt={`${pantheon.data.attributes.Name} icon`}
									width={
										pantheon.data.attributes.Image.data
											.attributes.width
									}
									height={
										pantheon.data.attributes.Image.data
											.attributes.height
									}
									className="rounded-md w-auto h-8"
								/>
							)}
							{pantheon?.data?.attributes?.Name && (
								<span>{pantheon.data.attributes.Name}</span>
							)}
						</div>
					)}
				</div>
			</div>

			{showLore && (
				<div
					className="flex flex-col gap-2 pb-4"
					dangerouslySetInnerHTML={{ __html: Lore }}
				/>
			)}

			<GodProfileAbilities godAbilities={Ability} show={showAbilities} />
		</div>
	);
};

const GodProfileAbilities = ({
	godAbilities,
	show = false,
}: {
	godAbilities: God["attributes"]["Ability"];
	show?: boolean;
}) => {
	if (!godAbilities || !show) return null;

	return (
		<div>
			<strong>Abilities</strong>
			<div className="flex flex-col">
				{godAbilities &&
					Object.values(godAbilities).map((ability) => (
						<div
							key={ability.id}
							className="border-t py-2 flex gap-2"
						>
							{ability.Icon?.data?.attributes.url && (
								<img
									src={ability.Icon.data.attributes.url}
									alt={`${ability.Name} icon`}
									width={ability.Icon.data.attributes.width}
									height={ability.Icon.data.attributes.height}
									className="rounded-md w-20 h-20 my-auto border"
									loading="lazy"
								/>
							)}
							<div>
								<strong>
									{ability.Slot} - {ability.Name}
								</strong>
								<div
									dangerouslySetInnerHTML={{
										__html: ability.Description,
									}}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
