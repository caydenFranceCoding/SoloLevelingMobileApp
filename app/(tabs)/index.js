import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // Example user data (in a real app, you'd get this from state/context)
  const userStats = {
    level: 5,
    exp: 80,
    expToNextLevel: 220,
    stats: {
      strength: 8,
      intelligence: 11,
      endurance: 7,
      charisma: 6,
      luck: 5
    },
    rank: 'C-Rank Hunter',
    statPoints: 3,
    questsCompleted: 0,
    dailyStreak: 2
  };

  // Sample quests data
  const quests = [
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
  ];

  // Function to complete a quest
  const completeQuest = (questId) => {
    console.log(`Completed quest: ${questId}`);
    // In a real app, you'd update state here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        {/* Header with Level and Rank */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Solo Daily</Text>
            <Text style={styles.headerSubtitle}>{userStats.rank}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lvl {userStats.level}</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Hunter Status</Text>
            {userStats.statPoints > 0 && (
              <TouchableOpacity
                style={styles.allocateButton}
                onPress={() => router.push('/profile')}
              >
                <Text style={styles.allocateButtonText}>
                  +{userStats.statPoints} Points
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Experience Bar */}
          <View style={styles.expContainer}>
            <Text style={styles.expText}>
              EXP: {userStats.exp} / {userStats.expToNextLevel}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${(userStats.exp / userStats.expToNextLevel) * 100}%` }
                ]}
              />
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {Object.entries(userStats.stats).map(([stat, value]) => (
              <View key={stat} style={styles.statItem}>
                <Text style={styles.statLabel}>
                  {stat.substring(0, 3).toUpperCase()}
                </Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Dungeons */}
        <View style={styles.dungeonCard}>
          <Text style={styles.cardTitle}>Daily Dungeon</Text>
          <View style={styles.dungeonInfo}>
            <View style={styles.dungeonTextContainer}>
              <Text style={styles.dungeonTitle}>Productivity Gate</Text>
              <Text style={styles.dungeonDesc}>
                Complete 3 daily quests to receive a bonus reward
              </Text>
              <Text style={styles.dungeonReward}>Reward: +50 EXP, +1 Stat Point</Text>
            </View>
            <View style={styles.dungeonProgress}>
              <Text style={styles.dungeonProgressText}>
                {quests.filter(q => q.completed).length}/3
              </Text>
            </View>
          </View>
        </View>

        {/* Quests */}
        <View style={styles.questsContainer}>
          <View style={styles.questsHeader}>
            <Text style={styles.cardTitle}>Daily Quests</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push('/quests')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {quests.map(quest => (
            <View key={quest.id} style={styles.questItem}>
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
                    onPress={() => completeQuest(quest.id)}
                  >
                    <Text style={styles.buttonText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Skills Teaser */}
        <TouchableOpacity
          style={styles.skillsTeaser}
          onPress={() => router.push('/skills')}
        >
          <Text style={styles.cardTitle}>Skills</Text>
          <View style={styles.skillsTeaserContent}>
            <Text style={styles.skillsTeaserText}>
              You have {userStats.level >= 3 ? '1' : '0'} skills available to unlock
            </Text>
            <Text style={styles.skillsTeaserAction}>View Skills →</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6C5CE7',
    marginTop: 2,
  },
  levelBadge: {
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  allocateButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  allocateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expContainer: {
    marginBottom: 12,
  },
  expText: {
    color: '#ddd',
    marginBottom: 6,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#6C5CE7',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    width: '20%',
  },
  statLabel: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dungeonCard: {
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#3D3D56',
  },
  dungeonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dungeonTextContainer: {
    flex: 1,
  },
  dungeonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  dungeonDesc: {
    color: '#bbb',
    marginBottom: 4,
    fontSize: 14,
  },
  dungeonReward: {
    color: '#6C5CE7',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dungeonProgress: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#232336',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  dungeonProgressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  questsContainer: {
    marginBottom: 16,
  },
  questsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewAllText: {
    color: '#6C5CE7',
    fontWeight: '600',
    fontSize: 14,
  },
  questItem: {
    backgroundColor: '#1E1E30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
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
    marginBottom: 10,
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
  skillsTeaser: {
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
    marginBottom: 40,
  },
  skillsTeaserContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  skillsTeaserText: {
    color: '#bbb',
  },
  skillsTeaserAction: {
    color: '#6C5CE7',
    fontWeight: 'bold',
  },
});