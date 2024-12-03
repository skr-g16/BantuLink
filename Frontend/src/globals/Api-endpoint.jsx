import { CONFIG } from "./Config"
export const API_ENDPOINT = {
    // ... rest of your API endpoints
    login: `${CONFIG.BASE_URL}/authentications`,
    regis: `${CONFIG.BASE_URL}/users`,
    profile: (userId) => `${CONFIG.BASE_URL}/users/${userId}`,
    updateProfile: (id) => `${CONFIG.BASE_URL}/users/${id}`,
}