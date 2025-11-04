import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export interface Inspiration {
  id: string;
  image: string;
  title: string;
}

export interface Model {
  id: string;
  name: string;
  image: string;
  description?: string;
}

interface ArtState {
  prompt: string;
  inspirations: Inspiration[];
  models: Model[];
  selectedModel: string | null;
  isLoadingModels: boolean;
  error: string | null; 
  loading?: boolean;
  isLoadingImage: boolean;
  generatedImage: string | null; 
}

const initialState: ArtState = {
  prompt: '',
  inspirations: [],
  models: [],
  selectedModel: null,
  isLoadingModels: false,
  isLoadingImage:false,
  generatedImage: null,

  error: null,
};

export const fetchInspirations = createAsyncThunk<Inspiration[]>(
  'art/fetchInspirations',
  async () => {
    const response = await axios.get<Inspiration[]>('/api/inspiration')
    return response.data.map((item) => ({
      ...item,
      image: item.image,
      id: item.id,
      title: item.title,
    }))
  }
)




export const fetchModels = createAsyncThunk<Model[]>(
  "art/fetchModels",
  async () => {
    const response = await axios.get<Model[]>("/api/models"); 
    return response.data.map((item) => ({
      ...item,
      image: item.image,
    }));
  }
);




// export const generateImage = createAsyncThunk(
//   "art/generateImage",
//   async ({ prompt, model }: { prompt: string; model: string }) => {
//     const response = await axios.post(`/api/generate`, { prompt, model });
//     console.log("generateImage response:", response.data);
//     return response.data.image; 
//   }
// );


export const generateImage = createAsyncThunk(
  "art/generateImage",
  async ({ prompt, model }: { prompt: string; model: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/generate`, { prompt, model });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data.image;
    } catch (error: any) {
      console.error("generateImage error:", error);
      return rejectWithValue(error.response?.data?.error || "Server error while generating image");
    }
  }
);


















const artSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      console.log("setting user prompt", action.payload);
      state.prompt = action.payload
    },
    fetchInspirations: (state, action: PayloadAction<Inspiration[]>) => {
      state.inspirations = action.payload
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModels.pending, (state) => {
        state.isLoadingModels = true;
      })
      .addCase(generateImage.pending, (state) => {
        state.isLoadingImage = true;
        state.error = null;
        state.generatedImage = null;
      })
       .addCase(generateImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoadingImage = false;
        state.generatedImage = action.payload;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.isLoadingImage = false;
        state.error = action.payload as string;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.isLoadingModels = false;
        console.error("Error fetching models:", action.error.message);
      })
      .addCase(fetchModels.fulfilled, (state, action: PayloadAction<Model[]>) => {
        state.isLoadingModels = false;
        state.models = action.payload;
      }).addCase(fetchInspirations.fulfilled, (state, action: PayloadAction<Inspiration[]>) => {
        state.isLoadingModels = false;
        state.inspirations = action.payload;
      })
      .addCase(fetchInspirations.pending, (state) => {
        state.loading = true
        state.error = null
      });
    
     
  },
})

export const { setPrompt, setSelectedModel } = artSlice.actions
export default artSlice.reducer