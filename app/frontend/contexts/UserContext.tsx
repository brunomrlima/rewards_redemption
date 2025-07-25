import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../api/users";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import type { User } from "../types"

export const UserContext = createContext<User | undefined>(undefined);

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
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => currentUser(),
    });

    if (isLoading) return <Loading />;
    if (isError || !user) return <ErrorMessage message={(error as Error).message} />;

    return (
        <UserContext.Provider value={{ userId: user.id, name: user.name, points: user.points }}>
            {children}
        </UserContext.Provider>
    );
};
