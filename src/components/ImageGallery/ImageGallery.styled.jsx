import styled from '@emotion/styled';

export const ImageGalleryContainer = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 0;
  padding-right: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
