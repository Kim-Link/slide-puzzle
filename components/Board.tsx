import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BOARD_SIZE = 3; // 3x3 퍼즐

const Board = () => {
  // 퍼즐 배열을 행(row) 단위로 나누어서 렌더링
  const tiles = Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => (
    <View key={index} style={styles.tile}>
      <Text style={styles.tileText}>{index + 1}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      {Array.from({ length: BOARD_SIZE }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {tiles.slice(rowIndex * BOARD_SIZE, (rowIndex + 1) * BOARD_SIZE)}
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
    flexDirection: "row", // 각 행을 가로로 정렬
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
  tileText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Board;
