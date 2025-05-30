// src/utils/generateImage.js
import axios from 'axios';

export const generateImageFromTitle = async (title) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `${title} 책 표지 스타일 일러스트`,
        n: 1,
        size: "512x512"
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error("이미지 생성 실패:", error);
    throw error;
  }
};
