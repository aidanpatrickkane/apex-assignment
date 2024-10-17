// ActionItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionItemProps {
  image: any;
  title: string;
  subtitle: string;
  isActive: boolean;
  isCompleted: boolean;
  onPress: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  image,
  title,
  subtitle,
  isActive,
  isCompleted,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer,
        isActive && !isCompleted && styles.activeBoxShadow,
      ]}
      onPress={onPress}
      disabled={!isActive}
    >
      <View style={styles.progressIndicator}>
        <View
          style={[
            styles.progressLine,
            isActive ? styles.activeProgressLine : styles.inactiveProgressLine,
          ]}
        />
      </View>
      {isCompleted ? (
        <View style={styles.completedImageContainer}>
          <Ionicons name="checkmark" size={32} color="white" />
        </View>
      ) : (
        <Image source={image} style={[styles.image, !isActive && styles.inactiveImage]} />
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.title, isActive ? styles.activeTitle : styles.inactiveText]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, isActive ? styles.activeSubtitle : styles.inactiveText]}>
          {subtitle}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons
          name={isCompleted ? 'reload' : 'play'}
          size={32}
          color={isActive ? '#000000' : '#cccccc'}
          style={styles.icon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  activeContainer: {
    backgroundColor: '#FFFFFF',
  },
  activeBoxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressIndicator: {
    width: 3,
    height: 60,
    marginRight: 12,
  },
  progressLine: {
    height: 60,
    width: 3,
    borderRadius: 1.5,
  },
  activeProgressLine: {
    backgroundColor: '#000000',
  },
  inactiveProgressLine: {
    backgroundColor: '#cccccc',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  inactiveImage: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  activeTitle: {
    color: '#000000',
  },
  activeSubtitle: {
    color: '#666666',
  },
  inactiveText: {
    color: '#cccccc',
  },
  icon: {
    marginLeft: 12,
  },
  completedImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionItem;

