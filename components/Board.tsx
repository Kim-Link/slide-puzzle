import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BOARD_SIZE = 3; // 3x3 퍼즐

const shuffleArray = (array: number[]) => {
  let shuffled = [...array];

  // Fisher-Yates 알고리즘을 사용한 랜덤 섞기
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const Board = () => {
  // 초기 숫자 배열 (1~8 + 빈 칸(0))
  const [tiles, setTiles] = useState<number[]>([]);

  // 퍼즐을 랜덤하게 섞는 함수
  const initializeBoard = () => {
    let numbers = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) =>
      i === BOARD_SIZE * BOARD_SIZE - 1 ? 0 : i + 1
    );

    let shuffled;
    do {
      shuffled = shuffleArray(numbers);
    } while (!isSolvable(shuffled)); // 퍼즐이 풀 수 있는 상태인지 확인

    setTiles(shuffled);
  };

  // 게임 시작 시 자동 섞기
  useEffect(() => {
    initializeBoard();
  }, []);

  // 퍼즐이 풀 수 있는 상태인지 확인하는 함수
  const isSolvable = (board: number[]) => {
    let inversions = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        if (board[i] && board[j] && board[i] > board[j]) {
          inversions++;
        }
      }
    }
    return inversions % 2 === 0; // 짝수 개의 역순이 있어야 퍼즐 해결 가능
  };

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
