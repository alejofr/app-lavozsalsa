import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomInput } from '../components';
import { useDebouncedValue } from '../hooks';

interface SearchInputProps{
    onDebounce: ( value: string ) => void;
    bgColor: string;
    width: string | number;
}

export const SearchInput = ({bgColor, width, onDebounce}: SearchInputProps) => {
    const [search, setSearch] = useState('');
    const debouncedValue =  useDebouncedValue(search, 700);
    useEffect(() => {
        if( debouncedValue != '' ){
            onDebounce(debouncedValue);
        }
      }, [debouncedValue])

    return (
        <CustomInput 
            value={search}
            onChangeText={setSearch}
            styleFormControl={{ width: width}}
            styleTextInput={{
            borderColor: 'transparent',
            backgroundColor: bgColor,
            }}
            textInputProps={{placeholder: 'Buscar por música', placeholderTextColor: '#858585'}}
            ElementIconRight={() => search != '' ? <Ionicons name='close' size={18} color={'#fff'} /> : null}
            onPressIcon={() => setSearch('')}
        />
    )
}
