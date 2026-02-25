import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputEl = formEl.elements['search-text'];
const loadMoreBtnEl = document.querySelector('.load-more');
const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

formEl.addEventListener('submit', handleFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);

async function handleFormSubmit(event) {
  event.preventDefault();

  const query = inputEl.value.trim();

  if (!query) {
    iziToast.error({
      position: 'topRight',
      message: 'Please enter a search query.',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;
    totalHits = data.totalHits;

    if (!images.length) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(images);
    updateLoadMoreVisibility();
  } catch {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
}

async function handleLoadMoreClick() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    if (!images.length) {
      showEndOfResultsMessage();
      return;
    }

    createGallery(images);
    smoothScrollByTwoCards();
    updateLoadMoreVisibility();
  } catch {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

function updateLoadMoreVisibility() {
  const totalPages = Math.ceil(totalHits / PER_PAGE);

  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    showEndOfResultsMessage();
    return;
  }

  showLoadMoreButton();
}

function showEndOfResultsMessage() {
  iziToast.info({
    position: 'topRight',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function smoothScrollByTwoCards() {
  const cardEl = document.querySelector('.gallery-item');

  if (!cardEl) {
    return;
  }

  const cardHeight = cardEl.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
