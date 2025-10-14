import CatalogView, { generateMetadataWrap } from '@/views/catalog/view';

export default CatalogView({ sale: true});

export { generateMetadataWrap } from '@/views/catalog/view';

export const generateMetadata = generateMetadataWrap({ sale: true });
