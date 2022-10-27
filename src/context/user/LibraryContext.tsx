import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Music, CoverPlayListUser} from '../../interfaces';
import { LibraryState, libraryReducer } from './libraryReducer';


interface LibraryContextProps {
    isLoading: Boolean;
    arrayFavorites:  Music[] | null;
    arrayPlayList: CoverPlayListUser[] | null;
    checkMusicFavorites: (id: string) => void;
    addFavorites: (id: string, music: Music) => Promise<void>;
    removeFavorites: (id: string) => Promise<void>;
    addPlayList: (music: Music, name: string, id?: number) => Promise<number>;
    checkPlayList: (id: number) => CoverPlayListUser[] | undefined;
    removeMusicPlayList: (_id: string, id: number) => Promise<CoverPlayListUser[]>;
    removePlayList: (id: number) => Promise<void>;
}

export const LibraryContext = createContext({} as LibraryContextProps);

const Library_INITIAL_STATE: LibraryState = {
    isLoading: false,
    arrayFavorites: null,
    arrayPlayList: null
}

export const LibraryProvider = ({children} : any) => {
    const [state, dispatch] = useReducer(libraryReducer, Library_INITIAL_STATE);

    useEffect(() => {
        checkStorage();
    }, [])

    const checkStorage = async() => {
        const playList = await AsyncStorage.getItem('PlayList');
        const favorites = await AsyncStorage.getItem('Favorites');

        if( playList ) {  
            dispatch({type: 'PlayList', payload: JSON.parse(playList)})
        } 

        if( favorites ) {  
            dispatch({type: 'Favorites', payload: JSON.parse(favorites)})
        } 
    }


    const checkMusicFavorites = (id : string) => state.arrayFavorites?.filter((music) => music._id === id);

    const addFavorites = async(id:string, music: Music) => {
        const check: any = checkMusicFavorites(id);

        console.log('16461', check, music)

        if( (Array.isArray(check) && check.length > 0) ) return;

        let newArray: Music[] = state.arrayFavorites !== null ? state.arrayFavorites : [];
        await AsyncStorage.removeItem('Favorites');
        newArray.push(music);
        dispatch({'type' : 'Favorites', payload: newArray.reverse()});
        await AsyncStorage.setItem('Favorites', JSON.stringify(newArray.reverse()));
    }

    const removeFavorites = async(id: string) => {
        dispatch({type: 'Loading', payload: true});
        let musicas: Music[] = state.arrayFavorites !== null ? state.arrayFavorites : [];
        try {
            let newArray : Music[] = [];
            musicas.map((item) => {
                if( item._id !== id ){
                    newArray.push(item);
                }
            });
            
            await AsyncStorage.removeItem('Favorites');
            setTimeout(async() => {
                dispatch({'type' : 'Favorites', payload: newArray});
                
                if( newArray.length > 0 ){
                    await AsyncStorage.setItem('Favorites', JSON.stringify(newArray.reverse()));
                }
                
            }, 1000);

        } catch (error) {
            throw new Error('ha ocurrido un error');
            
        }
    }

    const checkPlayList = (id : number) => state.arrayPlayList?.filter((playlist) => playlist.id === id);
    

    const addPlayList = async (music: Music, name: string, id?: number) : Promise<number> => {
        let check: CoverPlayListUser[] | null | undefined = null;
        let newArrPlayList: CoverPlayListUser[] = [];
        const index: number = state.arrayPlayList != null ? state.arrayPlayList.length + 1 : 1;

        if(id){
            check = checkPlayList(id);
        }


        if( check != null && check != undefined && check.length > 0 ){
            
            const isMusic : Music[] = check[0].musics.filter(item => item._id === music._id);
            const playlist : CoverPlayListUser[] | null = state.arrayPlayList;

            if( isMusic.length > 0 ) return index;

            if( playlist != null){
                playlist.map( (item) => {
                    if( item.id === id ){
                        item.musics.push(music);
                        item.countMusic = item.musics.length
                    }
                    
                    newArrPlayList.push(item);
                });

            }

            
            
        }

        

        if( newArrPlayList.length === 0 ){
            newArrPlayList.push({
                id: index,
                name: name,
                countMusic: 1,
                musics: [music]
            });

            if( state.arrayPlayList != null && state.arrayPlayList.length > 0 ){
                newArrPlayList = [...state.arrayPlayList, ...newArrPlayList];
            }
        }

        


        newArrPlayList = newArrPlayList.reverse();

        await AsyncStorage.removeItem('PlayList');
        dispatch({'type' : 'PlayList', payload: newArrPlayList});
        await AsyncStorage.setItem('PlayList', JSON.stringify(newArrPlayList));

        return index;
    }

    const removeMusicPlayList = async(_id: string, id: number) : Promise<CoverPlayListUser[]> => {
        let playlist: CoverPlayListUser[] = [];
        dispatch({type: 'Loading', payload: true});

        if( state.arrayPlayList != null ){
            const palylists : CoverPlayListUser[] = state.arrayPlayList;
            let newPlayLists : CoverPlayListUser[] = [];
            

            palylists.map((item) => {
                if( item.id === id ){
                    const musics = item.musics.filter(music => music._id !== _id);
                    item.musics = musics;
                    item.countMusic = item.countMusic - 1;
                    playlist.push(item);
                }
                

                newPlayLists.push(item);
            });


            await AsyncStorage.removeItem('PlayList');
            dispatch({'type' : 'PlayList', payload: newPlayLists});
            await AsyncStorage.setItem('PlayList', JSON.stringify(newPlayLists));
        }

        dispatch({type: 'Loading', payload: false});
        return playlist;
    };

    const removePlayList = async(id: number) => {
        dispatch({type: 'Loading', payload: true});

        if( state.arrayPlayList != null ){
            const palylists : CoverPlayListUser[] = state.arrayPlayList;
            let newPlayLists : CoverPlayListUser[] = [];
            

            palylists.map((item) => {
                if( item.id !== id ){
                    newPlayLists.push(item);
                }
            });


            await AsyncStorage.removeItem('PlayList');
            dispatch({'type' : 'PlayList', payload: newPlayLists});
            await AsyncStorage.setItem('PlayList', JSON.stringify(newPlayLists));
        }

        setTimeout(() => {
            dispatch({type: 'Loading', payload: false});
        }, 800);
    }

    return (
        <LibraryContext.Provider
            value={{
                ...state,
                checkMusicFavorites,
                addFavorites,
                removeFavorites,
                addPlayList,
                checkPlayList,
                removeMusicPlayList,
                removePlayList
            }}
        >
            {children}
        </LibraryContext.Provider>
    )
}