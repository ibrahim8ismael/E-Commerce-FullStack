// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   products: [],
//   product: null,
//   loading: false,
//   error: null,
//   page: 1,
//   pages: 1,
// };

// export const fetchProducts = createAsyncThunk(
//   'product/fetchProducts',
//   async ({ keyword = '', pageNumber = '', category = '', featured = false }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&featured=${featured}`
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     }
//   }
// );

// export const fetchProductDetails = createAsyncThunk(
//   'product/fetchProductDetails',
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`/api/products/${id}`);
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message
//       );
//     }
//   }
// );

// export const likeProduct = createAsyncThunk(
//   'product/likeProduct',
//   async ({ id, token }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.put(`/api/products/${id}/like`, {}, config);
//       return { id, likes: data.likes };
//     } catch (error) {
//       return re