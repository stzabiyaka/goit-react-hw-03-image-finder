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
      <GalleryItemImage src={imageUrl} alt={`Picture ${imageAlt}`} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.number.isRequired,
  LargeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
