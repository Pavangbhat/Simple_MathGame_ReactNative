import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const RandomOptions = ({randomNumber, isSelected, onpress, id, status}) => {
  const onPressHandler = () => {
    onpress(id);
  };
  let isDisabled = isSelected;
  if (status !== 'PLAYING') {
    isDisabled = true;
  }
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPressHandler}
      style={[styles.textContainer, isSelected && styles.isSelectedStyle]}>
      <Text
        style={{
          fontSize: 50,
          textAlign: 'center',
          color: '#FFF',
          fontWeight: '500',
          fontStyle: 'italic',
          fontFamily: 'Kalam-Bold',
        }}>
        {randomNumber}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#ffa299',
    width: 100,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  isSelectedStyle: {
    opacity: 0.3,
  },
});

export default RandomOptions;
