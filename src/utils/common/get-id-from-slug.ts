export const getIdFromSlug = (slug?: string | null) => {
  if (slug == null) {
    return slug;
  }

  return slug.split('-').slice(-1)[0];
}
