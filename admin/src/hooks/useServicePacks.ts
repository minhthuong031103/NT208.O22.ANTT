import { getRequest } from "@/lib/fetch";


export function useServicePacks()
{
    const getServicePacks = async () => {
        return await getRequest({endPoint: '/api/servicepacks/read'})
    }
    return {
        getServicePacks
    };
}