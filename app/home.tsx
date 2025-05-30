import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const dummySessions = [
  { id: '1', title: 'TwinMind App Development Discussion and Public Speaking Practice', time: '9:11 PM', date: 'Mon, May 12', duration: '1h 42m' },
  { id: '2', title: 'AI App Overview: Founder’s Conversation About Product Features...', time: '10:32 AM', date: 'Sat, May 10', duration: '21m' },
  { id: '3', title: 'Feature Discussion: Audio Saving, UI Simplification...', time: '9:25 PM', date: 'Fri, May 9', duration: '27m' },
];

export default function HomeScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.sessionCard}>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleBar}>Memories</Text>
      <FlatList
        data={dummySessions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.askBtn}>
          <Text style={styles.askText}>Ask All Memories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureBtn}>
          <Text style={styles.captureText}>🎤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  titleBar: { fontSize: 20, fontWeight: '600', padding: 16 },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  time: { color: '#555', fontSize: 12, marginRight: 12 },
  details: { flex: 1 },
  title: { fontWeight: '500', fontSize: 15, color: '#333' },
  duration: { fontSize: 12, color: '#999', marginTop: 4 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  askBtn: {
    backgroundColor: '#ECECEC',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  askText: { color: '#333' },
  captureBtn: {
    backgroundColor: '#0066FF',
    borderRadius: 30,
    padding: 16,
  },
  captureText: { color: '#fff', fontSize: 18 },
});
