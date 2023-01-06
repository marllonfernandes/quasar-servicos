import { api } from 'boot/axios'

export default function proxiesService () {

    const getProxy = async (filter) => {
        try {
            const { data } = await api.get(`/register/v1.0/proxy?filter=${filter}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const delProxy = async (id) => {
        try {
            const { data } = await api.delete(`/register/v1.0/proxy/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const postProxy = async (body) => {
        try {
            const { data } = await api.post(`/register/v1.0/proxy`, body)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    const putProxy = async (id, body) => {
        try {
            const { data } = await api.put(`/register/v1.0/proxy/${id}`, body)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        getProxy,
        delProxy,
        postProxy,
        putProxy
    }

}