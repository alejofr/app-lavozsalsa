import React, { createContext, useReducer, useContext, useEffect , useRef } from 'react';
import axios from 'axios';
import TrackPlayer, { 
    Capability,
    State, 
    usePlaybackState,
    Event,
    RepeatMode,
    useProgress,
    useTrackPlayerEvents,
    Track
  } from 'react-native-track-player';
import { playerReducer, PlayerState, LibraryContext } from '../';
import { Music } from '../../interfaces';
import axiosRequest from '../../api/axiosRequest';



interface PlayerContextProps {
    isLoadingMusics: Boolean;
    arrayMusics: Music[];
    position: number;
    next: number | null;
    prev: number | null;
    random: Boolean;
    repeat: Boolean;
    isFavorites: Boolean;
    getIdMusics: (_id: string) => void;
    changePositionMusic: (index: number) => void;
    changeRandom: () => void;
    changeRepeat: () => void;
    changeFavorites: (index:number) => Promise<void>;
}

export const PlayerContext = createContext({} as PlayerContextProps);

const PLAYER_INITIAL_STATE: PlayerState = {
    isLoadMusic: false,
    isLoadingMusics: false,
    arrayMusics: [],
    playerMusic: null,
    position: 0,
    next: null,
    prev: null,
    random: false,
    repeat: false,
    isFavorites: false
}





export const PlayerProvider = ({children} : any) => {
    const [state, dispatch] = useReducer(playerReducer, PLAYER_INITIAL_STATE);
    const { checkMusicFavorites, addFavorites, removeFavorites } = useContext(LibraryContext);
    
    const getIdMusics = async(_id: string) => {
        const resp = checkMusicFavorites(_id);
        dispatch({type: 'LoadingMusics', payload: true});
        try {
            const { data } = await axiosRequest.get<Music[]>(`/musics?limit=10`);
          
            let datos = data;
  
            if( !Array.isArray(data) ){
                let dataOk: any = data;
                datos= dataOk.data;
            }   

            const dataNew = renderDataId(datos);
            const check : any = verifyFavorites(dataNew[0]._id);

            if( check != undefined){
                if( check.length > 0 ) dispatch({type: 'IsFavorites', payload: true});
                else dispatch({type: 'IsFavorites', payload: false});
            }

            if( dataNew.length > 1 ){
                dispatch({type: 'NextActive', payload: 1})
            }

            await initializePlayer();
            await TrackPlayer.add(renderDatosTrack(dataNew));
            await TrackPlayer.play();

            dispatch({type: 'PositionMusic', payload: 0});
            dispatch({type: 'Musics', payload: dataNew});

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                let data: any = [];
                data = error.response?.data;

            }
            dispatch({type: 'LoadingMusics', payload: false});
            
        }
    }

    const renderDataId = (data: Music[]) => {
        let posicion = 1;
        for (let j = 0; j < data.length; j++) {
            data[j].position = `${posicion}`;
            data[j].url = data[j].urlGetMusicFile;
            
            posicion++;
        }
            
        return data;
    }

    const renderDatosTrack = (data: Music[]) : Track[] => {
        let newDatos : Track[] = []; 
        data.map((item) => {
            newDatos.push({
                _id: item._id,
                url: item.url,
                title: item.name,
                artwork: item.thumbnail,
                duration: item.duration
                
            })
        })
            
        return newDatos;
    }

    const changePositionMusic = async(index: number) => {
       // 
       if( state.position !== index ){
           
            changePrev(index);
            changeNext(index);

            dispatch({type: 'PositionMusic', payload: index});

            const check: any = verifyFavorites(state.arrayMusics[index]._id);
            console.log('check', check, state.arrayMusics[index]._id)

            if( check != undefined){
                if( check.length > 0 ){
                    dispatch({type: 'IsFavorites', payload: true});
                    return;
                }
                
            }

            dispatch({type: 'IsFavorites', payload: false});
       }
       
    }
    const changePrev = (index: number) => index > 0 ? dispatch({type: 'PrevActive', payload: index - 1}) : dispatch({type: 'PrevActive', payload: null});

    const changeNext = (index: number) => index === state.arrayMusics.length - 1 ? dispatch({type: 'NextActive', payload: null}) : dispatch({type: 'NextActive', payload: index + 1});

    const verifyFavorites = (_id:string) => checkMusicFavorites(_id);

    const changeFavorites = async(index:number) => {
        const music = state.arrayMusics[index];
        const check: any = verifyFavorites(music._id);

        if( check === undefined || check.length === 0){
            console.log('sasa', check, 'sasacedfew', index, music)
            dispatch({type: 'IsFavorites', payload: true});
            await addFavorites(music._id, music);
            return;
            
        }

        dispatch({type: 'IsFavorites', payload: false});
        removeFavorites(music._id)
    }


    const changeRandom = async() => {
        const bol = state.random ? false : true;
        dispatch({type: 'IsActiveRandom', payload: bol});
        dispatch({type: 'LoadingMusics', payload: true});

        let newArray: Music[] = [];
        let newData: Music[] = state.arrayMusics;

        if ( bol ){

            const musics = state.arrayMusics.filter((item, index) => index != state.position);
            const arrayRandom = musics.sort(() => Math.random() - 0.5);
            arrayRandom.map((item, index) => {
                if( index === state.position){
                    newArray.push(state.arrayMusics[state.position]);
                }
                newArray.push(item);
            });
            newData = renderDataId(newArray);
        }
        
        changePrev(state.position);
        changeNext(state.position);
        dispatch({type: 'Musics', payload: newData});


        setTimeout(() => {
            dispatch({type: 'LoadingMusics', payload: false});
        }, 1000);

    }

    const changeRepeat = () => {
        const bol = state.repeat ? false : true;
        dispatch({type: 'IsActiveRepeat', payload: bol});
    }

  
    const initializePlayer = async() => {
        try {
            await TrackPlayer.setupPlayer();
            /*await TrackPlayer.updateOptions({
                stopWithApp: false, // false=> music continues in background even when app is closed
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [
                    Capability.Play, 
                    Capability.Pause, 
                    Capability.SeekTo,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop
                ],
            });*/
        } catch (e) {
            console.log(e);
            // to-do handle error
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                ...state,
                getIdMusics,
                changePositionMusic,
                changeRandom,
                changeRepeat,
                changeFavorites,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
};