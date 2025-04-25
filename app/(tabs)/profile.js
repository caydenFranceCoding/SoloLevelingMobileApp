import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);

  // Sample user data (would come from state/storage in full app)
  const [user, setUser] = useState({
    name: 'Hunter',
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
    statPoints: 3,
    rank: 'C-Rank Hunter',
    achievements: [
      {
        id: 'ach1',
        title: 'First Steps',
        description: 'Complete your first quest',
        icon: 'trophy',
        earned: true,
        earnedAt: '2025-04-18'
      },
      {
        id: 'ach2',
        title: 'Rising Star',
        description: 'Reach level 5',
        icon: 'star',
        earned: true,
        earnedAt: '2025-04-19'
      },
      {
        id: 'ach3',
        title: 'Morning Champion',
        description: 'Complete 5 morning quests',
        icon: 'sunny',
        earned: false
      }
    ],
    joinDate: '2025-04-18',
    streakDays: 2,
  });

  // Function to allocate stat points
  const allocateStat = (statName) => {
    if (user.statPoints > 0) {
      setUser(prevUser => ({
        ...prevUser,
        stats: {
          ...prevUser.stats,
          [statName]: prevUser.stats[statName] + 1
        },
        statPoints: prevUser.statPoints - 1
      }));
    }
  };

  // Open stat allocation modal
  const openStatModal = (stat) => {
    setSelectedStat(stat);
    setShowStatsModal(true);
  };

  // Get progress percentage for experience bar
  const progressPercent = (user.exp / user.expToNextLevel) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileImageText}>{user.name[0]}</Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level {user.level}</Text>
              <Text style={styles.classText}>{user.rank}</Text>
            </View>
          </View>
        </View>

        {/* Experience Bar */}
        <View style={styles.expContainer}>
          <View style={styles.expTextContainer}>
            <Text style={styles.expText}>EXP: {user.exp} / {user.expToNextLevel}</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                { width: `${progressPercent}%` }
              ]}
            />
          </View>
        </View>

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>Stats</Text>
            {user.statPoints > 0 && (
              <View style={styles.statPointsContainer}>
                <Text style={styles.statPointsText}>
                  Available Points: {user.statPoints}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.statsGrid}>
            {Object.entries(user.stats).map(([statName, statValue]) => {
              // Define color and icon based on stat
              let statColor;
              let statIcon;

              switch(statName) {
                case 'strength':
                  statColor = '#F44336';
                  statIcon = 'fitness';
                  break;
                case 'intelligence':
                  statColor = '#2196F3';
                  statIcon = 'school';
                  break;
                case 'endurance':
                  statColor = '#4CAF50';
                  statIcon = 'shield';
                  break;
                case 'charisma':
                  statColor = '#FFC107';
                  statIcon = 'people';
                  break;
                case 'luck':
                  statColor = '#9C27B0';
                  statIcon = 'star';
                  break;
                default:
                  statColor = '#6C5CE7';
                  statIcon = 'help-circle';
              }

              return (
                <TouchableOpacity
                  key={statName}
                  style={styles.statItem}
                  onPress={() => openStatModal({
                    name: statName,
                    value: statValue,
                    color: statColor,
                    icon: statIcon
                  })}
                >
                  <View style={[styles.statIconContainer, { backgroundColor: statColor }]}>
                    <Ionicons name={statIcon} size={22} color="#fff" />
                  </View>
                  <Text style={styles.statName}>
                    {statName.charAt(0).toUpperCase() + statName.slice(1)}
                  </Text>
                  <Text style={styles.statValue}>{statValue}</Text>

                  {user.statPoints > 0 && (
                    <TouchableOpacity
                      style={styles.addStatButton}
                      onPress={() => allocateStat(statName)}
                    >
                      <Text style={styles.addStatButtonText}>+</Text>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>

          {user.achievements.map(achievement => (
            <View
              key={achievement.id}
              style={[
                styles.achievementItem,
                !achievement.earned && styles.lockedAchievement
              ]}
            >
              <View style={styles.achievementIcon}>
                <Ionicons
                  name={achievement.icon}
                  size={24}
                  color={achievement.earned ? "#FFD700" : "#555"}
                />
                {!achievement.earned && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={12} color="#fff" />
                  </View>
                )}
              </View>

              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>

                {achievement.earned && (
                  <Text style={styles.achievementDate}>
                    Earned on {achievement.earnedAt}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Daily Streak */}
        <View style={styles.streakContainer}>
          <Text style={styles.sectionTitle}>Daily Streak</Text>
          <View style={styles.streakContent}>
            <View style={styles.streakIconContainer}>
              <Ionicons name="flame" size={32} color="#FF9800" />
            </View>
            <Text style={styles.streakCount}>{user.streakDays}</Text>
            <Text style={styles.streakLabel}>DAYS</Text>
          </View>
          <Text style={styles.streakMotivation}>
            Keep your streak going to earn bonus rewards!
          </Text>
        </View>

        {/* Join Date */}
        <View style={styles.joinDateContainer}>
          <Text style={styles.joinDateLabel}>Hunter since:</Text>
          <Text style={styles.joinDate}>{user.joinDate}</Text>
        </View>
      </ScrollView>

      {/* Stat Detail Modal */}
      {selectedStat && (
        <Modal
          visible={showStatsModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setShowStatsModal(false);
            setSelectedStat(null);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={[styles.modalIconContainer, { backgroundColor: selectedStat.color }]}>
                  <Ionicons name={selectedStat.icon} size={30} color="#fff" />
                </View>
                <Text style={styles.modalTitle}>
                  {selectedStat.name.charAt(0).toUpperCase() + selectedStat.name.slice(1)}
                </Text>
              </View>

              <Text style={styles.statValueTitle}>Current Value</Text>
              <Text style={[styles.statValueDisplay, { color: selectedStat.color }]}>
                {selectedStat.value}
              </Text>

              <Text style={styles.statDescription}>
                {getStatDescription(selectedStat.name)}
              </Text>

              <View style={styles.statEffects}>
                <Text style={styles.effectsTitle}>Effects:</Text>
                <Text style={styles.effectItem}>• {getStatEffect(selectedStat.name)}</Text>
              </View>

              <View style={styles.modalButtons}>
                {user.statPoints > 0 ? (
                  <TouchableOpacity
                    style={[styles.allocateButton, { backgroundColor: selectedStat.color }]}
                    onPress={() => {
                      allocateStat(selectedStat.name);
                      setSelectedStat({
                        ...selectedStat,
                        value: selectedStat.value + 1
                      });
                    }}
                  >
                    <Text style={styles.allocateButtonText}>
                      Allocate Point ({user.statPoints} left)
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.noPointsButton}>
                    <Text style={styles.noPointsText}>
                      No points available
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setShowStatsModal(false);
                    setSelectedStat(null);
                  }}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// Helper function to get stat descriptions
function getStatDescription(statName) {
  switch(statName) {
    case 'strength':
      return 'Physical power and endurance. Increases the effectiveness of exercise and physical activity quests.';
    case 'intelligence':
      return 'Mental acuity and knowledge. Improves learning speed and effectiveness of study-related quests.';
    case 'endurance':
      return 'Stamina and resilience. Allows you to complete more tasks before getting tired and improves health-related quests.';
    case 'charisma':
      return 'Social influence and communication skills. Enhances the rewards from social and communication quests.';
    case 'luck':
      return 'Fortune and opportunity. Increases the chance of random bonuses and special events.';
    default:
      return 'A core attribute that affects various aspects of your progress.';
  }
}

// Helper function to get stat effects
function getStatEffect(statName) {
  switch(statName) {
    case 'strength':
      return 'Physical quests give 5% more EXP per 5 points';
    case 'intelligence':
      return 'Study quests give 5% more EXP per 5 points';
    case 'endurance':
      return 'Daily quest limit +1 per 10 points';
    case 'charisma':
      return 'Social quests give 5% more EXP per 5 points';
    case 'luck':
      return '1% chance of double EXP per 5 points';
    default:
      return 'Improves general performance';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginRight: 10,
  },
  classText: {
    fontSize: 14,
    color: '#bbb',
  },
  expContainer: {
    marginBottom: 24,
  },
  expTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  expText: {
    fontSize: 14,
    color: '#ddd',
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
  statsContainer: {
    marginBottom: 24,
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statPointsContainer: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statPointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '45%',
    backgroundColor: '#232336',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  addStatButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStatButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  achievementsContainer: {
    marginBottom: 24,
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2c',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#232336',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#6C5CE7',
  },
  streakContainer: {
    marginBottom: 24,
    backgroundColor: '#1E1E30',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
  },
  streakContent: {
    alignItems: 'center',
    marginVertical: 16,
  },
  streakIconContainer: {
    marginBottom: 8,
  },
  streakCount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakLabel: {
    fontSize: 16,
    color: '#bbb',
  },
  streakMotivation: {
    color: '#6C5CE7',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  joinDateContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  joinDateLabel: {
    fontSize: 14,
    color: '#bbb',
  },
  joinDate: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#1E1E30',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statValueTitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 4,
  },
  statValueDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statDescription: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 16,
    lineHeight: 22,
  },
  statEffects: {
    backgroundColor: '#232336',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  effectsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  effectItem: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allocateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 8,
    alignItems: 'center',
  },
  allocateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noPointsButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#2c2c2c',
    borderRadius: 25,
    marginRight: 8,
    alignItems: 'center',
  },
  noPointsText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#333',
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});