import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import RandomOptions from './RandomOptions';
var shuffle = require('shuffle-array');

const Game = ({options, onPress, id, time}) => {
  // const [remainingTime, setRemainingTime] = useState(time);
  const [target, setTarget] = useState(0);
  const [randomNumberOptions, setRandomNumberOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  const getRandomNumber = () => {
    setSelectedIndex([]);
    let randomNumbers = Array.from({length: options}).map(() => {
      return Math.floor(11 * Math.random());
    });

    let getTargetValue = randomNumbers
      .slice(0, options - 2)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });

    setTarget(getTargetValue);
    let shuffledRandomNumbers = shuffle(randomNumbers);
    setRandomNumberOptions(shuffledRandomNumbers);
  };

  const isNumberSelected = index => {
    return selectedIndex.indexOf(index) >= 0;
  };

  const onPressHandler = index => {
    setSelectedIndex([...selectedIndex, index]);
  };

  //Check status of Game
  const gameStatus = () => {
    let sum = selectedIndex.reduce((accumulator, currentValue) => {
      return accumulator + randomNumberOptions[currentValue];
    }, 0);
    if (sum < target) {
      return 'PLAYING';
    }
    if (sum === target) {
      return 'WON';
    }
    if (sum > target) {
      return 'LOST';
    }
  };

  useEffect(() => {
    getRandomNumber();
  }, [id]);

  let status = gameStatus();

  return (
    <View style={styles.container}>
      <View style={[styles.targetContainer, styles[`${status}`]]}>
        <Text style={[styles.targetText]}>{target}</Text>
      </View>
      <View style={styles.randomNumberOptionsContainer}>
        {randomNumberOptions.map((item, index) => {
          return (
            <RandomOptions
              key={index}
              id={index}
              randomNumber={item}
              isSelected={isNumberSelected(index)}
              status={status}
              onpress={() => {
                onPressHandler(index);
              }}
            />
          );
        })}
      </View>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        {status !== 'PLAYING' ? (
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}
            style={{
              backgroundColor: '#0747a6',
              paddingVertical: 15,
              paddingHorizontal: 25,
              borderRadius: 35,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Lobster-Regular',
              }}>
              Play again
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#562349',
    padding: 10,
  },
  targetContainer: {
    marginHorizontal: 50,
    borderRadius: 40,
  },
  targetText: {
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Lobster-Regular',
  },
  randomNumberOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  PLAYING: {
    backgroundColor: '#1b6ca8',
  },
  WON: {
    backgroundColor: '#12947f',
  },
  LOST: {
    backgroundColor: '#d32626',
  },
});
export default Game;
