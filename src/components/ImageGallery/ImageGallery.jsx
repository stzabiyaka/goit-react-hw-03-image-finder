import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryContainer } from '.';

export function ImageGallery({ images, onClick }) {
  return (
    <ImageGalleryContainer>
      {images.length !== 0 &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageUrl={image.webformatURL}
              imageAlt={`${image.tags}. Author: ${image.user}`}
              onClick={() => onClick(image.id)}
            />
          );
        })}
    </ImageGalleryContainer>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
