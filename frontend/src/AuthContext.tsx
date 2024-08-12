import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../src/firebase'; // Make sure this imports the Firestore db
import { doc, getDoc } from 'firebase/firestore';

interface User {
    uid: string;
    type: 'employee' | 'employer';
    matches?: string[]; // Matches can be emails or companyMails
    email?: string;
    companyMail?: string;
    name?: string;
    picture?: string;
}

interface AuthContextProps {
    currentUser: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }:any) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType');

            if (userId && userType) {
                const collectionName = userType === 'employee' ? 'employee' : 'employer';
                const userRef = doc(db, collectionName, userId);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setCurrentUser({ ...userDoc.data(), uid: userId, type: userType } as User);
                } else {
                    console.error(`User document not found. Collection: ${collectionName}, UserID: ${userId}`);
                }
            } else {
                console.error('User ID or type is not available in localStorage.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
