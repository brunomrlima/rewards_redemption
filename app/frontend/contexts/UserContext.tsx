import React, { createContext, useContext } from "react";

type UserContextType = {
    userId: number;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

type Props = {
    children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
    const userId = 11;

    return (
        <UserContext.Provider value={{ userId }}>
            {children}
        </UserContext.Provider>
    );
};
