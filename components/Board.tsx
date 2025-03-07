import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BOARD_SIZE = 3; // 3x3 퍼즐

const Board = () => {
  // 초기 숫자 배열 (1~8 + 빈 칸(0))
  const [tiles, setTiles] = useState(
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => (i === BOARD_SIZE * BOARD_SIZE - 1 ? 0 : i + 1))
  );

  // 타일을 렌더링하는 함수
  const renderTile = (value: number, index: number) => {
    return (
      <TouchableOpacity key={index} style={[styles.tile, value === 0 && styles.emptyTile]}>
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
    backgroundColor: "#ddd", // 빈 칸은 회색
  },
  tileText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Board;
