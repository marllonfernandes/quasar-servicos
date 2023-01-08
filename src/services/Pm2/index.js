import { api } from 'boot/axios'

export default function pm2Service () {

    const getPm2 = async () => {
        try {
            const { data } = await api.get(`/pm2`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    const actionPm2 = async (action, name) => {
        try {
            const { data } = await api.get(`/pm2?action=${action}&name=${name}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        getPm2,
        actionPm2
    }

}