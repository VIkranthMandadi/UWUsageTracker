import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View, Image } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  logo: ReactElement;
  headerContent: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  logo,
  headerContent,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        {/* Header Section */}
        <View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}
        >
          <View style={styles.headerContentContainer}>
            <View style={styles.logoContainer}>{logo}</View>
            <Animated.View style={[styles.headerContent, headerAnimatedStyle]}>
              {headerContent}
            </Animated.View>
          </View>
        </View>

        {/* Content Section */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingTop: 24,
    position: "relative",
  },
  headerContentContainer: {
    flexDirection: "row", // Align logo and header content horizontally
    alignItems: "center", // Vertically center them
    justifyContent: "flex-start",
    position: "absolute",
    top: 70, // Adjust if necessary
    left: 16, // Adjust spacing from the left edge
    zIndex: 1,
  },
  logoContainer: {
    marginRight: 16, // Space between logo and header content
  },
  headerContent: {
    zIndex: 0,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});