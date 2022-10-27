import { User } from '../../interfaces';


export interface AuthState {
    isLoggedIn: Boolean;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    user: User | null;
}

type AuthActionType = 
    | { type: 'Login', payload: User }
    | { type: 'Logout' }
    | { type: 'notAuthenticated' }
    | { type: 'updateStateUser', payload: User }

export const authReducer = ( state: AuthState, action: AuthActionType ) : AuthState => {
    switch (action.type) {
        case 'Login':
            return {
                ...state,
                isLoggedIn: false,
                status: 'authenticated',
                user: action.payload
            }
        case 'updateStateUser':
            return {
                ...state,
                user: action.payload
            }
        case 'Logout':
        case 'notAuthenticated':
            return {
                ...state,
                isLoggedIn: false,
                status: 'not-authenticated',
                user: null
            }
        default:
           return state;
    }
}