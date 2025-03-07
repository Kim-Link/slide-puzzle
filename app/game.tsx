import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Board from "../components/Board";

const GameScreen = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [isImageMode, setIsImageMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>슬라이드 퍼즐 게임</Text>

      {/* 퍼즐 보드 */}
      <Board boardSize={boardSize} isImageMode={isImageMode} />

      {/* 게임 모드 선택 버튼 */}
      <View style={styles.buttonContainer}>
        {[3, 4, 5, 6].map((size) => (
          <TouchableOpacity key={size} style={styles.button} onPress={() => setBoardSize(size)}>
            <Text style={styles.buttonText}>{size}x{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 이미지 모드 선택 버튼 */}
      <TouchableOpacity style={[styles.button, styles.imageModeButton]} onPress={() => setIsImageMode(!isImageMode)}>
        <Text style={styles.buttonText}>{isImageMode ? "숫자 퍼즐" : "이미지 퍼즐"}</Text>
      </TouchableOpacity>
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
  imageModeButton: {
    marginTop: 10,
    backgroundColor: "#28a745",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GameScreen;
