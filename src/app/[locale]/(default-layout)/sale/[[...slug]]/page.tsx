import CatalogView, { generateMetadataWrap } from '@/views/catalog/view';

export default CatalogView({ sale: true});

export const generateMetadata = generateMetadataWrap({ sale: true });
