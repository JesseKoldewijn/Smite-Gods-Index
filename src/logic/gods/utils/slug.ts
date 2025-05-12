/**
 * The function `getGodSlug` takes a string as input, converts it to lowercase, replaces
 * non-alphanumeric characters with hyphens, and removes leading and trailing hyphens to create a slug.
 * @param {string} name - The `name` parameter is a string representing the name of a god.
 */
export const getGodSlug = (name: string) =>
	name
		?.toLocaleLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
