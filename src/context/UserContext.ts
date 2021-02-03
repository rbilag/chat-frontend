import { createContext, Context, useContext } from 'react';
import { USER_INITIAL_VALUE } from '../constants';
import { User } from '../types';

export const UserContext: Context<any> = createContext([ USER_INITIAL_VALUE, () => {} ]);
export const useUser = () => useContext(UserContext);
