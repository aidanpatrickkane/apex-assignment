// Challenges.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Challenge {
  id: string;
  text: string;
  completed: boolean;
}

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', text: 'Set 5K PR', completed: false },
  ]);

  const [newChallengeText, setNewChallengeText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addChallenge = () => {
    if (newChallengeText.trim()) {
      const newChallenge: Challenge = {
        id: Date.now().toString(),
        text: newChallengeText.trim(),
        completed: false,
      };
      setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
      setNewChallengeText('');
      setIsAdding(false);
    } else {
      alert('Please enter a challenge.');
    }
  };

  const toggleChallenge = (id: string) => {
    setChallenges(prevChallenges =>
      prevChallenges
        .map(challenge =>
          challenge.id === id
            ? { ...challenge, completed: !challenge.completed }
            : challenge
        )
        .sort((a, b) => Number(a.completed) - Number(b.completed))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Challenges</Text>
      <View style={styles.listContent}>
        {challenges.map(item => (
          <View key={item.id} style={styles.challengeItem}>
            <TouchableOpacity onPress={() => toggleChallenge(item.id)} style={styles.checkboxContainer}>
              <Ionicons
                name={item.completed ? 'checkbox' : 'square-outline'}
                size={24}
                color={item.completed ? '#4CAF50' : '#999'}
              />
              <Text style={[styles.challengeText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {isAdding ? (
        <View style={styles.addChallengeContainer}>
          <TextInput
            style={styles.input}
            placeholder="New challenge"
            value={newChallengeText}
            onChangeText={setNewChallengeText}
            onSubmitEditing={addChallenge}
            returnKeyType="done"
          />
          <View style={styles.addButtons}>
            <TouchableOpacity onPress={addChallenge} style={styles.addButton}>
              <Ionicons name="checkmark" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAdding(false)} style={styles.cancelButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.addChallengeButton} onPress={() => setIsAdding(true)}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addChallengeText}>Add Challenge</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  challengeItem: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  addChallengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#323232',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
  },
  addChallengeText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  addChallengeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
  },
});

export default Challenges;

