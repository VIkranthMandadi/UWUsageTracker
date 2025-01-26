import React, { useState } from "react";
import { Image, StyleSheet, View, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BasketballCourt } from "@/components/BasketballCourt";
import { SidePanel } from "@/components/SidePanel";

export default function NicScreen() {
  const [isSidePanelVisible, setSidePanelVisible] = useState(false); // Initial state is hidden
  const [courtName, setCourtName] = useState("");
  const [statuses, setStatuses] = useState<{ [key: string]: string }>({
    "Court 1": "empty",
    "Court 2": "empty",
    "Court 3": "empty",
    "Court 4": "empty",
    "Court 5": "empty",
  });

  // Handle court press to show side panel
  const handleCourtPress = (name: string) => {
    if (isSidePanelVisible) return; // Prevent pressing another court if the side panel is open

    setCourtName(name); // Set court name
    setSidePanelVisible(true); // Make the side panel visible (pop out)
  };

  // Close the side panel
  const closeSidePanel = () => {
    setSidePanelVisible(false); // Hide side panel
  };

  // Close side panel when tapping outside of it
  const handleTouchablePress = () => {
    if (isSidePanelVisible) {
      setSidePanelVisible(false); // Close side panel when tapping outside
    }
  };

  const onStatusChange = (courtName: string, status: string) => {

    if (courtName) {
      setStatuses((prevState) => ({
        ...prevState,
        [courtName]: status,
      }));
    }
    console.log(statuses)
  };

  return (
    <ParallaxScrollView
      logo={
        <Image
          source={require("@/assets/images/wisconsinLogo.png")}
          style={styles.reactLogo}
        />
      }
      headerContent={<ThemedText type="title">Basketball Courts</ThemedText>}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      {/* Main content wrapped in Pressable to detect outside taps */}
      <Pressable onPress={handleTouchablePress} style={{ flex: 1 }}>
        {/* Side Panel */}
        <SidePanel
          onClose={closeSidePanel}
          courtName={courtName}
          visible={isSidePanelVisible} // Control visibility of side panel
          onStatusChange={onStatusChange}
        />

        {/* Floor 3 Courts */}
        <ThemedView style={styles.floorContainer}>
          <ThemedText type="subtitle">Floor 3</ThemedText>
          <View style={styles.courtGrid}>
            <View style={styles.courtWrapper}>
              <BasketballCourt
                onCourtPress={() => handleCourtPress("Court 1")}
                status={statuses["Court 1"]}
              />
            </View>
            <View style={styles.courtWrapper}>
              <BasketballCourt
                onCourtPress={() => handleCourtPress("Court 2")}
                status={statuses["Court 2"]}
              />
            </View>
            <View style={styles.courtWrapper}>
              <BasketballCourt
                onCourtPress={() => handleCourtPress("Court 3")}
                status={statuses["Court 3"]}
              />
            </View>
          </View>
        </ThemedView>

        {/* Floor 1 Courts */}
        <ThemedView style={styles.floorContainer}>
          <ThemedText type="subtitle">Floor 1</ThemedText>
          <View style={styles.courtGrid}>
            <View style={styles.courtWrapper}>
              <BasketballCourt
                onCourtPress={() => handleCourtPress("Court 4")}
                status={statuses["Court 4"]}
              />
            </View>
            <View style={styles.courtWrapper}>
              <BasketballCourt
                onCourtPress={() => handleCourtPress("Court 5")}
                status={statuses["Court 5"]}
              />
            </View>
          </View>
        </ThemedView>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  floorContainer: {
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  courtGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
    marginLeft: -25,
  },
  courtWrapper: {
    flexBasis: "30%",
    maxWidth: "30%",
    aspectRatio: 1 / 2,
  },
  reactLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
