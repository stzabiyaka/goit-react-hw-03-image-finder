import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryContainer } from '.';

const ACCESS_KEY = '27723162-12c5df9d8fe49465a0d14715c';
const PER_PAGE = 12;
const initialState = { images: [], page: 1 };

export class ImageGallery extends Component {
  state = { ...initialState };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    if (prevQuery !== nextQuery) {
      this.setState({ ...initialState });
      fetch(
        `https://pixabay.com/api/?q=${nextQuery}&page=${this.state.page}&key=${ACCESS_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      )
        .then(response => response.json())
        .then(data => {
          const imagesBundle = data.hits;
          if (imagesBundle.length === 0) {
            toast.warning(
              'Sorry, there are no images, corresponding to your request.',
              { theme: 'colored' }
            );
            return;
          }
          this.setState({ images: [...this.state.images, ...imagesBundle] });
        });
    }
  }

  render() {
    const { onClick } = this.props;
    const { images } = this.state;
    return (
      <ImageGalleryContainer>
        {images.length !== 0 &&
          images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                imageUrl={image.webformatURL}
                imageAlt={image.id}
                LargeImageUrl={image.largeImageURL}
                onClick={onClick}
              />
            );
          })}
        {/* <ImageGalleryItem
          imageUrl="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730__340.jpg"
          imageAlt="black cat small"
          onClick={onClick}
        />
        <ImageGalleryItem
          imageUrl="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730__340.jpg"
          imageAlt="black cat small"
          onClick={onClick}
        />
        <ImageGalleryItem
          imageUrl="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730__340.jpg"
          imageAlt="black cat small"
          onClick={onClick}
        />
        <ImageGalleryItem
          imageUrl="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730__340.jpg"
          imageAlt="black cat small"
          onClick={onClick}
        /> */}
      </ImageGalleryContainer>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
