import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Application } from 'components/App';
import { Modal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from 'components/Button';
import fetchImagesBundle from 'services/fetch-images-bundle';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    error: null,
    page: 1,
    totalImages: 0,
    activeImageIndex: null,
    showModal: false,
    showLoader: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ images: [], page: 1, totalImages: 0 });
      const result = await this.getImages({ query: nextQuery });

      if (result.hits.length === 0) {
        toast.warning(
          'Sorry, there are no images, corresponding to your request.'
        );
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...result.hits],
        totalImages: result.totalHits,
      }));
      toast.info(
        `Hooray, we have found ${this.state.totalImages} images for you.`
      );
    }

    if (prevPage !== nextPage) {
      const result = await this.getImages({ query: nextQuery });
      this.setState(prevState => ({
        images: [...prevState.images, ...result.hits],
      }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setSearchQuery = query => {
    this.setState({ searchQuery: query });
  };

  showNextPage = () => {
    const { page, totalImages } = this.state;
    const totalPages = Math.ceil(totalImages / 12);
    if (page < totalPages) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  showActiveImage = id => {
    const index = this.state.images.findIndex(image => image.id === id);
    this.setState({ activeImageIndex: index });
    this.toggleModal();
  };

  setShowLoader = value => {
    this.setState({ showLoader: value });
  };

  getImages = async ({ query }) => {
    this.setState({ showLoader: true });
    try {
      const result = await fetchImagesBundle({ query, page: this.state.page });
      const hits = result.hits.map(element => {
        return {
          id: element.id,
          webformatURL: element.webformatURL,
          tags: element.tags,
          user: element.user,
          largeImageURL: element.largeImageURL,
        };
      });
      const totalHits = result.totalHits;
      return { hits, totalHits };
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Error occured ${this.state.error}`);
    } finally {
      this.setState({ showLoader: false });
    }
  };

  render() {
    const { showModal, searchQuery, showLoader, images, activeImageIndex } =
      this.state;
    const currentImage = images[activeImageIndex];
    return (
      <Application>
        {showModal && (
          <Modal
            imageUrl={currentImage.largeImageURL}
            imageAlt={`${currentImage.tags}. Author: ${currentImage.user}`}
            onClose={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.setSearchQuery} />
        {searchQuery && (
          <ImageGallery
            images={this.state.images}
            onClick={this.showActiveImage}
          />
        )}
        {showLoader && (
          <ThreeCircles
            height="100"
            width="100"
            outerCircleColor="#301bf5"
            middleCircleColor="#311bf5e1"
            innerCircleColor="#311bf58f"
            ariaLabel="three-circles-rotating"
          />
        )}
        {images.length !== 0 && (
          <Button onClick={this.showNextPage} disabled={showLoader} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </Application>
    );
  }
}
