import { createContext, useContext } from "react";

export type UserContextValue = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
};

export const UserContext = createContext<UserContextValue>({
    isLogged: false,
    setIsLogged: () => undefined,
});

export function useUserContext() {
    return useContext(UserContext);
}
