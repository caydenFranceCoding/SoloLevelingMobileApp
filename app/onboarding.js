import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Onboarding content slides
const slides = [
  {
    id: '1',
    title: 'Welcome to Solo Daily',
    description: 'Turn your daily tasks into an adventure and level up your life!',
    icon: 'flash',
  },
  {
    id: '2',
    title: 'Complete Daily Quests',
    description: 'Finish tasks to earn experience points and level up your character.',
    icon: 'list',
  },
  {
    id: '3',
    title: 'Develop Skills',
    description: 'Unlock and upgrade skills to boost your productivity and rewards.',
    icon: 'fitness',
  },
  {
    id: '4',
    title: 'Track Your Progress',
    description: 'Watch your stats grow as you consistently complete your daily quests.',
    icon: 'stats-chart',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [hunterName, setHunterName] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleContinue = () => {
  if (currentIndex < slides.length - 1) {
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  } else {
    // Added smooth fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowLogin(true);

      // Add fade-in animation after changing screen
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 50);
    });
  }
};

  const handleLogin = () => {
  if (hunterName.trim() === '') {
    // Simple validation
    setErrorMessage('Please enter your Hunter name');
    return;
  }

  // Clear error message if validation passes
  setErrorMessage('');

  console.log("Logging in with name:", hunterName);

  // Use Link/Redirect approach instead of router.replace()
  router.push("/(tabs)");
};

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderOnboardingSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={80} color="#6C5CE7" />
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    );
  };

  // Generate a random particle configuration
  const generateParticle = (index) => {
    const size = Math.random() * 4 + 2;
    const top = Math.random() * height;
    const left = Math.random() * width;
    const opacity = Math.random() * 0.5 + 0.1;

    return (
      <View
        key={index}
        style={[
          styles.particle,
          {
            width: size,
            height: size,
            top,
            left,
            opacity,
          }
        ]}
      />
    );
  };

  // Create particles for background effect
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(generateParticle(i));
    }
    return particles;
  };

  if (showLogin) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.background}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            {/* Background particles */}
            {renderParticles()}

            <Animated.View style={[styles.loginContainer, { opacity: fadeAnim }]}>
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Ionicons name="flash" size={48} color="#fff" />
                </View>
                <Text style={styles.appTitle}>SOLO DAILY</Text>
                <Text style={styles.appSubtitle}>Rise through the ranks</Text>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.loginTitle}>
                  {isExistingUser ? 'Welcome Back, Hunter' : 'Register as a Hunter'}
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#6C5CE7" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Hunter Name"
                    placeholderTextColor="#666"
                    value={hunterName}
                    onChangeText={setHunterName}
                    maxLength={15}
                  />
                </View>

                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>
                    {isExistingUser ? 'CONTINUE' : 'BEGIN JOURNEY'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setIsExistingUser(!isExistingUser)}
                >
                  <Text style={styles.toggleText}>
                    {isExistingUser
                      ? 'New Hunter? Register here'
                      : 'Already registered? Login here'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rankContainer}>
                <View style={styles.rankItem}>
                  <Text style={styles.rankLabel}>E</Text>
                </View>
                <View style={styles.rankItem}>
                  <Text style={styles.rankLabel}>D</Text>
                </View>
                <View style={styles.rankItem}>
                  <Text style={styles.rankLabel}>C</Text>
                </View>
                <View style={styles.rankItem}>
                  <Text style={styles.rankLabel}>B</Text>
                </View>
                <View style={styles.rankItem}>
                  <Text style={styles.rankLabel}>A</Text>
                </View>
                <View style={[styles.rankItem, styles.sRankItem]}>
                  <Text style={styles.sRankLabel}>S</Text>
                </View>
              </View>
            </Animated.View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.background}>
      <StatusBar style="light" />

      {/* Background particles */}
      {renderParticles()}

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => setShowLogin(true)}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderOnboardingSlide}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.pagination}>
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#6C5CE7',
    borderRadius: 50,
    opacity: 0.3,
  },
  skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  slideDescription: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C5CE7',
    marginHorizontal: 5,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C5CE7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  // Login screen styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6C5CE7',
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: 'rgba(30, 30, 48, 0.8)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 45, 65, 0.8)',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  toggleButton: {
    alignItems: 'center',
  },
  toggleText: {
    color: '#6C5CE7',
    fontSize: 14,
  },
  rankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 300,
    marginTop: 30,
  },
  rankItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 30, 48, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sRankItem: {
    backgroundColor: 'rgba(108, 92, 231, 0.8)',
  },
  sRankLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});