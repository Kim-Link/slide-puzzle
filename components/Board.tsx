import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BOARD_SIZE = 3; // 3x3 퍼즐

const Board = () => {
  // 초기 숫자 배열 (1~8 + 빈 칸(0))
  const [tiles, setTiles] = useState(
    Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => (i === BOARD_SIZE * BOARD_SIZE - 1 ? 0 : i + 1))
  );

  // 빈 칸(0)의 위치 찾기
  const emptyIndex = tiles.indexOf(0);

  // 타일 이동 함수
  const moveTile = (index: number) => {
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const emptyRow = Math.floor(emptyIndex / BOARD_SIZE);
    const emptyCol = emptyIndex % BOARD_SIZE;

    // 상, 하, 좌, 우 이동 가능 여부 확인
    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      // 빈 칸과 선택한 타일 위치 교체
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  // 타일 렌더링 함수
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
    backgroundColor: "#ddd", // 빈 칸은 회색
  },
  tileText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Board;
