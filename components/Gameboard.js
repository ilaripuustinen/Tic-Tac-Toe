import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import styles from '../style/style';

const START = 'plus';
const CROSS = 'cross';
const CIRCLE = 'circle';
let initialBoard = [
    START, START, START,
    START, START, START,
    START, START, START,];

export default function Gameboard() {

    const [isCross, setCross] = useState(true);
    const [winner, setWinner] = useState("");
    const [board, setBoard] = useState(initialBoard);

    const NBR_OF_COLS = initialBoard.length / 3;
    const NBR_OF_ROWS = initialBoard.length / 3;
    const items = [];
    for (let x = 0; x < NBR_OF_ROWS; x++) {
        const cols = [];
        for (let y = 0; y < NBR_OF_COLS; y++) {
            cols.push(
                <Pressable
                    key={x * NBR_OF_COLS + y}
                    style={styles.item}
                    onPress={() => drawItem(x * NBR_OF_COLS + y)}>
                    <Entypo
                        key={x * NBR_OF_COLS + y}
                        name={board[x * NBR_OF_COLS + y]}
                        size={32}
                        color={chooseItemColor(x + NBR_OF_COLS + y)} />
                </Pressable>
            );
        }
        let row =
            <View key={"row" + x}>
                {cols.map((item) => item)}
            </View>
        items.push(row);
    }

    function drawItem(number) {
        if (board[number] === START && winGame() === "") {
            board[number] = isCross ? CROSS : CIRCLE;
            setCross(!isCross);
            if (winGame() !== "") {
                setWinner(winGame());
            }
            else if (board.indexOf(START) === -1) {
                setWinner('No winner'); 
            }
        } 
    }

    function resetGame() {
        setCross(true);
        setWinner('');
        initialBoard = [
            START, START, START,
            START, START, START,
            START, START, START,];

        setBoard(initialBoard);
    }

    function chooseItemColor(number) {
        if(board[number] === CROSS) {
            return "#FF3031"
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30"
        }
        else {
            return "#74B9FF"
        }
    }

    function winGame() {
        if(board[0] != "question" && board[0] == board[1] && board[1] == board[2]){
          return board[0]
        }else if(board[3] != "question" && board[3] == board[4] && board[4] == board[5]){
          return board[3]
        }else if(board[6] != "question" && board[6] == board[7] && board[7] == board[8]){
          return board[6]
        }else if(board[0] != "question" && board[0] == board[3] && board[3] == board[6]){
          return board[0]
        }else if(board[1] != "question" && board[1] == board[4] && board[4] == board[7]){
          return board[1]
        }else if(board[2] != "question" && board[2] == board[5] && board[5] == board[8]){
          return board[2]
        }else if(board[0] != "question" && board[0] == board[4] && board[4] == board[8]){
          return board[0]
        }else if(board[2] != "question" && board[2] == board[4] && board[4] == board[6]){
          return board[2]
        }else{
          return ""
        }
      }

    return (
        <View style={styles.gameboard}>
            <View style={styles.flex}>{items}</View>
            <Text style={styles.gameinfo}>Winner: {winner}</Text>
            <Pressable style={styles.button} onPress={() => resetGame()}>
                <Text style={styles.buttonText}>Restart Game</Text>
            </Pressable>
        </View>
    );
}
