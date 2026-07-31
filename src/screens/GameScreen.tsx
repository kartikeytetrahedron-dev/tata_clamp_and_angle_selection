import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import DropZone from "../components/DropZone";
import DraggableItem from "../components/DraggableItem";
import { bracketItems, degreeItems } from "../constants/gameData";
import colors from "../theme/colors";

const GameScreen = () => {
  const [cards, setCards] = useState([
    { image: null, degree: null, locked: false },
    { image: null, degree: null, locked: false },
    { image: null, degree: null, locked: false },
    { image: null, degree: null, locked: false },
  ]);

  const [dropZoneLayout, setDropZoneLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [availableImages, setAvailableImages] = useState(bracketItems);
  const [availableDegrees, setAvailableDegrees] = useState(degreeItems);

  const [dragItem, setDragItem] = useState<any>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  const handleDrop = (data: any, x: number, y: number) => {
    // check if inside drop zone
    if (
      x < dropZoneLayout.x ||
      x > dropZoneLayout.x + dropZoneLayout.width ||
      y < dropZoneLayout.y ||
      y > dropZoneLayout.y + dropZoneLayout.height
    ) {
      return;
    }

    // convert to dropzone relative position
    const relativeX = x - dropZoneLayout.x;
    const relativeY = y - dropZoneLayout.y;

    // card grid calculation
    const cardWidth = dropZoneLayout.width / 2;
    const cardHeight = 150;

    const col = Math.floor(relativeX / cardWidth);
    const row = Math.floor(relativeY / cardHeight);

    const index = row * 2 + col;

    if (index < 0 || index >= cards.length) return;

    setCards((prev) => {
      const copy = [...prev];

      const card = copy[index];

      if (card.locked) return prev;

      if (data.image && !card.image) {
        card.image = data;
      } else if (data.value && !card.degree) {
        card.degree = data;
      }

      if (card.image && card.degree) {
        card.locked = true;

        setAvailableImages((p) => p.filter((i) => i.id !== card.image.id));
        setAvailableDegrees((p) => p.filter((i) => i.id !== card.degree.id));
      }

      return copy;
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={styles.left}
          onLayout={(e) => {
            const { x, y, width, height } = e.nativeEvent.layout;
            setDropZoneLayout({ x, y, width, height });
          }}
        >
          <DropZone cards={cards} />
        </View>

        <View style={styles.rightBoard}>
          <ScrollView
            style={styles.imageSection}
            contentContainerStyle={styles.imageGrid}
            showsVerticalScrollIndicator={false}
          >
            {/* <Text style={styles.imageTitle}>Drag The Brackets in Drop Zone</Text> */}
            {availableImages.map((item) => (
              <View key={item.id} style={styles.gridItem}>
                <DraggableItem
                  data={item}
                  onDrop={(data, x, y) => handleDrop(data, x, y)}
                  onDragStart={(d) => setDragItem(d)}
                  onDragMove={(p) => setDragPos(p)}
                  onDragEnd={() => setDragItem(null)}
                />
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={styles.degreeSection}
            contentContainerStyle={styles.degreeContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* <Text style={styles.imageTitle}>Drag Right Angle Orientation</Text> */}
            {availableDegrees.map((item) => (
              <View key={item.id} style={styles.degreeTag}>
                
                <DraggableItem
                  data={item}
                  onDrop={handleDrop}
                  onDragStart={(d) => setDragItem(d)}
                  onDragMove={(p) => setDragPos(p)}
                  onDragEnd={() => setDragItem(null)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        {dragItem && (
          <View
            pointerEvents="none"
            style={[
              styles.dragOverlay,
              {
                left: dragPos.x - 40,
                top: dragPos.y - 40,
              },
            ]}
          >
            {dragItem.image ? (
              <Image
                source={dragItem.image}
                style={styles.dragImage}
                resizeMode="contain"
              />
            ) : dragItem.value ? (
              <View style={styles.dragDegree}>
                <Text style={styles.dragDegreeText}>{dragItem.value} deg</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
    padding: 16,
  },

  left: {
    width: "60%",
    marginRight: 12,
  },

  rightBoard: {
    width: "40%",
    flexDirection: "column",
  },

  imageSection: {
    flex: 1,

  },

  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  degreeSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#2A355A",
    paddingTop: 10,
  },

  degreeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

dragDegree:{
backgroundColor:colors.card,
borderRadius:20,
paddingHorizontal:16,
paddingVertical:8,
borderWidth:1,
borderColor:colors.primary
},

dragDegreeText:{
color:colors.textPrimary,
fontWeight:"600"
},
imageTitle:{
  fontSize:18,
  fontWeight:800,
  color:colors.primary
},
  gridItem: {
    width: "48%",
  },

  degreeTag: {
    width: "48%",
  },

  dragOverlay: {
    position: "absolute",
    zIndex: 9999,
    elevation: 9999,
  },

  dragImage: {
    width: 80,
    height: 80,
  },
});

export default GameScreen;
