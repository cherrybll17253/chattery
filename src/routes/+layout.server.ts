import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
 
inject({ mode: dev ? 'development' : 'production' });

import { env } from '$env/dynamic/private';
import 'dotenv/config';
import type { LayoutServerLoad } from './$types';
export const load:LayoutServerLoad = async () => {   
    const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
    } = process.env;
    return {
        firebaseConfig:{
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId
        },
    };
}