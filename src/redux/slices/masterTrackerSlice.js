import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMasterTrackers = createAsyncThunk(
  "trackers/get",
  async ({
    page = 0,
    perPage = 5,
    sort = "desc",
    sortBy = "id",
    search = "",
  }) => {
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers/paging`,
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

export const fetchAllMasterTrackers = createAsyncThunk(
  "trackers/all",
  async () => {
    const res = await api.get(`${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers`);
    return res.data.data;
  }
);

export const getMasterTracker = createAsyncThunk("tracker/get", async (id) => {
  const res = await api.get(
    `${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers/${id}`
  );
  return res.data.data;
});

export const addMasterTracker = createAsyncThunk(
  "trackers/add",
  async (newMasterTracker) => {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers`,
      newMasterTracker
    );
    return res.data.data;
  }
);

export const updateMasterTracker = createAsyncThunk(
  "trackers/update",
  async (tracker) => {
    await api.put(`${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers`, tracker);
    return tracker;
  }
);

export const deleteMasterTracker = createAsyncThunk(
  "trackers/delete",
  async ({ id, deletedBy }) => {
    // axios.delete("", {
    //   params: {

    //   }
    // })
    const res = await api.put(`${process.env.NEXT_PUBLIC_MAIN_PATH}/trackers`, {
      id,
      isActive: true,
    });
    console.log("deleted", res.data);
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
    clearMasterTrackerDetail: (state) => {
      state.detail = null;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasterTrackers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMasterTrackers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMasterTrackers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchAllMasterTrackers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMasterTrackers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllMasterTrackers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getMasterTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMasterTracker.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.loading = false;
      })
      .addCase(getMasterTracker.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addMasterTracker.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addMasterTracker.fulfilled, (state, action) => {
        state.submitting = false;
      })
      .addCase(addMasterTracker.rejected, (state, action) => {
        state.error = action.error.message;
        state.submitting = false;
      })
      .addCase(updateMasterTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMasterTracker.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMasterTracker.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteMasterTracker.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMasterTracker.fulfilled, (state, action) => {
        state.data.items = state.data.items.filter(
          (p) => p.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteMasterTracker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMasterTrackerDetail, setPagination } = trackerSlice.actions;
export default trackerSlice.reducer;
