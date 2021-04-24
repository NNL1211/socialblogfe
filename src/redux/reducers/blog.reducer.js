const initialState = {
  blogs: [],
  loading: false,
  error: "",
  singleBlog: [],
  comment: [],
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "BLOG_REQUEST_START":
    case "SINGLEBLOG_REQUEST_START":
      state.loading = true;
      break;
    case "BLOG_REQUEST_FAIL":
    case "SINGLEBLOG_REQUEST_FAIL":
      state.error = payload;
      state.loading = false;
      break;
    case "BLOG_REQUEST_SUCCESS":
      state.blogs = payload;
      state.loading = false;
      break;
    case "SINGLEBLOG_REQUEST_SUCCESS":
      state.singleBlog = payload;
      state.loading = false;
      break;
    default:
      break;
  }

  return { ...state };
};

export default blogReducer;
