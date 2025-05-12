export const SMITE2_GODS_ENDPOINT =
	"https://webcms.hirezstudios.com/smite2/api/gods";
export const SMITE2_GODS_ENDPOINT_PARAMS = {
	keys: {
		lng: "lng",
		"pagination[page]": "pagination[page]",
		"pagination[pageSize]": "pagination[pageSize]",
		"populate[0]": "populate[0]",
		"populate[1]": "populate[1]",
		"populate[2]": "populate[2]",
		"populate[3]": "populate[3]",
		"populate[4]": "populate[4]",
		"populate[5]": "populate[5]",
		"populate[6]": "populate[6]",
		"populate[7]": "populate[7]",
		"populate[8]": "populate[8]",
		"populate[9]": "populate[9]",
		"populate[10]": "populate[10]",
		"populate[11]": "populate[11]",
		"populate[12]": "populate[12]",
		"populate[13]": "populate[13]",
		"populate[14]": "populate[14]",
		"populate[15]": "populate[15]",
		"populate[16]": "populate[16]",
		"populate[17]": "populate[17]",
		"populate[18]": "populate[18]",
		"populate[19]": "populate[19]",
		"populate[20]": "populate[20]",
		"populate[21]": "populate[21]",
		"populate[22]": "populate[22]",
	},
	default: {
		lng: "en-US",
		"pagination[page]": 1,
		"pagination[pageSize]": 900,
		"populate[0]": "Ability",
		"populate[1]": "Ability.YouTubeLink",
		"populate[2]": "Ability.Buffs",
		"populate[3]": "Ability.Icon",
		"populate[4]": "Ability.Buffs.Icon",
		"populate[5]": "difficulty",
		"populate[6]": "HeaderImage",
		"populate[7]": "pantheon",
		"populate[8]": "pantheon.Image",
		"populate[9]": "pantheon.localizations",
		"populate[10]": "Portrait",
		"populate[11]": "roles",
		"populate[12]": "roles.gods",
		"populate[13]": "roles.gods.pantheon",
		"populate[14]": "roles.gods.pantheon.Image",
		"populate[15]": "roles.gods.Portrait",
		"populate[16]": "roles.Image",
		"populate[17]": "roles.localizations",
		"populate[18]": "Skin",
		"populate[19]": "Skin.Image",
		"populate[20]": "type",
		"populate[21]": "CommunityGuide",
		"populate[22]": "CommunityGuide.previewThumbnail",
	},
} as const;

export const getDefaultUrl = () => {
	const urlBase = new URL(SMITE2_GODS_ENDPOINT);
	Object.entries(SMITE2_GODS_ENDPOINT_PARAMS.default).forEach(
		([key, value]) => {
			urlBase.searchParams.append(key, value.toString());
		}
	);
	return urlBase.toString();
};
