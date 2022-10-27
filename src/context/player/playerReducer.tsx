import { Music } from "../../interfaces";



export interface PlayerState {
    isLoadMusic: Boolean;
    isLoadingMusics: Boolean;
    arrayMusics: Music[];
    playerMusic: Music | null;
    position: number;
    next: number | null;
    prev: number | null;
    random: Boolean;
    repeat: Boolean;
    isFavorites: Boolean;
}

type PlayerActionType = 
    | { type: 'Musics', payload: Music[] }
    | { type: 'StateIsLoad', payload: Boolean }
    | { type: 'LoadingMusics', payload: Boolean }
    | { type: 'PositionMusic', payload: number }
    | { type: 'NextActive', payload: number | null }
    | { type: 'PrevActive', payload: number | null }
    | { type: 'IsActiveRandom', payload: Boolean }
    | { type: 'IsActiveRepeat', payload: Boolean }
    | { type: 'IsFavorites', payload: Boolean }

export const playerReducer = ( state: PlayerState, action: PlayerActionType ) : PlayerState => {
    switch (action.type) {
        case 'Musics':
            return {
                ...state,
                isLoadingMusics: false,
                arrayMusics: action.payload
            }
        case 'PositionMusic':
            return {
                ...state,
                position: action.payload
            }
        case 'NextActive':
            return {
                ...state,
                next: action.payload
            }
        case 'PrevActive':
            return {
                ...state,
                prev: action.payload
            }
        case 'LoadingMusics':
            return {
                ...state,
                isLoadingMusics: action.payload
            }
        case 'IsActiveRandom':
            return {
                ...state,
                random: action.payload
            }
        case 'IsActiveRepeat':
            return {
                ...state,
                repeat: action.payload
            }
        case 'IsFavorites':
            return {
                ...state,
                isFavorites: action.payload
            }
        default:
            return state;
    }
}