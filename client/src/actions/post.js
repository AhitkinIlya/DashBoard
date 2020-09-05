import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types'

// GET posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// GET post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// add like
export const addLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// remove like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Delete psot
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`)

    dispatch({
      type: DELETE_POST,
      payload: postId
    })

    setAlert('Post Removed', 'success')
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Add psot
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/posts/', formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    setAlert('Post Created', 'success')
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    setAlert('Comment added', 'success')
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// DELETE comment
export const deleteComment = (postId, commentId) => async dispatch => {

  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    setAlert('Comment Removed', 'success')
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}