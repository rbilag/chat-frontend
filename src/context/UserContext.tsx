import { createContext, useContext } from 'react';
import { USER_INITIAL_VALUE } from '../constants';
import { User } from '../types';

export type UserContextType = {
	userDetails: User;
	setUserDetails: (userDetails: User) => void;
};

export const UserContext = createContext<UserContextType>({
	userDetails: USER_INITIAL_VALUE,
	setUserDetails: () => {}
});
export const useUser = () => useContext(UserContext);
