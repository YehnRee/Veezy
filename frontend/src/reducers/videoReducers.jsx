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

export const videoListReducer = (state={videos: []}, action) => {
    switch(action.type) {
        case VIDEO_LIST_REQUEST:
            return {loading: true, videos: []}
        case VIDEO_LIST_SUCCESS:
            return {loading: false, videos: action.payload}
        case VIDEO_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};

export const videoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_UPDATE_REQUEST:
            return { loading: true };
        case VIDEO_UPDATE_SUCCESS:
            return { loading: false, success: true, video: action.payload };
        case VIDEO_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const videoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_DELETE_REQUEST:
            return { loading: true };
        case VIDEO_DELETE_SUCCESS:
            return { loading: false, success: true };
        case VIDEO_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};