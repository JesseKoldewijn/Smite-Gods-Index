import { getGodsListerPageData } from "../../components/gods/listerpage/data";
import { getGodSlug } from "../../logic/gods/utils/slug";
import { GodProfile } from "../../components/gods/profile";
import { parseHtmlString } from "../../logic/utils/html-parser";

const GodPage = async ({ godSlug }: { godSlug: string }) => {
	const { data } = await getData(godSlug);

	const title = `${data.attributes.Name} - Smite2Dex | Jereko`;

	const plainTextLore = parseHtmlString(data.attributes?.Lore ?? "");

	const truncedLore = plainTextLore
		? plainTextLore.length > 200
			? plainTextLore.slice(0, 200) + "..."
			: plainTextLore
		: "No lore available";

	return (
		<div className="flex flex-col gap-4 pt-40 pb-20">
			<title>{title}</title>
			<meta name="description" content={truncedLore} />
			<div className="max-w-xl">
				<GodProfile
					god={data}
					isCard={false}
					show={{
						pantheon: true,
						abilities: true,
						lore: true,
					}}
				/>
			</div>
		</div>
	);
};

export default GodPage;

const getData = async (slug: string) => {
	const godsData = await getGodsListerPageData();

	const god = godsData.gods.find(
		(god) => getGodSlug(god?.attributes?.Name) === slug
	);

	return {
		data: god!,
	};
};

export const getConfig = async () => {
	const godsData = await getGodsListerPageData();
	return {
		render: "static",
		staticPaths: godsData.gods.map((god) =>
			getGodSlug(god?.attributes?.Name)
		),
	};
};
