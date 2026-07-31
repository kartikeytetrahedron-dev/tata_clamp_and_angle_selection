import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import colors from "../src/theme/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bracket Orientation Training</Text>

      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => router.push("/game")}
      >
        <Text style={styles.startText}>Start Training</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    color: colors.textPrimary,
    marginBottom: 40,
    fontWeight: "700",
  },

  startBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 10,
  },

  startText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});