import { IDom, parse } from "html-parse-string";

export const parseHtmlString = (lore: string) => {
	const iDom = parse(lore);

	const parseLoreInternal = (iDom: IDom[]) => {
		const getContent = (item: IDom) => {
			if (item.type === "text") {
				return item.content!;
			} else if (item.children) {
				return parseLoreInternal(item.children);
			}
			return "";
		};
		const contents: string[] = iDom.map(getContent);

		return contents.join("");
	};

	return parseLoreInternal(iDom);
};
