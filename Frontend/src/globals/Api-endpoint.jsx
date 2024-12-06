import { CONFIG } from "./Config"
export const API_ENDPOINT = {
    // ... rest of your API endpoints
    login: `${CONFIG.BASE_URL}/authentications`,
    authentication: `${CONFIG.BASE_URL}/authentications`,
    regis: `${CONFIG.BASE_URL}/users`,
    profile: (userId) => `${CONFIG.BASE_URL}/users/${userId}`,
    updateProfile: (id) => `${CONFIG.BASE_URL}/users/${id}`,
    request: `${CONFIG.BASE_URL}/requests`,
    getRequest: (id) => `${CONFIG.BASE_URL}/requests/${id}`,
    getAllRequest: `${CONFIG.BASE_URL}/requests`,
    deleteRequest: (id) => `${CONFIG.BASE_URL}/requests/${id}`,
    updateRequest: (id) => `${CONFIG.BASE_URL}/requests/${id}`,
    getUserbyOwner:`${CONFIG.BASE_URL}/requests/owner`, 
    donation: `${CONFIG.BASE_URL}/donations`,
}