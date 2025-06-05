import { God } from '../types/god';

export const sortGods = (
  gods: God[],
  opts?: {
    sortBy?: keyof God['attributes'];
    sortOrder?: 'asc' | 'desc';
  }
) => {
  const { sortBy = 'Name', sortOrder = 'asc' } = opts || {};

  return gods.sort((a, b) => {
    const aValue = a.attributes[sortBy];
    const bValue = b.attributes[sortBy];

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
