import axios from 'axios';

const API_BASE = process.env.REACT_APP_WEB_SEVER_API;
const IMAGE_URL = `${API_BASE}/upload_image`;

export const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = {
    type: 'image/jpeg'
  };

  return new File([data], filename, metadata);
}

export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(IMAGE_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return response?.data?.imageUrl;
  } catch (e) {
    console.error("Error in uploadImage: " + e);
  }
}
