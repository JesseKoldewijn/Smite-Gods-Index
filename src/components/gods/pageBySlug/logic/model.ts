import { God } from '../../../../logic/gods/types/god';
import { parseHtmlString } from '../../../../logic/utils/html-parser';

export class GodsPageBySlugModel {
  static getTitle(god: God) {
    return `${god.attributes.Name} - Smite2Dex | Jereko`;
  }

  static getTruncedLore(god: God) {
    const plainTextLore = parseHtmlString(god.attributes?.Lore ?? '');

    return plainTextLore
      ? plainTextLore.length > 200
        ? plainTextLore.slice(0, 200) + '...'
        : plainTextLore
      : 'No lore available';
  }
}
