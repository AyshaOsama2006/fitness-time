import { useCallback } from 'react';
import axios from 'axios';
import { API_URLS } from "./Constants.jsx";

export const useApi = () => {
  const postData = useCallback(async (url, data) => {
    try {
      // بنجيب التوكن من اللوكال ستوريج
      const token = localStorage.getItem('token');
      
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }, []);

  const getMeals = (data) => postData(API_URLS.meals, data);
  const getCalc = (data) => postData(API_URLS.calc, data);
  const getCalorieAnalysis = (data) => postData(API_URLS.calorie, data);

  return { getMeals, getCalc, getCalorieAnalysis };
};