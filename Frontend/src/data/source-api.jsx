import { API_ENDPOINT } from "../globals/Api-endpoint";

export class APISource {
    static async register(namaLengkap, email, password, telepon, jenisKelamin, alamat) {
        const response = await fetch(API_ENDPOINT.regis, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                fullname: namaLengkap,
                phone_number: telepon,
                email: email,
                password: password,
                address: alamat,
                gender: jenisKelamin,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Pendaftaran gagal');
        }

        const responseJson = await response.json();
        return responseJson.data;
    }
    static async login(email, password) {
        const response = await fetch(API_ENDPOINT.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login gagal');
        }

        const restaurantJson = await response.json();
        return restaurantJson.data;
    }

    static async getProfile(userId) {
        const token = localStorage.getItem('refreshToken');
        const response = await fetch(API_ENDPOINT.profile(userId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mendapatkan profil');
        }
        const responseJson = await response.json();
        return responseJson.data.user;
    }
    
    static async updateProfile(userId, updatedData) {
        const token = localStorage.getItem('refreshToken');
        const response = await fetch(API_ENDPOINT.profile(userId), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fullname: updatedData.fullname,
                email: updatedData.email,
                password: updatedData.password,
                phone_number: updatedData.phone_number,
                gender: updatedData.gender,
                address: updatedData.address
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mengupdate profil');
        }

        const responseJson = await response.json();
        return responseJson;
    }}