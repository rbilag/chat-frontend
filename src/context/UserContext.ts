import { createContext, Context, useContext } from 'react';
import { USER_INITIAL_VALUE } from '../constants';

export const UserContext: Context<any> = createContext([ USER_INITIAL_VALUE, () => {} ]);
export const useUser = () => useContext(UserContext);
