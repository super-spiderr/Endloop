import React, { useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { AppButton, Screen } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { Share2, Download } from 'lucide-react-native';
import mascotImg from '../../../assets/images/mascot.png';
import MainLogo from '../../../assets/svgs/MainLogo';

type ShareRoastScreenRouteProp = RouteProp<RootStackParamList, 'ShareRoastScreen'>;

export const ShareRoastScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const route = useRoute<ShareRoastScreenRouteProp>();
  const navigation = useNavigation();
  const viewShotRef = React.useRef<ViewShot>(null);
  const { roastText, appName, minutesOver, time } = route.params;

  const handleShareImage = async () => {
    try {
      if (!viewShotRef.current) {
        return;
      }

      const uri = await viewShotRef.current.capture?.();

      if (uri) {
        await Share.open({
          url: uri,
          message: `Agent Loop just filed an incident report on my ${appName} usage. 💀 #Endloop`,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sharing image:', error);
    }
  };

  const handleSaveImage = async () => {
    try {
      if (!viewShotRef.current) {
        return;
      }

      const uri = await viewShotRef.current.capture?.();

      if (uri) {
        // We use the share sheet as a robust fallback if CameraRoll isn't installed yet
        // but prioritized saving if the user has the right setup.
        await Share.open({
          url: uri,
          saveToFiles: true, // This enables 'Save to Files' on iOS
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving image:', error);
    }
  };

  return (
    <Screen title="INCIDENT REPORT" onBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 0.9 }}
          style={styles.viewShot}
        >
          <View style={styles.card}>
            <View style={styles.glowEffect} />

            <View style={styles.cardHeader}>
              <View style={styles.logoContainer}>
                <MainLogo size={24} color={theme.colors.primary} />
                <Text style={styles.logoText}>ENDLOOP</Text>
              </View>
              <Text style={styles.cardHeaderLabel}>AGENT REPORT</Text>
            </View>

            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText} numberOfLines={6}>
                &quot;{roastText}&quot;
              </Text>
            </View>

            <View style={styles.dataRow}>
              <View style={styles.dataPoint}>
                <Text style={styles.dataLabel}>TARGET</Text>
                <Text style={styles.dataValue} numberOfLines={1}>
                  {appName.toUpperCase()}
                </Text>
              </View>
              <View style={styles.dataPoint}>
                <Text style={styles.dataLabel}>VIOLATION</Text>
                <Text style={styles.dataValue}>
                  {minutesOver > 0 ? `${minutesOver}m OVER` : 'BREACH'}
                </Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.dataPoint}>
                <Text style={styles.dataLabel}>TIMESTAMP</Text>
                <Text style={styles.dataValue}>{time || 'JUST NOW'}</Text>
              </View>
              <Image source={mascotImg} style={styles.mascotDim} />
            </View>
          </View>
          <View style={styles.attribution}>
            <Text style={styles.attributionText}>FILED BY AGENT LOOP · ENDLOOP.APP</Text>
          </View>
        </ViewShot>

        <FadeInView translateY={20} delay={300} style={styles.actionContainer}>
          <AppButton
            title="Share with the World"
            onPress={() => {
              void handleShareImage();
            }}
            leftIcon={<Share2 size={20} color={theme.colors.black} />}
          />
          <View style={styles.secondaryActionRow}>
            <AppButton
              title="Save Image"
              variant="secondary"
              onPress={() => {
                void handleSaveImage();
              }}
              style={styles.flex1}
              leftIcon={<Download size={18} color={theme.colors.textSecondary} />}
            />
          </View>
        </FadeInView>
      </View>
    </Screen>
  );
};
