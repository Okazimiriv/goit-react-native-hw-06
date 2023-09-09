import { createSlice, nanoid } from '@reduxjs/toolkit';

const postsInitialState = [
  // {
  //   id: '1',
  //   title: 'Ліс',
  //   img: photo1,
  //   commentsNumber: 8,
  //   location: 'Ivano-Frankivsk Region, Ukraine',
  //   region: {
  //     latitude: 48.36851,
  //     longitude: 24.39808,
  //   },
  // },
  // {
  //   id: '2',
  //   title: 'Захід на Чорному морі',
  //   img: photo2,
  //   commentsNumber: 3,
  //   location: 'Crimean Region, Ukraine',
  //   region: {
  //     latitude: 44.38843,
  //     longitude: 33.77988,
  //   },
  // },
  // {
  //   id: '3',
  //   title: 'Старий будиночок у Венеції',
  //   img: photo3,
  //   commentsNumber: 50,
  //   location: 'Venice, Italy',
  //   region: {
  //     latitude: 45.4386,
  //     longitude: 12.33177,
  //   },
  // },
];

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsInitialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare: (
        photoName,
        photoUri,
        commentsNumber = 0,
        locationName,
        coords
      ) => {
        return {
          payload: {
            id: nanoid(),
            title: photoName,
            img: photoUri,
            commentsNumber,
            location: locationName,
            region: coords,
          },
        };
      },
    },
    deletePost(state, action) {
      const index = state.findIndex(post => post.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
