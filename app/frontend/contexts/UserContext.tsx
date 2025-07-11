import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

type UserContextType = {
    userId: number;
    name: string
    points: number
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
    const userId = 13;
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId),
    });

    if (isLoading) return <Loading />;
    if (isError || !user) return <ErrorMessage message={(error as Error).message} />;;

    return (
        <UserContext.Provider value={{ userId, name: user.name, points: user.points }}>
            {children}
        </UserContext.Provider>
    );
};
