import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import stringToColors from "@/components/ColorsMap";

// Define the props for the BasketballCourt component
interface BasketballCourtProps {
  onCourtPress?: () => void; // Optional callback for the top half press
  status?: string;
}

export const BasketballCourt: React.FC<BasketballCourtProps> = ({
  onCourtPress,
  status = "empty",
}) => {
  return (
    <View style={styles.court}>
      <View
        style={[
          styles.pressableArea,
          { top: 0, backgroundColor: stringToColors(status)[0] },
        ]}
      />
      <View
        style={[
          styles.pressableArea,
          { bottom: 0, backgroundColor: stringToColors(status)[1] },
        ]}
      />
      <View
        style={[styles.outsideLine, { zIndex: 2, pointerEvents: "none" }]}
      />
      <View
        style={[styles.halfwayLine, { zIndex: 2, pointerEvents: "none" }]}
      />
      <View style={styles.centerCircle} />
      <Pressable
        style={[styles.pressableArea, styles.topHalf]}
        onPress={onCourtPress}
      >
        <View style={styles.topThreePointLine} />
        <View style={styles.topKey} />
      </Pressable>
      <Pressable
        style={[styles.pressableArea, styles.bottomHalf]}
        onPress={onCourtPress}
      >
        <View style={styles.bottomThreePointLine} />
        <View style={styles.bottomKey} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  court: {
    flex: 1,
    aspectRatio: 2 / 3,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    position: "relative",
    overflow: "hidden",
    margin: 5,
  },
  pressableArea: {
    position: "absolute",
    width: "100%",
    height: "50%",
  },
  topHalf: {
    top: 0,
    zIndex: 3, // Ensure the top half is above the lines
  },
  bottomHalf: {
    bottom: 0,
    zIndex: 3, // Ensure the bottom half is above the lines
  },
  centerCircle: {
    position: "absolute",
    width: "45%",
    height: "30%",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000",
    top: "35%",
    left: "27.5%",
  },
  topThreePointLine: {
    position: "absolute",
    width: "70%",
    height: "80%",
    borderRadius: "48%",
    borderWidth: 2,
    borderColor: "#000",
    top: "-30%",
    left: "15%",
  },
  bottomThreePointLine: {
    position: "absolute",
    width: "70%",
    height: "80%",
    borderRadius: "48%",
    borderWidth: 2,
    borderColor: "#000",
    top: "50%",
    left: "15%",
  },
  topKey: {
    position: "absolute",
    width: "20%",
    height: "50%",
    borderWidth: 2,
    borderColor: "#000",
    top: "-15%",
    left: "40%",
  },
  bottomKey: {
    position: "absolute",
    width: "20%",
    height: "50%",
    borderWidth: 2,
    borderColor: "#000",
    top: "65%",
    left: "40%",
  },
  halfwayLine: {
    position: "absolute",
    height: 2,
    width: "100%",
    backgroundColor: "#000",
    top: "50%",
    zIndex: 2, // Keep the halfway line under the pressable areas
  },
  outsideLine: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    zIndex: 2, // Keep the outside line under the pressable areas
  },
});
