import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity, // to handle status selection
} from "react-native";

interface SidePanelProps {
  onClose: () => void;
  courtName: string;
  visible: boolean;
  onStatusChange: (name: string, status: string) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  onClose,
  courtName,
  visible,
  onStatusChange,
}) => {
  const [panelPosition] = useState(new Animated.Value(-300)); // Start off-screen
  const [opacity] = useState(new Animated.Value(0)); // Start with no opacity
  const [currentStatus, setCurrentStatus] = useState(""); // No preselected status
  const [statusOptions] = useState([
    "busy+",
    "busy",
    "half-busy",
    "light",
    "empty",
    "not-open",
  ]);

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status); // Update the status when a new option is selected
  };

  const handleUpdateStatus = () => {
    console.log(`Status for ${courtName} updated to ${currentStatus}`);
    onStatusChange(courtName, currentStatus);
    onClose();
    // Here you can add logic to update the status on your backend or local state
  };

  useEffect(() => {
    // Animate the panel in or out when 'visible' changes
    if (visible) {
      Animated.parallel([
        Animated.timing(panelPosition, {
          toValue: -50, // Move it to just stay on the side
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out and fade out
      Animated.parallel([
        Animated.timing(panelPosition, {
          toValue: -300, // Slide completely out of view
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Reset the status when the panel closes
      setCurrentStatus("");
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.sidePanel,
        { transform: [{ translateX: panelPosition }], opacity },
      ]}
    >
      <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
        <View style={styles.panelContent}>
          {/* Court Name and Current Status */}
          <Text style={styles.sidePanelText}>
            {courtName}: {currentStatus || "None selected"}
          </Text>
          <View style={styles.statusOptions}>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  currentStatus === status && styles.selectedStatusButton,
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    currentStatus === status && styles.selectedStatusButtonText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Update Status or Vote Button */}
          <View style={styles.closeButtonContainer}>
            {currentStatus ? (
              <Button
                title="Update Status and Close"
                onPress={handleUpdateStatus}
              />
            ) : (
              <Button title="Close" onPress={onClose} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidePanel: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 999,
    justifyContent: "flex-start", // Align to the top of the screen
    paddingTop: 40, // Add some top padding for better spacing
  },
  panelContent: {
    flex: 1,
    justifyContent: "space-between", // Adjust to allow space between items
    alignItems: "center",
    padding: 20,
  },
  sidePanelText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  statusOptions: {
    width: "100%",
    marginBottom: 20,
  },
  statusButton: {
    padding: 10,
    backgroundColor: "#3A3A3A", // Default background color
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedStatusButton: {
    backgroundColor: "#FFD700", // Highlighted background color
  },
  statusButtonText: {
    color: "white",
    fontSize: 16,
  },
  selectedStatusButtonText: {
    fontWeight: "bold", // Make the text bold when selected
  },
  closeButtonContainer: {
    marginTop: "auto", // Push the close button to the bottom
    width: "100%", // Full width for the close button
  },
});
