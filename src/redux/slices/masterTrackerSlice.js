import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrackers = createAsyncThunk(
  "trackers/get",
  async ({
    page = 0,
    perPage = 5,
    sort = "DESC",
    sortBy = "order",
    search = "",
  }) => {
    const res = await api.get(`/api/v1/main/trackers/paging`, {
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

export const fetchAllTrackers = createAsyncThunk("trackers/all", async () => {
  const res = await api.get(`/api/v1/main/trackers`);
  return res.data.data;
});

export const getTracker = createAsyncThunk("tracker/get", async (id) => {
  const res = await api.get(`/api/v1/main/trackers/${id}`);
  return res.data.data;
});

export const addTracker = createAsyncThunk(
  "trackers/add",
  async (newTracker) => {
    const res = await api.post("/api/v1/main/trackers", newTracker);
    return res.data.data;
  }
);

export const updateTracker = createAsyncThunk(
  "trackers/update",
  async (tracker) => {
    const res = await api.put(`/api/v1/main/trackers`, tracker);
    return res.data.data;
  }
);

export const deleteTracker = createAsyncThunk(
  "trackers/delete",
  async ({ id, deletedBy }) => {
    await api.delete("/api/v1/main/trackers", {
      data: {
        id,
        deletedBy,
        doHardDelete: false,
      },
    });
    return id;
  }
);

const trackerSlice = createSlice({
  name: "tracker",
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
    clearTrackerDetail: (state) => {
      state.detail = null;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrackers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrackers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllTrackers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTrackers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllTrackers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTracker.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getTracker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTracker.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addTracker.fulfilled, (state, action) => {
        state.submitting = false;
        state.data.items.push(action.payload);
      })
      .addCase(addTracker.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      })
      .addCase(updateTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTracker.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTracker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTracker.fulfilled, (state, action) => {
        state.loading = false;
        state.data.items = state.data.items.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(deleteTracker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearTrackerDetail, setPagination } = trackerSlice.actions;
export default trackerSlice.reducer;
