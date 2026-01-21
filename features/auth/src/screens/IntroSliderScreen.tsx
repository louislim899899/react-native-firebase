import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

/**
 * Intro Slider Screen
 *
 * Shown only once when app is first installed.
 * 4-page slider that can be skipped at any time.
 * Supports both swiping and button-based navigation.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

const { width } = Dimensions.get('window');

export function IntroSliderScreen() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const pages = [
    {
      id: '1',
      title: 'Welcome',
      description: 'This is page 1 of the intro slider',
    },
    {
      id: '2',
      title: 'Page 2',
      description: 'This is page 2 of the intro slider',
    },
    {
      id: '3',
      title: 'Page 3',
      description: 'This is page 3 of the intro slider',
    },
    {
      id: '4',
      title: 'Get Started',
      description: 'This is the last page',
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
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

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentPage(index);
  };

  const renderPage = ({ item }: { item: (typeof pages)[0] }) => (
    <View style={[styles.pageContainer, { width }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollToIndex={true}
      />

      <View style={styles.footer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContainer: {
    flex: 1,
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
