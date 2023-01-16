import styled, { keyframes } from "styled-components";

import spritePageRight from "../images/moveRight.png";
import spritePageLeft from "../images/moveLeft.png";
import spritePageUp from "../images/moveUp.png";
import spritePageDown from "../images/moveDown.png";

const animation = keyframes`
100% { background-position: -1000px; }
`;

const SpriteDown = styled.div`
  height: 30px;
  width: 36px;
  position: absolute;
  background: url(${spritePageDown}) left top;
  animation: ${animation} 0.4s steps(2) infinite;
`;
const SpriteUp = styled.div`
  height: 30px;
  width: 36px;
  position: relative;
  background: url(${spritePageUp}) left top;
  animation: ${animation} 0.4s steps(2) infinite;
`;
const SpriteRight = styled.div`
  height: 30px;
  width: 36px;
  position: absolute;
  background: url(${spritePageRight}) left top;
  animation: ${animation} 0.4s steps(2) infinite;
`;
const SpriteLeft = styled.div`
  height: 29px;
  width: 36px;
  position: absolute;
  background: url(${spritePageLeft}) left top;
  animation: ${animation} 0.4s steps(2) infinite;
`;
const Sprite = (props) => {
  const { direction, style, className, id, key, playerName } = props;
  if (direction === "up") {
    return (
      <SpriteUp key={key} className={className} id={id} style={style} />
    );

  } else if (direction === "down") {
    return (
      <SpriteDown key={key} className={className} id={id} style={style}/>
   
    );
  } else if (direction === "left") {
    return (
      <SpriteLeft key={key} className={className} id={id} style={style} />
      
    );
  } else if (direction === "right") {
    return (
      <SpriteRight key={key} className={className} id={id} style={style} />
   
    );
  } else {
    return <SpriteUp key={key} className={className} id={id} style={style} />;
  }
};

export default Sprite;
