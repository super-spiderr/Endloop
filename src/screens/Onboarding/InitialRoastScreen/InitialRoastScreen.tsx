import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { OnboardingStackParamList } from '../../../navigation/types';
import { Screen } from '../../../components/Screen';
import { AppButton } from '../../../components/ui/AppButton';
import { useTheme } from '../../../theme';
import { palette } from '../../../theme/colors';

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'InitialRoast'>;
type RoutePropType = RouteProp<OnboardingStackParamList, 'InitialRoast'>;

export const InitialRoastScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RoutePropType>();

  // Data calculations
  const hpd = Number.parseFloat(params.usage) || 0;
  const hpy = Math.round(hpd * 365);
  const dpy = Math.round(hpy / 24);
  const mpy = (dpy / 30).toFixed(1);
  const ypd = ((hpd * 10) / 24).toFixed(1);

  // Roast Tiers calculation
  const isCritical = hpd >= 8;
  const isMid = hpd >= 4 && hpd < 8;

  let levelTitle = 'THE TRUTH';
  let levelColor = theme.colors.primary;
  let genZRoastLines = [
    '"Casual user behavior."',
    '"Still, imagine what you could do"',
    '"WITH NO SCREEN TIME."',
  ];

  if (isCritical) {
    levelTitle = 'CRITICAL ADDICTION';
    levelColor = theme.colors.error;
    genZRoastLines = [
      '"Bro... You\'re not addicted."',
      '"Fully employed by your phone."',
      '"NO SALARY."',
    ];
  } else if (isMid) {
    levelTitle = 'MID-LEVEL WARNING';
    levelColor = palette.orange500;
    genZRoastLines = [
      '"Not a disaster yet..."',
      '"But your thumb is definitely"',
      '"DOING OVERTIME."',
    ];
  }

  return (
    <Screen showBackButton={true}>
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
          <Text style={[styles.title, { color: levelColor }]}>{levelTitle}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            THE HARD TRUTH ABOUT YOUR {params.usage} HRS/DAY habit.
          </Text>
        </Animated.View>

        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Animated.View entering={FadeIn.delay(600)} style={styles.statBox}>
              <Text style={[styles.statValue, { color: levelColor }]}>{hpy.toLocaleString()}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>HRS/YEAR</Text>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(1200)} style={styles.statBox}>
              <Text style={[styles.statValue, { color: levelColor }]}>{dpy}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                DAYS/YEAR
              </Text>
            </Animated.View>
          </View>

          <Animated.View entering={SlideInRight.delay(1800)} style={styles.highlightBox}>
            <Text style={[styles.highlightText, { color: theme.colors.textPrimary }]}>
              That&rsquo;s <Text style={{ color: levelColor }}>{mpy} MONTHS</Text> every year.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(2600)} style={styles.projections}>
            <Text style={[styles.projectionLabel, { color: theme.colors.textSecondary }]}>
              In 10 years...
            </Text>
            <Text style={[styles.projectionValue, { color: levelColor }]}>{ypd} YEARS LOST</Text>
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeIn.delay(3600).duration(1000)}
          style={[styles.genZRoast, { backgroundColor: theme.colors.surface }]}
        >
          {genZRoastLines.map((line, index) => (
            <Text
              key={line}
              style={[
                styles.genZText,
                { color: index === 2 ? levelColor : theme.colors.textPrimary },
              ]}
            >
              {line}
            </Text>
          ))}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(4600).duration(800)} style={styles.footer}>
          <AppButton
            title="I deserve this. Let's fix it."
            onPress={() => navigation.navigate('SetLimits')}
            variant="primary"
          />
        </Animated.View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 40,
  },
  footer: {
    width: '100%',
  },
  genZRoast: {
    borderRadius: 24,
    marginVertical: 10,
    padding: 20,
  },
  genZText: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  highlightBox: {
    alignItems: 'center',
    marginVertical: 24,
  },
  highlightText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  projectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectionValue: {
    fontSize: 32,
    fontWeight: '900',
  },
  projections: {
    alignItems: 'center',
    borderRadius: 24,
    marginTop: 8,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  statValue: {
    fontSize: 40,
    fontWeight: '900',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
    opacity: 0.7,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 4,
  },
});
