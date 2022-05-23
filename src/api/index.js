
import request from '@/utils/request.js'
import { getStorage } from '@/utils/storage.js'
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
export const getAllChannelsAPI = () =>
  request({
    url: '/v1_0/channels',
    method: 'GET'
  })

export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

export const reportArticleAPI = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type: type,
    remark: ''
  }
})

export const updateChannelsAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})
export const removeChannelAPI = ({ channelId }) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
export const suggestListAPI = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keywords
  }
})

export const searchResultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})

export const detailAPI = ({ artId }) => request({
  url: `/v1_0/articles/${artId}`
})

export const userFollowedAPI = ({ userId }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})

export const userUnFollowedAPI = ({ userId }) => request({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
})

export const likeArticleAPI = ({ userId }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: userId
  }
})

export const disLikeArticleAPI = ({ userId }) => request({
  url: `/v1_0/article/likings/${userId}`,
  method: 'DELETE'
})

export const commentsListAPI = ({ id, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type: 'a',
    source: id,
    offset,
    limit
  }
})

export const commentLikingAPI = ({ comId }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: comId
  }
})

export const commentDisLikingAPI = ({ comId }) => request({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'DELETE'
})

export const commentSendAPI = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

export const userProFileAPI = () => request({
  url: '/v1_0/user/profile',
  method: 'GET'
})

export const getUserInfoAPI = () => request({
  url: '/v1_0/user',
  method: 'GET'
})

export const updateUserPhotoAPI = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd
})

export const updateUserProfileAPI = (dataObj) => {
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete dataObj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
    // {
    //   name,
    //   gender,
    //   birthday,
    //   intro
    // }
  })
}

export const getNewTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: 'Bearer ' + getStorage('refresh_token')
  }
})
