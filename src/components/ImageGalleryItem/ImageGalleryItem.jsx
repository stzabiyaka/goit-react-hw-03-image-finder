import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  imageUrl,
  imageAlt,
  LargeImageUrl,
  onClick,
}) {
  return (
    <GalleryItem onClick={onClick}>
      <GalleryItemImage src={imageUrl} alt={imageAlt} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
