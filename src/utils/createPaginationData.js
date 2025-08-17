import createHttpError from 'http-errors';

export const createPaginationData = (itemsCount, page, perPage) => {
  const totalPages = Math.ceil(itemsCount / perPage);

  if (page > totalPages && totalPages !== 0) {
    throw createHttpError(
      400,
      `Invalid page count. There ${
        totalPages === 1 ? 'is' : 'are'
      } ${totalPages} page${totalPages === 1 ? '' : 's'} available.`,
    );
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
