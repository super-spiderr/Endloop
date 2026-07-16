import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import React, { useMemo, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList, RootNavigationProp } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { AppButton, Screen } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { getMascotForMinutesOver } from '../../../utils/mascot';
import { saveRoast } from '../../../utils/roasts';

type RoastNotificationRouteProp = RouteProp<RootStackParamList, 'RoastNotificationModal'>;

export const RoastNotificationModal = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const route = useRoute<RoastNotificationRouteProp>();
  const navigation = useNavigation<RootNavigationProp>();
  const { roastText, appName, minutesOver } = route.params;

  // Persist the roast to history as soon as it's shown to the user
  useEffect(() => {
    saveRoast(appName, roastText, minutesOver);
  }, [appName, roastText, minutesOver]);

  const handleFairEnough = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    navigation.navigate('ShareRoastScreen', {
      roastText,
      appName,
      minutesOver,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <FadeInView translateY={40} style={styles.card}>
          <LinearGradient
            colors={['#FF3B30', '#8E0000']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerContent}>
              <View style={styles.hazardStrip} />
              <Text style={styles.label}>BREACH DETECTED</Text>
              <View style={styles.hazardStrip} />
            </View>
          </LinearGradient>

          <View style={styles.body}>
            <View style={styles.mascotContainer}>
              <Image source={getMascotForMinutesOver(minutesOver)} style={styles.mascot} />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.appName}>{appName.toUpperCase()}</Text>
              <View style={styles.timeBadge}>
                <Text style={styles.metaText}>{minutesOver}M OVER LIMIT</Text>
              </View>
            </View>

            <View style={styles.roastBubble}>
              <Text style={styles.roastText}>&quot;{roastText}&quot;</Text>
            </View>

            <View style={styles.actionContainer}>
              <AppButton title="Fair enough" onPress={handleFairEnough} />
              <AppButton title="Share the shame" variant="secondary" onPress={handleShare} />
            </View>
          </View>
        </FadeInView>
      </View>
    </Screen>
  );
};
