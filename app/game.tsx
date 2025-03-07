import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Board from "../components/Board";

const GameScreen = () => {
  const [boardSize, setBoardSize] = useState(3); // 기본 3x3

  return (
    <View style={styles.container}>
      <Text style={styles.title}>슬라이드 퍼즐 게임</Text>
      
      {/* 퍼즐 보드 */}
      <Board boardSize={boardSize} />

      {/* 게임 모드 선택 버튼 */}
      <View style={styles.buttonContainer}>
        {[3, 4, 5, 6].map((size) => (
          <TouchableOpacity key={size} style={styles.button} onPress={() => setBoardSize(size)}>
            <Text style={styles.buttonText}>{size}x{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GameScreen;
