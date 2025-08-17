import createHttpError from 'http-errors';

export const createPaginationData = (itemsCount, page, perPage) => {
  const totalPages = Math.ceil(itemsCount / perPage);

  if (page > totalPages || page < 1) {
    throw createHttpError(400, 'Invalid page count');
  }

  return {
    page,
    perPage,
    totalItems: itemsCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};
