import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';

const tabs = ['Camera', 'Logs', 'Info'];

const sampleLogs = [
  { id: '1', date: '2025-10-15', ph: 7.01, color: '#8dc63f' },
  { id: '2', date: '2025-10-16', ph: 6.81, color: '#64a24d' },
  { id: '3', date: '2025-10-17', ph: 8.32, color: '#d97f2b' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Camera');
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AquaBond</Text>
        <Text style={styles.subtitle}>PFAS-free, biodegradable bandage kits</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'Camera' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Scan Camera</Text>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>Camera feed placeholder</Text>
            </View>
            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Capture</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.buttonText}>Analyze</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Write scan notes..."
              multiline
            />
          </View>
        )}

        {activeTab === 'Logs' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Scan Logs</Text>
            <FlatList
              data={sampleLogs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.logItem}>
                  <View style={[styles.colorBadge, { backgroundColor: item.color }]} />
                  <View style={styles.logRow}>
                    <Text style={styles.logDate}>{item.date}</Text>
                    <Text style={styles.logPh}>pH {item.ph.toFixed(2)}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {activeTab === 'Info' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>About the Project</Text>
            <Text style={styles.cardText}>
              AquaBond is a platform designed to help communities monitor water quality and environmental conditions using
              real-time color detection and mobile technology. Our system connects a smart camera scanner with a web dashboard to make environmental data accessible and easy to understand.
            </Text>
            <Text style={styles.cardTitle}>How the App Works</Text>
            <Text style={styles.cardText}>1. Use the camera to scan water color sample</Text>
            <Text style={styles.cardText}>2. The app converts to Lab color and estimates pH through calibration model</Text>
            <Text style={styles.cardText}>3. Save logs, review history, and export reports</Text>
            <Text style={styles.cardTitle}>Developer</Text>
            <Text style={styles.cardText}>Add your name and credits here.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab} style={styles.tabButton} onPress={() => setActiveTab(tab)}>
            <Text style={activeTab === tab ? styles.tabTextActive : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f8f2' },
  header: { padding: 20, backgroundColor: '#e6f3e9', borderBottomWidth: 1, borderBottomColor: '#cae5ce' },
  title: { fontSize: 34, fontWeight: 'bold', color: '#185a3f' },
  subtitle: { fontSize: 14, color: '#247a53', marginTop: 4 },
  content: { paddingHorizontal: 16, paddingVertical: 8, flexGrow: 1 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a513d', marginBottom: 8 },
  cardText: { fontSize: 15, color: '#3a534e', marginBottom: 6, lineHeight: 21 },
  cameraPlaceholder: { height: 220, borderRadius: 14, borderWidth: 1, borderColor: '#bfd8c5', backgroundColor: '#e9f4ec', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  placeholderText: { color: '#7a9f8b' },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  primaryButton: { flex: 1, marginRight: 8, backgroundColor: '#21825a', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  secondaryButton: { flex: 1, marginLeft: 8, backgroundColor: '#47a175', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  textInput: { minHeight: 80, textAlignVertical: 'top', borderColor: '#d7e6d9', borderWidth: 1, borderRadius: 10, padding: 10, backgroundColor: '#f8fff8' },
  logItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  colorBadge: { width: 16, height: 16, borderRadius: 8, marginRight: 10 },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  logDate: { fontSize: 16, color: '#2f5f4a', fontWeight: '500' },
  logPh: { fontSize: 16, color: '#1f4b36', fontWeight: '600' },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#cfe2d4', paddingVertical: 12 },
  tabButton: { flex: 1, alignItems: 'center' },
  tabText: { color: '#6f9a88', fontSize: 15, fontWeight: '600' },
  tabTextActive: { color: '#1b5d42', fontSize: 15, fontWeight: '700' },
});
