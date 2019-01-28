import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import generalCSS from '../styles/styles.css';

export default (props) => {
  const {
    containerStyle,
    disabled,
    onPress,
    text,
    textStyle,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[generalCSS.button_container, disabled && generalCSS.button_disabled, containerStyle]}
      {...restProps}>
      {text && <Text style={[generalCSS.button_text, textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};
