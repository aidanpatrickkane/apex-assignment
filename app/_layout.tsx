import { Stack } from 'expo-router';
import React from 'react';
import { NotesProvider } from '@/NotesContext';

export default function RootLayout() {

  return (
   <NotesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="AudioPlayer" options={{ headerShown: false }} />
        <Stack.Screen name="AllNotes" options={{ title: 'All Notes' }} />
      </Stack>
    </NotesProvider>
  );
}