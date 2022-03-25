const PhotosReducer = (state, action) => {
  const operations = ["add", "first", "last", "prev", "next"];
  if (operations.includes(action.type)) {
    return { photos: [...action.data] };
  } else {
    return state;
  }
};
export default PhotosReducer;
