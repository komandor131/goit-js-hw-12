import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '54780845-41e3c81e8142d8214168add5e';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
