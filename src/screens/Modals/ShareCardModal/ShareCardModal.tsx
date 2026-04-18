import React, { useMemo } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { AppButton } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { Share2, Copy, Download } from 'lucide-react-native';
import mascotImg from '../../../assets/images/mascot.png';
import MainLogo from '../../../assets/svgs/MainLogo';

type ShareCardRouteProp = RouteProp<RootStackParamList, 'ShareCardModal'>;

interface ViewShotRef {
  capture: () => Promise<string>;
}

interface ShareObject {
  open: (options: { url: string; message?: string }) => Promise<any>;
}

export const ShareCardModal = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const route = useRoute<ShareCardRouteProp>();
  const navigation = useNavigation();
  const viewShotRef = React.useRef<ViewShot>(null);
  const { roastText, appName } = route.params;

  const handleShareImage = async () => {
    try {
      if (!viewShotRef.current) {
        return;
      }

      const uri = await (viewShotRef.current as unknown as ViewShotRef).capture();

      await (Share as unknown as ShareObject).open({
        url: uri,
        message: `Agent Loop just destroyed me on ${appName}. 💀 #Endloop`,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sharing image:', error);
    }
  };

  const handleCopyLink = () => {
    // eslint-disable-next-line no-console
    console.log('Copy to clipboard logic here');
  };

  return (
    <View style={styles.backdrop}>
      <FadeInView translateY={40} style={styles.cardContainer}>
        {/* This is the part being screenshotted */}
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
          <LinearGradient colors={['#1A1A1A', '#000000']} style={styles.card}>
            <View style={styles.cardHeader}>
              <MainLogo size={24} color={theme.colors.primary} />
              <Text style={styles.cardHeaderLabel}>AGENT REPORT · {appName.toUpperCase()}</Text>
            </View>

            <View style={styles.memeContent}>
              <Text style={styles.quoteMark}>&ldquo;</Text>
              <Text style={styles.memeText} numberOfLines={6}>
                {roastText}
              </Text>
              <Text style={styles.quoteMarkClose}>&rdquo;</Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.branding}>
                <Image source={mascotImg} style={styles.logoIcon} />
                <View>
                  <Text style={styles.brandingName}>ENDLOOP</Text>
                  <Text style={styles.brandingTagline}>AI-POWERED SHAME</Text>
                </View>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>VERIFIED BREACH</Text>
              </View>
            </View>
          </LinearGradient>
        </ViewShot>

        <View style={styles.actionContainer}>
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
                void handleShareImage();
              }}
              style={styles.flex1}
              leftIcon={<Download size={18} color={theme.colors.textSecondary} />}
            />
            <AppButton
              title="Copy"
              variant="secondary"
              onPress={handleCopyLink}
              style={styles.flex1}
              leftIcon={<Copy size={18} color={theme.colors.textSecondary} />}
            />
          </View>
        </View>
      </FadeInView>

      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};
