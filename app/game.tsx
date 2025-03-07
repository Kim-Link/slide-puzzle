import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Board from "../components/Board";

const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>슬라이드 퍼즐 게임</Text>
      <Board />
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
});

export default GameScreen;
