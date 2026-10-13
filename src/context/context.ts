import { createContext, useContext } from "react";

export function useUserContext() {
    return useContext(UserContext);
}
export type UserContextValue = {
    isLogged: boolean;
    setIsLogged: (value: boolean) => void;
};

export const UserContext = createContext<UserContextValue>({
    isLogged: false,
    setIsLogged: () => undefined
});
