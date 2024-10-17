import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NoteProps {
  title: string;
  content: string;
  timeAgo: string;
  isFavorite: boolean;
}

const Note: React.FC<NoteProps> = ({ title, content, timeAgo, isFavorite }) => (
  <View style={styles.noteContainer}>
    <Text style={styles.noteTitle} numberOfLines={1}>{title}</Text>
    <Text style={styles.noteContent} numberOfLines={3}>{content}</Text>
    <View style={styles.noteFooter}>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
      <View style={styles.noteActions}>
        <Ionicons name={isFavorite ? "star" : "star-outline"} size={20} color={isFavorite ? "#FFD700" : "#CCCCCC"} />
        <Ionicons name="ellipsis-horizontal" size={20} color="#000000" style={styles.moreIcon} />
      </View>
    </View>
  </View>
);

const Notes: React.FC = () => {
  const recentNotes: NoteProps[] = [
    { title: "Lorem ipsum dolor sit amet", content: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...", timeAgo: "1 week ago", isFavorite: true },
    { title: "Note 2", content: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...", timeAgo: "57 sec ago", isFavorite: false },
    { title: "Note 3", content: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore...", timeAgo: "57 sec ago", isFavorite: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all notes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notesGrid}>
        <TouchableOpacity style={styles.addNoteContainer}>
          <Ionicons name="add" size={40} color="#CCCCCC" />
        </TouchableOpacity>
        {recentNotes.map((note, index) => (
          <Note key={index} {...note} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#666666',
  },
  notesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addNoteContainer: {
    width: '48%',
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  noteContainer: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: '#666666',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timeAgo: {
    fontSize: 12,
    color: '#999999',
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreIcon: {
    marginLeft: 8,
  },
});

export default Notes;

