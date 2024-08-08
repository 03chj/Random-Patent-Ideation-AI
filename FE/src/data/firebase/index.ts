import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: 'trizolve-2e830.firebaseapp.com',
    projectId: 'trizolve-2e830',
    storageBucket: 'trizolve-2e830.appspot.com',
    messagingSenderId: '676443176333',
    appId: '1:676443176333:web:8568155bc3e3ab172751c4',
    measurementId: 'G-CX6JC42QQE',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
