import axios from 'axios'
import {
    VIDEO_LIST_REQUEST,
    VIDEO_LIST_SUCCESS,
    VIDEO_LIST_FAIL,
    VIDEO_UPDATE_REQUEST,
    VIDEO_UPDATE_SUCCESS,
    VIDEO_UPDATE_FAIL,
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL
} from '../constants/videoConstants'

export const listVideos = () => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_LIST_REQUEST })
        const {data} = await axios.get('/videos/')
        dispatch({
            type: VIDEO_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:VIDEO_LIST_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        });
    }
}

// ✅ Update Video Action
export const updateVideo = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/videos/${id}/update/`, formData, config);

        dispatch({ type: VIDEO_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload: error.response?.data?.detail || error.message
        });
    }
};

// ✅ Delete Video Action
export const deleteVideo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_DELETE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`/videos/${id}/delete/`, config);

        dispatch({ type: VIDEO_DELETE_SUCCESS });

    } catch (error) {
        dispatch({
            type: VIDEO_DELETE_FAIL,
            payload: error.response?.data?.detail || error.message
        });
    }
};