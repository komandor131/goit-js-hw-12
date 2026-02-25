import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-wrapper');
const loadMoreBtnEl = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createCardMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
      </a>
      <ul class="image-stats">
        <li class="image-stat">
          <span class="image-stat-label">Likes</span>
          <span class="image-stat-value">${likes}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Views</span>
          <span class="image-stat-value">${views}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Comments</span>
          <span class="image-stat-value">${comments}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Downloads</span>
          <span class="image-stat-value">${downloads}</span>
        </li>
      </ul>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(createCardMarkup).join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.add('is-visible');
}

export function hideLoader() {
  loaderEl.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreBtnEl.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreBtnEl.classList.remove('is-visible');
}
