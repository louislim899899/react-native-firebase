import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

/**
 * Intro Slider Screen
 *
 * Shown only once when app is first installed.
 * 4-page slider that can be skipped at any time.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

export function IntroSliderScreen() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const pages = [
    {
      title: 'Welcome',
      description: 'This is page 1 of the intro slider',
    },
    {
      title: 'Page 2',
      description: 'This is page 2 of the intro slider',
    },
    {
      title: 'Page 3',
      description: 'This is page 3 of the intro slider',
    },
    {
      title: 'Get Started',
      description: 'This is the last page',
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    // Mark intro as seen and navigation will update automatically
    const { markIntroSliderSeen } = await import('../utils');
    await markIntroSliderSeen();
  };

  const page = pages[currentPage];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{page.title}</Text>
        <Text style={styles.description}>{page.description}</Text>
      </View>

      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentPage && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentPage === pages.length - 1 ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
