import { api } from 'boot/axios'

export default function proxiesService () {

    const getProxy = async () => {
        try {
            const { data } = await api.get('/register/v1.0/proxy')
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

    return {
        getProxy,
        delProxy
    }


}