import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders,updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0
};
//we may need more info of current order

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
        } else {
          // Handle unexpected response
          console.error('Unexpected response from createOrderAsync');
        }
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'error';
        console.error('Error creating order:', action.error);
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        if (action.payload && action.payload.orders) {
          state.status = 'idle';
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.totalOrders;
        } else {
          // Handle unexpected response
          console.error('Unexpected response from fetchAllOrdersAsync');
        }
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = 'error';
        console.error('Error fetching orders:', action.error);
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.orders.findIndex((order) => order.id === action.payload.id);
          if (index !== -1) {
            state.orders[index] = action.payload;
          } else {
            // Handle order not found
            console.error('Order not found:', action.payload.id);
          }
          state.status = 'idle';
        } else {
          // Handle unexpected response
          console.error('Unexpected response from updateOrderAsync');
        }
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = 'error';
        console.error('Error updating order:', action.error);
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
