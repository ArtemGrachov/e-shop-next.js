export const getIdFromSlug = (slug?: string | null) => {
  console.log('handle!');
  
  if (slug == null) {
    return slug;
  }

  return slug.split('-').slice(-1)[0];
}
