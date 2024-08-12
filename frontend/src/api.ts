import { collection, query, where, getDocs, getDoc, doc, addDoc, updateDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "./firebase";

// Fetch matches for the current user
export const fetchMatches = async (userId: string, userType: string) => {
    const matches: any[] = [];
    const oppositeType = userType === "employee" ? "employers" : "employees";

    try {
        // Fetch chats where the user is one of the participants
        const q = query(collection(db, "chats"), where("userIds", "array-contains", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const matchedUserId = data.userIds.find((id: string) => id !== userId); // Find the other user in the chat
            matches.push({
                id: doc.id,
                userId: matchedUserId,
                lastMessage: data.lastMessage || "No messages yet",
                timestamp: data.timestamp || new Date().toISOString(),
            });
        });

        // Fetch additional data from the opposite collection
        const matchDataPromises = matches.map(async (match) => {
            try {
                const userDoc = await getDoc(doc(db, oppositeType, match.userId));
                return {
                    ...match,
                    name: userDoc.exists() ? (userType === "employee" ? userDoc.data()?.companyName : userDoc.data()?.name) : "Unknown",
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

// Fetch messages for a specific chat
export const fetchMessages = async (chatId: string) => {
    const messages: any[] = [];
    try {
        const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('timestamp'));

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

// Send a new message in a chat
export const sendMessage = async (chatId: string, senderId: string, text: string) => {
    try {
        const messageData = {
            text,
            senderId,
            timestamp: serverTimestamp(),
        };

        // Add a document to the `messages` sub-collection of the chat
        await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);

        // Optionally, update the last message in the chat document
        const chatDoc = doc(db, 'chats', chatId);
        await updateDoc(chatDoc, {
            lastMessage: text,
            timestamp: serverTimestamp(),
        });

        console.log("Message sent successfully");
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

// Create a new chat document
export const createChat = async (user1Email: string, user2Email: string) => {
    try {
        // Create a chat with a Firestore-generated ID
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

export const fetchUserData = async (userEmailOrCompanyMail: string, userType: string) => {
    try {
        const collectionName = userType === "employee" ? "employee" : "employer";
        const fieldName = userType === "employee" ? "email" : "companyMail";

        console.log(`Fetching user data from collection: ${collectionName}, where ${fieldName} == ${userEmailOrCompanyMail}`);

        const q = query(collection(db, collectionName), where(fieldName, "==", userEmailOrCompanyMail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            console.error(`User document not found. Collection: ${collectionName}, ${fieldName}: ${userEmailOrCompanyMail}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

// Fetch chats for the current user
export const fetchChats = async (userEmailOrCompanyMail: string, userType: string) => {
    const chats: any[] = [];
    const oppositeType = userType === "employee" ? "employer" : "employee";

    try {
        const chatsQuery = query(collection(db, "chats"), where("userIds", "array-contains", userEmailOrCompanyMail));
        const querySnapshot = await getDocs(chatsQuery);

        if (querySnapshot.empty) {
            console.log("No chats found.");
            return chats;
        }

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const matchedUserEmailOrCompanyMail = data.userIds.find((emailOrCompanyMail: string) => emailOrCompanyMail !== userEmailOrCompanyMail);

            if (matchedUserEmailOrCompanyMail) {
                const userData = await fetchUserData(matchedUserEmailOrCompanyMail, oppositeType);
                chats.push({
                    id: doc.id,
                    name: userData ? (userType === "employee" ? userData.companyName : userData.name) : "Unknown",
                    profilePic: userData ? userData.picture : "",
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