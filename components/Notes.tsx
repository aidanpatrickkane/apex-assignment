// Notes.tsx
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NotesContext } from '../NotesContext';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  time: Date;
  isFavorite: boolean;
}

const Note: React.FC<{ note: NoteProps; onToggleFavorite: () => void }> = ({ note, onToggleFavorite }) => (
  <View style={styles.noteContainer}>
    <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
    <Text style={styles.noteContent} numberOfLines={3}>{note.content}</Text>
    <View style={styles.noteFooter}>
      <Text style={styles.timeAgo}>{formatTimeAgo(note.time)}</Text>
      <View style={styles.noteActions}>
        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons
            name={note.isFavorite ? 'star' : 'star-outline'}
            size={20}
            color={note.isFavorite ? '#FFD700' : '#CCCCCC'}
          />
        </TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={20} color="#000000" style={styles.moreIcon} />
      </View>
    </View>
  </View>
);

const Notes: React.FC = () => {
  const { notes, addNote, toggleFavorite } = useContext(NotesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const router = useRouter();

  const handleAddNote = () => {
    setModalVisible(true);
  };

  const saveNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: NoteProps = {
        id: Date.now().toString(),
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        time: new Date(),
        isFavorite: false,
      };
      addNote(newNote);
      setNewNoteTitle('');
      setNewNoteContent('');
      setModalVisible(false);
    } else {
      alert('Please enter both title and content.');
    }
  };

  // Sort and limit notes
  const sortedNotes = notes
    .sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) {
        return a.isFavorite ? -1 : 1;
      }
      return b.time.getTime() - a.time.getTime();
    })
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity onPress={() => router.push('../AllNotes')}>
          <Text style={styles.seeAll}>See all notes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notesGrid}>
        <TouchableOpacity style={styles.addNoteContainer} onPress={handleAddNote}>
          <Ionicons name="add" size={40} color="#CCCCCC" />
        </TouchableOpacity>
        {sortedNotes.map(note => (
          <Note
            key={note.id}
            note={note}
            onToggleFavorite={() => toggleFavorite(note.id)}
          />
        ))}
      </View>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newNoteTitle}
            onChangeText={setNewNoteTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Content"
            value={newNoteContent}
            onChangeText={setNewNoteContent}
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

// Helper function to format time ago
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
    shadowColor: '#000',
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
  modalContainer: {
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexGrow: 1,
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

export default Notes;


