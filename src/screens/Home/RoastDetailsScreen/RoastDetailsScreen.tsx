import React, { useMemo } from 'react';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { Text, View, Image, TouchableOpacity, Share } from 'react-native';
import { Screen } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { AppButton } from '../../../components/ui/AppButton';
import { X, Share2 } from 'lucide-react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigation/types';

import { getMascotForMinutesOver } from '../../../utils/mascot';

type RoastDetailsRouteProp = RouteProp<HomeStackParamList, 'RoastDetails'>;

export const RoastDetailsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  const route = useRoute<RoastDetailsRouteProp>();

  const { roastText, appName, minutesOver, time } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Agent Loop just roasted me: "${roastText}" on ${appName}. I'm ${minutesOver}m over my limit.`,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sharing:', error);
    }
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => navigation.goBack()}
        >
          <X color={theme.colors.textSecondary} size={24} />
        </TouchableOpacity>

        <FadeInView translateY={30} style={styles.content}>
          <View style={styles.roastHeader}>
            <Image 
              source={getMascotForMinutesOver(minutesOver)} 
              style={styles.mascot} 
            />
            <Text style={styles.headerLabel}>AGENT LOOP · VERDICT</Text>
          </View>

          <Text style={styles.roastText} adjustsFontSizeToFit numberOfLines={6}>
            &quot;{roastText}&quot;
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>TARGET</Text>
              <Text style={styles.metaValue}>{appName}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>VIOLATION</Text>
              <Text style={styles.metaValue}>{minutesOver > 0 ? `${minutesOver}m OVER` : 'BREACH'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>TIMESTAMP</Text>
              <Text style={styles.metaValue}>{time}</Text>
            </View>
          </View>
        </FadeInView>

        <View style={styles.footer}>
          <AppButton
            title="Share this roast"
            onPress={() => { void handleShare(); }}
            leftIcon={<Share2 size={20} color={theme.colors.background} />}
          />
          <TouchableOpacity 
            style={styles.dismissButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.dismissText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};
