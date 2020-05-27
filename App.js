import React from 'react';
import Game from './src/components/Game';
import {Header, Body, Title} from 'native-base';

const App = () => {
  const [key, setKey] = React.useState(0);

  const onPlayagain = () => {
    setKey(key + 1);
  };

  return (
    <>
      <Header
        androidStatusBarColor="#1b1b2f"
        style={{backgroundColor: '#1b1b2f'}}>
        <Body>
          <Title
            style={{fontSize: 25, color: '#FFF', fontFamily: 'Kalam-Bold'}}>
            MathGame
          </Title>
        </Body>
      </Header>
      <Game options={6} id={key} onPress={onPlayagain} time={10} />
    </>
  );
};

export default App;
