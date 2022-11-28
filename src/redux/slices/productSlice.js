import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../api/product.service";

export const getProducts = createAsyncThunk(
  "product/get-list",
  async (page) => {
    try {
      return await productService.getProducts(page);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const productDetail = createAsyncThunk(
  "product/detail",
  async (slugId) => {
    try {
      const arrSlugId = slugId.split("-");
      return await productService.getProductDetail(
        arrSlugId[arrSlugId.length - 1]
      );
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const productSearch = createAsyncThunk(
  "product/search",
  async (data) => {
    try {
      return await productService.search(data);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const sortVivo = createAsyncThunk("sort/vivo", async (data) => {
  try {
    return await productService.sortVivo(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const sortIphone = createAsyncThunk("sort/iphone", async (data) => {
  try {
    return await productService.sortIphone(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const sortSamsung = createAsyncThunk("sort/samsung", async (data) => {
  try {
    return await productService.sortSamsung(data);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const searchProduct = createAsyncThunk(
  "categories/id",
  async (value) => {
    try {
      return await productService.searchProducts(value);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const searchPrice = createAsyncThunk("products/price", async (value) => {
  try {
    return await productService.searchPrice(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});
const initialState = {
  entities: [],
  loading: false,
  product: null,
  messageError: null,
  totalPage: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setNullMessageError: (state, action) => {
      console.log(action.payload);
      state.messageError = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    // Fetch list
    builder.addCase(getProducts.pending, (state, action) => {
      console.log("Pending getProducts ...");
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      console.log(`Fulfilled getProducts`);
      state.loading = false;

      const totalCount = action.payload.headers["x-total-count"];
      const arrPageNumber = [];
      const totalPage = Math.ceil(totalCount / 8);
      for (let index = 1; index <= totalPage; index++) {
        arrPageNumber.push(index);
      }
      state.totalPage = arrPageNumber;
      state.entities = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getProducts...`);
      state.loading = false;
    });

    //fetch detail
    builder.addCase(productDetail.pending, (state, action) => {
      console.log("Pending productDetail ...");
      state.loading = true;
    });
    builder.addCase(productDetail.fulfilled, (state, action) => {
      console.log(`Fulfilled productDetail`);
      state.loading = false;
      // console.log(action.payload);
      state.product = action.payload.data;
    });
    builder.addCase(productDetail.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected productDetail...`);
      state.loading = false;
    });

    // Search product
    builder.addCase(productSearch.pending, (state, action) => {
      // console.log("Pending productSearch ...");
      state.loading = true;
    });
    builder.addCase(productSearch.fulfilled, (state, action) => {
      console.log(`Fulfilled productSearch`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(productSearch.rejected, (state, action) => {
      // console.log(action.error);
      // console.log(`Rejected productSearch...`);
      state.loading = false;
      state.messageError = "Loi trong qua trinh tim kiem";
    });
    // sort Vivo

    builder.addCase(sortVivo.fulfilled, (state, action) => {
      console.log(`Fulfilled sort Vivo`);
      state.loading = false;
      state.entities = action.payload;
    });

    // sort Iphone

    builder.addCase(sortIphone.fulfilled, (state, action) => {
      console.log(`Fulfilled sort Iphone`);
      state.loading = false;
      state.entities = action.payload;
    });
    // sort Samsung

    builder.addCase(sortSamsung.fulfilled, (state, action) => {
      console.log(`Fulfilled sort samsung`);
      state.loading = false;
      state.entities = action.payload;
    });
    // searchProduct
    builder.addCase(searchProduct.pending, (state, action) => {
      console.log("Pending getCategories...");
      state.loading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      console.log(`Fulfilled getCategories`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCategories...`);
      state.loading = false;
    });
    // searchPrice
    builder.addCase(searchPrice.pending, (state, action) => {
      console.log("Pending searchPrice..");
      state.loading = true;
    });
    builder.addCase(searchPrice.fulfilled, (state, action) => {
      console.log(`FulfilledsearchPrice`);
      state.loading = false;

      state.entities = action.payload;
    });
    builder.addCase(searchPrice.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected searchPrice..`);
      state.loading = false;
    });
  },
});

export const { setNullMessageError } = productSlice.actions;

export default productSlice.reducer;
