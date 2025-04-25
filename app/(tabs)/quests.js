import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestsScreen() {
  const [activeTab, setActiveTab] = useState('daily');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample quests (would come from state/storage in full app)
  const [dailyQuests, setDailyQuests] = useState([
    {
      id: '1',
      title: 'Morning Exercise',
      description: 'Complete 15 minutes of exercise',
      expReward: 20,
      difficulty: 'Easy',
      type: 'Daily',
      completed: false
    },
    {
      id: '2',
      title: 'Study Session',
      description: 'Study for 30 minutes without distractions',
      expReward: 30,
      difficulty: 'Medium',
      type: 'Daily',
      completed: false
    },
    {
      id: '3',
      title: 'Meal Preparation',
      description: 'Prepare a healthy meal',
      expReward: 25,
      difficulty: 'Easy',
      type: 'Daily',
      completed: false
    }
  ]);

  const [customQuests, setCustomQuests] = useState([
    {
      id: 'c1',
      title: 'Complete Project',
      description: 'Finish the current project milestone',
      expReward: 50,
      difficulty: 'Hard',
      type: 'Custom',
      completed: false
    }
  ]);

  // Function to complete a quest
  const completeQuest = (questId, questType) => {
    if (questType === 'daily') {
      setDailyQuests(quests =>
        quests.map(q =>
          q.id === questId ? { ...q, completed: true } : q
        )
      );
    } else {
      setCustomQuests(quests =>
        quests.map(q =>
          q.id === questId ? { ...q, completed: true } : q
        )
      );
    }

    // In real app, would also add experience to user here
  };

  // Render a quest item
  const QuestItem = ({ quest, type }) => (
    <View style={styles.questItem}>
      <View style={styles.questHeader}>
        <Text style={styles.questTitle}>{quest.title}</Text>
        <View style={[
          styles.difficultyBadge,
          quest.difficulty === 'Easy' ? styles.easyBadge :
          quest.difficulty === 'Medium' ? styles.mediumBadge :
          styles.hardBadge
        ]}>
          <Text style={styles.difficultyText}>{quest.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.questDesc}>{quest.description}</Text>
      <View style={styles.questFooter}>
        <Text style={styles.questReward}>+{quest.expReward} EXP</Text>
        {quest.completed ? (
          <View style={styles.completedButton}>
            <Text style={styles.completedButtonText}>Completed</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => completeQuest(quest.id, type)}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quests</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
          onPress={() => setActiveTab('daily')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'daily' && styles.activeTabText
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'custom' && styles.activeTab]}
          onPress={() => setActiveTab('custom')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'custom' && styles.activeTabText
            ]}
          >
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.questList}>
        {activeTab === 'daily' ? (
          dailyQuests.length > 0 ? (
            dailyQuests.map(quest => (
              <QuestItem key={quest.id} quest={quest} type="daily" />
            ))
          ) : (
            <Text style={styles.emptyText}>No daily quests available</Text>
          )
        ) : (
          customQuests.length > 0 ? (
            customQuests.map(quest => (
              <QuestItem key={quest.id} quest={quest} type="custom" />
            ))
          ) : (
            <Text style={styles.emptyText}>No custom quests available</Text>
          )
        )}
      </ScrollView>

      {/* Add quest modal - would be expanded in full app */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Custom Quest</Text>
            <Text style={styles.modalText}>
              Create your own quests to boost your productivity!
            </Text>
            <Text style={styles.comingSoon}>
              This feature will be coming soon
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C5CE7',
  },
  tabText: {
    fontSize: 16,
    color: '#bbb',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  questList: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  emptyText: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  questItem: {
    backgroundColor: '#1E1E30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  difficultyBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  mediumBadge: {
    backgroundColor: '#FFC107',
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  questDesc: {
    color: '#bbb',
    marginBottom: 12,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questReward: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  completedButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedButtonText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  modalText: {
    color: '#bbb',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoon: {
    color: '#6C5CE7',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});