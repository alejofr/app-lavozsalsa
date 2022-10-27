import { Music, CoverPlayListUser} from '../../interfaces';

export interface LibraryState {
    isLoading: Boolean;
    arrayFavorites:  Music[] | null;
    arrayPlayList: CoverPlayListUser[] | null;
}

type LibraryActionType = 
    | { type: 'Favorites', payload: Music[] }
    | { type: 'PlayList', payload: CoverPlayListUser[] }
    | { type: 'Loading', payload: Boolean }

export const libraryReducer = ( state: LibraryState, action: LibraryActionType ) : LibraryState => {
    switch (action.type) {
        case 'Favorites':
            return {
                ...state,
                isLoading: false,
                arrayFavorites: action.payload
            }
        case 'PlayList':
            return {
                ...state,
                isLoading: false,
                arrayPlayList: action.payload
            }
        case 'Loading':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}