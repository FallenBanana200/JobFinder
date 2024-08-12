import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export const fetchMatches = async (userId: string, userType: string) => {
    const matches: any[] = [];
    const oppositeType = userType === "employee" ? "employers" : "employees";

    try {
        const q = query(collection(db, "chats"), where("userIds", "array-contains", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const matchedUserId = data.userIds.find((id: string) => id !== userId);
            matches.push({
                id: doc.id,
                userId: matchedUserId,
                lastMessage: data.lastMessage || "No messages yet",
                timestamp: data.timestamp || new Date().toISOString(),
            });
        });

        const matchDataPromises = matches.map(async (match) => {
            try {
                const userDoc = await getDoc(doc(db, oppositeType, match.userId));
                return {
                    ...match,
                    name: userDoc.exists()
                        ? userType === "employee"
                            ? userDoc.data()?.companyName
                            : userDoc.data()?.name
                        : "Unknown",
                    profilePic: userDoc.exists() ? userDoc.data()?.picture : "",
                };
            } catch (error) {
                console.error("Error fetching match data:", error);
                return {
                    ...match,
                    name: "Unknown",
                    profilePic: "",
                };
            }
        });

        return Promise.all(matchDataPromises);
    } catch (error) {
        console.error("Error fetching matches:", error);
        return [];
    }
};

export const fetchMessages = async (chatId: string) => {
    const messages: any[] = [];
    try {
        const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            messages.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

export const sendMessage = async (chatId: string, senderId: string, text: string) => {
    try {
        const messageData = {
            text,
            senderId,
            timestamp: serverTimestamp(),
        };

        await addDoc(collection(db, "chats", chatId, "messages"), messageData);

        const chatDoc = doc(db, "chats", chatId);
        await updateDoc(chatDoc, {
            lastMessage: text,
            timestamp: serverTimestamp(),
        });

        console.log("Message sent successfully");
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

export const createChat = async (user1Email: string, user2Email: string) => {
    try {
        const chatRef = await addDoc(collection(db, "chats"), {
            userIds: [user1Email, user2Email],
            createdAt: serverTimestamp(),
            lastMessage: "No messages yet",
            timestamp: serverTimestamp(),
        });

        console.log("Chat created successfully with ID:", chatRef.id);
    } catch (error) {
        console.error("Error creating chat:", error);
    }
};

export const fetchChats = async (userEmailOrCompanyMail: string, userType: string) => {
    const chats: any[] = [];
    const oppositeType = userType === "employee" ? "employer" : "employee";

    try {
        const chatsQuery = query(
            collection(db, "chats"),
            where("userIds", "array-contains", userEmailOrCompanyMail)
        );
        const querySnapshot = await getDocs(chatsQuery);

        if (querySnapshot.empty) {
            console.log("No chats found.");
            return chats;
        }

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const matchedUserEmailOrCompanyMail = data.userIds.find(
                (emailOrCompanyMail: string) => emailOrCompanyMail !== userEmailOrCompanyMail
            );

            if (matchedUserEmailOrCompanyMail) {
                let userData = null;
                if (userType === "employee") {
                    userData = await fetchUserData(matchedUserEmailOrCompanyMail, "employer");
                } else if (userType === "employer") {
                    userData = await fetchUserData(matchedUserEmailOrCompanyMail, "employee");
                }

                chats.push({
                    id: doc.id,
                    name: userData ? (userType === "employee" ? userData.companyName : userData.name) : "Unknown",
                    picture: userData ? userData.picture : "",
                    lastMessage: data.lastMessage || "No messages yet",
                    timestamp: data.timestamp?.toDate().toLocaleString() || new Date().toLocaleString(),
                });

            }
        }

        return chats;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
};

export const fetchUserData = async (emailOrCompanyMail: string, type: string) => {
    try {
        const collectionName = type === "employee" ? "employee" : "employer";
        const userQuery = query(
            collection(db, collectionName),
            where(type === "employee" ? "email" : "companyMail", "==", emailOrCompanyMail)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            console.error(`No ${type} document found for ${emailOrCompanyMail}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export const getCurrentUserId = (): string | null => {
    try {
        const userId = localStorage.getItem("userId");
        return userId;
    } catch (error) {
        console.error("Error retrieving user ID from local storage:", error);
        return null;
    }
};