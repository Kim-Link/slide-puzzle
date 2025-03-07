import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const BOARD_SIZE = 3; // 3x3 퍼즐

const shuffleArray = (array: number[]) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Board = () => {
  const [tiles, setTiles] = useState<number[]>([]);

  const initializeBoard = () => {
    let numbers = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) =>
      i === BOARD_SIZE * BOARD_SIZE - 1 ? 0 : i + 1
    );

    let shuffled;
    do {
      shuffled = shuffleArray(numbers);
    } while (!isSolvable(shuffled));

    setTiles(shuffled);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const isSolvable = (board: number[]) => {
    let inversions = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        if (board[i] && board[j] && board[i] > board[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0;
  };

  // 퍼즐이 해결되었는지 확인하는 함수
  const checkWin = (tiles: number[]) => {
    const correctOrder = [...tiles].sort((a, b) => a - b);
    correctOrder.push(correctOrder.shift()!); // 0을 마지막으로 보내기

    return JSON.stringify(tiles) === JSON.stringify(correctOrder);
  };

  const emptyIndex = tiles.indexOf(0);

  const moveTile = (index: number) => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const emptyRow = Math.floor(emptyIndex / BOARD_SIZE);
    const emptyCol = emptyIndex % BOARD_SIZE;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);

      // 🏆 퍼즐 완성 여부 확인
      if (checkWin(newTiles)) {
        setTimeout(() => {
          console.log("🎉 퍼즐 완성!");
          Alert.alert("🎉 퍼즐 완성!", "축하합니다! 퍼즐을 완성했습니다!", [
            { text: "다시 시작", onPress: initializeBoard },
          ]);
        }, 300);
      }
    }
  };

  const renderTile = (value: number, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.tile, value === 0 && styles.emptyTile]}
        onPress={() => moveTile(index)}
      >
        {value !== 0 && <Text style={styles.tileText}>{value}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: BOARD_SIZE }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {tiles.slice(rowIndex * BOARD_SIZE, (rowIndex + 1) * BOARD_SIZE).map((value, index) =>
            renderTile(value, rowIndex * BOARD_SIZE + index)
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  tile: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  emptyTile: {
    backgroundColor: "#ddd",
  },
  tileText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Board;
