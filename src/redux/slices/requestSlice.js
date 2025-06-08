import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRequests = createAsyncThunk(
  "requests/get",
  async ({
    page = 0,
    perPage = 5,
    sort = "DESC",
    sortBy = "order",
    search = "",
  }) => {
    const res = await api.get(`/api/v1/main/requests/paging`, {
      headers: {
        "X-PAGING-OFFSET": page * perPage,
        "X-PAGING-LIMIT": perPage,
        "X-PAGING-SORTBY": sortBy,
        "X-PAGING-SORTORDER": sort,
        "X-PAGING-SEARCH": search,
      },
    });
    return res.data.data;
  }
);

export const fetchAllRequests = createAsyncThunk("requests/all", async () => {
  const res = await api.get(`/api/v1/main/requests`);
  return res.data.data;
});

export const getRequest = createAsyncThunk("request/get", async (id) => {
  const res = await api.get(`/api/v1/main/requests/${id}`);
  return res.data.data;
});

export const addRequest = createAsyncThunk(
  "requests/add",
  async (newRequest) => {
    const res = await api.post("/api/v1/main/requests", newRequest);
    return res.data.data;
  }
);

export const updateRequest = createAsyncThunk(
  "requests/update",
  async (request) => {
    const res = await api.put(`/api/v1/main/requests`, request);
    return res.data.data;
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/delete",
  async ({ id, deletedBy }) => {
    await api.delete("/api/v1/main/requests", {
      data: {
        id,
        deletedBy,
        doHardDelete: false,
      },
    });
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
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRequest.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.submitting = false;
        state.data.items.push(action.payload);
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      })
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = state.data.items.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearRequestDetail, setPagination } = requestSlice.actions;
export default requestSlice.reducer;
