import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Application } from 'components/App';
import { Modal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    showLoader: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setSearchQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { showModal, searchQuery } = this.state;
    return (
      <Application>
        {showModal && (
          <Modal
            imageUrl="https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_960_720.jpg"
            imageAlt="black cat"
            onClose={this.toggleModal}
          />
        )}
        <Searchbar onSubmit={this.setSearchQuery} />
        <ImageGallery searchQuery={searchQuery} onClick={this.toggleModal} />
        <ToastContainer autoClose={3000} />
      </Application>
    );
  }
}
