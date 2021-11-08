import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { PayloadAction } from '@reduxjs/toolkit';

const apiUrl = 'https://fakestoreapi.com/products';

//API calling
export const getProductAPI = createAsyncThunk('product-search/list', async () => {
  const requestUrl = `${apiUrl}`;
  return axios.get(requestUrl);
});
// search or filter
// console.log("get  prodt",getProductAPI);

// Slicer
export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState: {
    value: null,
  },
  reducers: {
    view_product(state, action: PayloadAction) {
      state.value = action.payload;
    },
  },
});

export const { view_product } = productSearchSlice.actions;
export default productSearchSlice.reducer;

// export const productSearchSlice = createEntitySlice({
//     name: 'contact',
//     initialState:{
//                  product :null
//            },
//     extraReducers(builder) {
//       builder
//         .addCase(getEntity.fulfilled, (state, action) => {
//           state.loading = false;
//           state.product = action.payload.data;
//         })

//     },
//   });
