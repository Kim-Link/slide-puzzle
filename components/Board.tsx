import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const IMAGE_SOURCE = require("../assets/sample.jpg"); // 기본 제공 이미지

const Board = ({ boardSize, isImageMode }: { boardSize: number, isImageMode: boolean }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    initializeBoard();
  }, [boardSize]);

  const initializeBoard = () => {
    let numbers = Array.from({ length: boardSize * boardSize }, (_, i) =>
      i === boardSize * boardSize - 1 ? 0 : i + 1
    );

    let shuffled;
    do {
      shuffled = shuffleArray(numbers);
    } while (!isSolvable(shuffled));

    setTiles(shuffled);
  };

  const shuffleArray = (array: number[]) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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

  const emptyIndex = tiles.indexOf(0);

  const moveTile = (index: number) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;
    const emptyRow = Math.floor(emptyIndex / boardSize);
    const emptyCol = emptyIndex % boardSize;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const renderTile = (value: number, index: number) => {
    const tileSize = 300 / boardSize;
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.tile, value === 0 && styles.emptyTile, { width: tileSize, height: tileSize }]}
        onPress={() => moveTile(index)}
      >
        {value !== 0 &&
          (isImageMode ? (
            <Image
              source={IMAGE_SOURCE}
              style={{
                width: boardSize * tileSize,
                height: boardSize * tileSize,
                position: "absolute",
                top: -Math.floor((value - 1) / boardSize) * tileSize,
                left: -((value - 1) % boardSize) * tileSize,
              }}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.tileText}>{value}</Text>
          ))}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: boardSize }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {tiles.slice(rowIndex * boardSize, (rowIndex + 1) * boardSize).map((value, index) =>
            renderTile(value, rowIndex * boardSize + index)
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
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
