import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../NotesContext';
import { useRouter } from 'expo-router';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  time: Date;
  isFavorite: boolean;
}

const AllNotes: React.FC = () => {
  const { notes, toggleFavorite, deleteNote, updateNote } = useContext(NotesContext);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<NoteProps | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const router = useRouter();

  const openEditModal = (note: NoteProps) => {
    setCurrentNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditModalVisible(true);
  };

  const saveEditedNote = () => {
    if (currentNote && editedTitle.trim() && editedContent.trim()) {
      updateNote({
        ...currentNote,
        title: editedTitle.trim(),
        content: editedContent.trim(),
        time: new Date(),
      });
      setEditModalVisible(false);
    } else {
      alert('Please enter both title and content.');
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteNote(id), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: NoteProps }) => (
    <View style={styles.noteContainer}>
      <TouchableOpacity onPress={() => openEditModal(item)}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
      </TouchableOpacity>
      <View style={styles.noteFooter}>
        <Text style={styles.timeAgo}>{formatTimeAgo(item.time)}</Text>
        <View style={styles.noteActions}>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Ionicons
              name={item.isFavorite ? 'star' : 'star-outline'}
              size={20}
              color={item.isFavorite ? '#FFD700' : '#CCCCCC'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmDelete(item.id)}>
            <Ionicons name="trash" size={20} color="#FF0000" style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>All Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* edit note modal */}
      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Content"
            value={editedContent}
            onChangeText={setEditedContent}
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedNote}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// for formatting time ago on each note
const formatTimeAgo = (time: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000); // in seconds

  if (diff < 60) return `${diff} sec ago`;
  else if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  else if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  else if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  else return time.toLocaleDateString();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 16,
    color: '#666666',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  timeAgo: {
    fontSize: 12,
    color: '#999999',
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginLeft: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
    padding: 12,
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default AllNotes;
