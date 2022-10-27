import React from 'react';
import { View, FlatList, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { CategoriaCard } from './CategoriaCard';
import { RootStackParams } from '../navigator';
import { StackNavigationProp } from '@react-navigation/stack';


export const categorias = [
    { name: 'Musicas' },
    { name: 'Albunes' },
    { name: 'PlayLists' },
];

interface SlideCategoriasProps {
    isActiveName?: '' | 'Musicas' | 'Albunes' | 'PlayLists';
    style?: ViewStyle;
}

type PropsNavigator = StackNavigationProp<RootStackParams, 'Musics'>;

export const SlideHorizontalCategorias = ({ isActiveName = '',  style} : SlideCategoriasProps) => {
    const navigator = useNavigation<PropsNavigator>();

    const onClickCategorias = (name: string) => {
        const isValor = categorias.filter(item => item.name === name);
        switch (isValor[0].name) {
            case 'Musicas':
                navigator.navigate('Musics');
                return;
            case 'Albunes':
                navigator.navigate('Albums', {});
                return;
            case 'PlayLists':
                navigator.navigate('PlayLists', {});
                return;
            default:
                return;
        }
    }

    return (
        <View style={{...style}}>
            <FlatList 
            data={ categorias }
            keyExtractor={ (data) => data.name }
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <CategoriaCard
                    title={item.name}
                    onPress={(title) => onClickCategorias(title)}
                    isActive={ item.name === isActiveName ? true : false }
                />
            )}
        />
        </View>
    )
}
