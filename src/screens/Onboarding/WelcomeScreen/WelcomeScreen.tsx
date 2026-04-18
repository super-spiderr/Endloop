import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import React, { useMemo } from 'react';

import { Text, View, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';

import { Screen, AppButton } from '../../../components';
import MainLogo from '../../../assets/svgs/MainLogo';

export const WelcomeScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const scrollY = useMemo(() => new Animated.Value(0), []);
  const [contentHeight, setContentHeight] = React.useState(1);
  const [scrollViewHeight, setScrollViewHeight] = React.useState(0);
  const [displayPercent, setDisplayPercent] = React.useState(0);

  const progressBarWidth = scrollY.interpolate({
    inputRange: [0, Math.max(1, contentHeight - scrollViewHeight)],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const maxScroll = Math.max(1, contentHeight - scrollViewHeight);
      const p = Math.floor((value / maxScroll) * 100);
      setDisplayPercent(Math.min(100, Math.max(0, p)));
    });
    return () => scrollY.removeListener(listenerId);
  }, [scrollY, contentHeight, scrollViewHeight]);

  const HEADER_HEIGHT = 160;
  const STACK_ITEM_HEIGHT = 100;
  const SECTION_GAP = 300;

  const renderNarrativeItem = (text: string, subText: string | null, index: number) => {
    // When the absolute scroll position reaches these points, the item starts moving/showing
    const startY = (index + 1) * SECTION_GAP;
    const finalStackTop = HEADER_HEIGHT + index * STACK_ITEM_HEIGHT;

    // Fade in as we scroll toward the section
    const opacity = scrollY.interpolate({
      inputRange: [startY - 200, startY],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    // Move from off-screen or below up to the fixed stack position
    const translateY = scrollY.interpolate({
      inputRange: [0, startY - 200, startY],
      outputRange: [600, 600, finalStackTop],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={`narrative-${index}`}
        pointerEvents="none"
        style={[
          styles.stackedItem,
          {
            height: STACK_ITEM_HEIGHT,
            opacity,
            transform: [{ translateY }],
            zIndex: 10 + index,
          },
        ]}
      >
        <Text style={styles.narrativeText}>{text}</Text>
        {subText && <Text style={styles.narrativeTextSub}>{subText}</Text>}
      </Animated.View>
    );
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.wrapper}>
        {/* Layer 1: Persistent Narrative Stack */}
        <Animated.View pointerEvents="none" style={[styles.header, { height: HEADER_HEIGHT }]}>
          <MainLogo size={48} color={theme.colors.textPrimary} />
          <Text style={styles.title}>Welcome to Endloop</Text>
        </Animated.View>

        {renderNarrativeItem('Perfect.', 'Exactly as expected.', 0)}
        {renderNarrativeItem(
          'Subject reacted in under a second..',
          'Zero hesitation.Zero resistance',
          1,
        )}
        {renderNarrativeItem('Case number 83947.', 'Scrolling addiction confirmed.', 2)}
        {renderNarrativeItem('You just proved it yourself.', 'Agent LOOP reporting for duty.', 3)}

        <ScrollView
          onContentSizeChange={(_, h) => setContentHeight(h)}
          onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          style={styles.wrapper}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.container, { paddingTop: HEADER_HEIGHT + 10 }]}>
            <Animated.View
              pointerEvents="none"
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Text style={styles.subtitle}>Scroll down to proceed.</Text>
            </Animated.View>

            {/* Empty space to allow scrolling through triggers */}
            <View style={styles.narrativeSpacer} />

            <View style={styles.bottomSection}>
              <AppButton
                title="Alright bro… you got me"
                onPress={() => navigation.navigate('Permission')}
              />
            </View>
          </View>
        </ScrollView>

        {/* UI Overlays */}
        <View style={styles.percentIndicator}>
          <Text style={styles.percentText}>{displayPercent}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressBarWidth,
              },
            ]}
          />
        </View>
      </View>
    </Screen>
  );
};
