export const buildContactsFilter = (query) => {
  return {
    type: query.type,
    isFavourite: query.isFavourite,
  };
};
