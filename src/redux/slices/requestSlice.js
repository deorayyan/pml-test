import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRequests = createAsyncThunk(
  "requests/get",
  async ({
    page = 0,
    perPage = 5,
    sort = "DESC",
    sortBy = "request_date",
    search = "",
  }) => {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_MAIN_PATH}/requests/paging`,
      {
        headers: {
          "X-PAGING-OFFSET": page * perPage,
          "X-PAGING-LIMIT": perPage,
          "X-PAGING-SORTBY": sortBy,
          "X-PAGING-SORTORDER": sort,
          "X-PAGING-SEARCH": search,
        },
      }
    );
    return res.data.data;
  }
);

export const fetchAllRequests = createAsyncThunk("requests/all", async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_MAIN_PATH}/requests`);
  return res.data.data;
});

export const getRequest = createAsyncThunk("request/get", async (id) => {
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_PATH}/requests/${id}`
  );
  return res.data.data;
});

export const addRequest = createAsyncThunk(
  "requests/add",
  async (newRequest) => {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_MAIN_PATH}/requests`,
      newRequest
    );
    return res.data.data;
  }
);

export const updateRequest = createAsyncThunk(
  "requests/update",
  async (request) => {
    await api.put(`${process.env.NEXT_PUBLIC_MAIN_PATH}/requests`, request);
    return request;
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/delete",
  async ({ id, deletedBy }) => {
    // axios.delete("", {
    //   params: {

    //   }
    // })
    const res = await api.put(`${process.env.NEXT_PUBLIC_MAIN_PATH}/requests`, {
      id,
      isActive: true,
    });
    console.log("deleted", res.data);
    return id;
  }
);

const requestSlice = createSlice({
  name: "request",
  initialState: {
    data: {},
    list: [],
    loading: false,
    submitting: false,
    detail: null,
    error: null,
    pagination: {
      page: 0,
      pageSize: 5,
      search: "",
      sort: "order",
      sortBy: "ASC",
    },
  },
  reducers: {
    clearRequestDetail: (state) => {
      state.detail = null;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.loading = false;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addRequest.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.submitting = false;
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.error = action.error.message;
        state.submitting = false;
      })
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.data.items = state.data.items.filter(
          (p) => p.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearRequestDetail, setPagination } = requestSlice.actions;
export default requestSlice.reducer;
