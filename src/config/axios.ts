import axios from 'axios'

const appId = 'j9axJFppVxGKVqbJzyk6PS8a'
const appSecret = 'qejUzVXeKZqEQMZPzjWeG9UN'

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    timeout: 5000,
    headers: {
        't-app-id':appId,
        't-app-secret':appSecret
    }
  });

instance.interceptors.request.use((config:any)=>{
    const xToken = localStorage.getItem('x-token')
    if(xToken){
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config
},(error:any)=>{
    console.log(error)
    return Promise.reject(error)
})

instance.interceptors.response.use((response)=>{
    if(response.headers['x-token']){
        localStorage.setItem('x-token',response.headers['x-token'])
    }
    return response
},(error)=>{
    console.log(error)
    return Promise.reject(error)
})

export default instance