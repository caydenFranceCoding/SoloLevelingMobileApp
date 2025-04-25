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

export default function SkillsScreen() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);

  // Example user level (would come from state in real app)
  const userLevel = 3;

  // Sample skills data (would come from state/storage in full app)
  const [skills, setSkills] = useState([
    {
      id: 'skill1',
      name: 'Early Riser',
      description: 'Wake up before 6 AM consistently',
      effect: 'Morning tasks give 10% more EXP',
      level: 1,
      maxLevel: 5,
      unlocked: true,
      category: 'Lifestyle',
      icon: 'sunny-outline',
      color: '#FFB900',
      requiresLevel: 1
    },
    {
      id: 'skill2',
      name: 'Focus Mode',
      description: 'Complete work without distractions',
      effect: 'Study and work tasks give 15% more EXP',
      level: 0,
      maxLevel: 3,
      unlocked: true,
      category: 'Productivity',
      icon: 'eye-outline',
      color: '#2196F3',
      requiresLevel: 2
    },
    {
      id: 'skill3',
      name: 'Fitness Enthusiast',
      description: 'Regular physical activity',
      effect: 'Gain +1 Strength for every 5 exercise quests',
      level: 0,
      maxLevel: 5,
      unlocked: true,
      category: 'Fitness',
      icon: 'barbell-outline',
      color: '#F44336',
      requiresLevel: 3
    },
    {
      id: 'skill4',
      name: 'Meal Prepper',
      description: 'Plan and prepare meals in advance',
      effect: 'Health quests give +2 Endurance',
      level: 0,
      maxLevel: 3,
      unlocked: false,
      category: 'Health',
      icon: 'restaurant-outline',
      color: '#4CAF50',
      requiresLevel: 5
    },
    {
      id: 'skill5',
      name: 'Social Butterfly',
      description: 'Improve social connections',
      effect: '+20% EXP from social activities',
      level: 0,
      maxLevel: 4,
      unlocked: false,
      category: 'Social',
      icon: 'people-outline',
      color: '#9C27B0',
      requiresLevel: 7
    }
  ]);

  // Function to level up a skill
  const levelUpSkill = (skillId) => {
    setSkills(prevSkills =>
      prevSkills.map(skill => {
        if (skill.id === skillId && skill.level < skill.maxLevel) {
          return { ...skill, level: skill.level + 1 };
        }
        return skill;
      })
    );

    // Close the modal after leveling up
    setShowSkillModal(false);
    setSelectedSkill(null);
  };

  // Open skill details modal
  const openSkillDetails = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  // Render a skill card
  const SkillCard = ({ skill }) => {
    const isAvailable = skill.unlocked && skill.requiresLevel <= userLevel;

    return (
      <TouchableOpacity
        style={[
          styles.skillCard,
          !isAvailable && styles.lockedSkill
        ]}
        onPress={() => isAvailable && openSkillDetails(skill)}
        disabled={!isAvailable}
      >
        <View style={[styles.skillIconContainer, { backgroundColor: skill.color }]}>
          <Ionicons name={skill.icon} size={24} color="#fff" />
        </View>
        <View style={styles.skillInfo}>
          <Text style={styles.skillName}>{skill.name}</Text>
          <Text style={styles.skillCategory}>{skill.category}</Text>

          <View style={styles.levelContainer}>
            {Array.from({ length: skill.maxLevel }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.levelDot,
                  index < skill.level && styles.activeLevelDot,
                  { backgroundColor: index < skill.level ? skill.color : '#333' }
                ]}
              />
            ))}
          </View>
        </View>

        {!skill.unlocked && (
          <View style={styles.lockContainer}>
            <Ionicons name="lock-closed" size={20} color="#aaa" />
            <Text style={styles.lockText}>Lvl {skill.requiresLevel}</Text>
          </View>
        )}

        {skill.unlocked && skill.requiresLevel > userLevel && (
          <View style={styles.lockContainer}>
            <Text style={styles.lockText}>Lvl {skill.requiresLevel}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Skills</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lvl {userLevel}</Text>
        </View>
      </View>

      <ScrollView style={styles.skillsList}>
        <Text style={styles.sectionTitle}>Active Skills</Text>

        {skills.filter(skill => skill.level > 0).length > 0 ? (
          skills.filter(skill => skill.level > 0).map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No active skills yet. Level up your skills to activate them!
          </Text>
        )}

        <Text style={styles.sectionTitle}>Available Skills</Text>

        {skills.filter(skill => skill.level === 0 && skill.unlocked && skill.requiresLevel <= userLevel).length > 0 ? (
          skills.filter(skill => skill.level === 0 && skill.unlocked && skill.requiresLevel <= userLevel).map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No available skills at your current level.
          </Text>
        )}

        <Text style={styles.sectionTitle}>Locked Skills</Text>

        {skills.filter(skill => !skill.unlocked || skill.requiresLevel > userLevel).map(skill => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </ScrollView>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <Modal
          visible={showSkillModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setShowSkillModal(false);
            setSelectedSkill(null);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={[styles.modalIconContainer, { backgroundColor: selectedSkill.color }]}>
                  <Ionicons name={selectedSkill.icon} size={30} color="#fff" />
                </View>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>{selectedSkill.name}</Text>
                  <Text style={styles.modalCategory}>{selectedSkill.category}</Text>
                </View>
              </View>

              <View style={styles.modalLevel}>
                <Text style={styles.modalLevelText}>
                  Level {selectedSkill.level}/{selectedSkill.maxLevel}
                </Text>
                <View style={styles.modalLevelDots}>
                  {Array.from({ length: selectedSkill.maxLevel }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.modalLevelDot,
                        index < selectedSkill.level && styles.modalActiveLevelDot,
                        { backgroundColor: index < selectedSkill.level ? selectedSkill.color : '#333' }
                      ]}
                    />
                  ))}
                </View>
              </View>

              <Text style={styles.modalDescription}>{selectedSkill.description}</Text>

              <View style={styles.effectContainer}>
                <Text style={styles.effectTitle}>Effect:</Text>
                <Text style={styles.effectText}>{selectedSkill.effect}</Text>

                {selectedSkill.level < selectedSkill.maxLevel && (
                  <Text style={styles.nextLevelText}>
                    Next Level: {selectedSkill.effect.replace(/\d+%/, (match) => {
                      const currentPercent = parseInt(match);
                      return `${currentPercent + 5}%`;
                    })}
                  </Text>
                )}
              </View>

              <View style={styles.modalButtons}>
                {selectedSkill.level < selectedSkill.maxLevel ? (
                  <TouchableOpacity
                    style={styles.upgradeButton}
                    onPress={() => levelUpSkill(selectedSkill.id)}
                  >
                    <Text style={styles.upgradeButtonText}>Upgrade Skill</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.maxLevelButton}>
                    <Text style={styles.maxLevelText}>Maximum Level</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setShowSkillModal(false);
                    setSelectedSkill(null);
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelBadge: {
    backgroundColor: '#6C5CE7',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skillsList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
  },
  emptyText: {
    color: '#bbb',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
    paddingVertical: 8,
  },
  skillCard: {
    backgroundColor: '#1E1E30',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockedSkill: {
    opacity: 0.7,
  },
  skillIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 12,
    color: '#bbb',
    marginBottom: 6,
  },
  levelContainer: {
    flexDirection: 'row',
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginRight: 4,
  },
  activeLevelDot: {
    backgroundColor: '#2196F3',
  },
  lockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  lockText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  modalCategory: {
    fontSize: 14,
    color: '#bbb',
  },
  modalLevel: {
    marginBottom: 16,
  },
  modalLevelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  modalLevelDots: {
    flexDirection: 'row',
  },
  modalLevelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
    marginRight: 6,
  },
  modalActiveLevelDot: {
    backgroundColor: '#2196F3',
  },
  modalDescription: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 16,
    lineHeight: 22,
  },
  effectContainer: {
    backgroundColor: '#232336',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  effectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  effectText: {
    fontSize: 14,
    color: '#6C5CE7',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nextLevelText: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upgradeButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  maxLevelButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  maxLevelText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});