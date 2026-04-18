import React, { useMemo } from 'react';
import { 
  Text, 
  View, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { AppButton } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { ShieldAlert } from 'lucide-react-native';
import AppUsageMethods from '../../../native/AppUsageModule';

export const PermissionReminderModal = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoToSettings = () => {
    AppUsageMethods.openUsageSettings();
    navigation.goBack();
  };

  return (
    <View style={styles.backdrop}>
      <FadeInView translateY={30} style={styles.card}>
        <View style={styles.iconContainer}>
          <ShieldAlert size={40} color={theme.colors.error} />
        </View>
        
        <View style={styles.header}>
          <Text style={styles.title}>Access Revoked</Text>
        </View>

        <Text style={styles.description}>
          Agent Loop can&apos;t keep you accountable without Usage Access. 
          The roasts will stop until you fix this.
        </Text>

        <View style={styles.actionContainer}>
          <AppButton 
            title="Go to Settings" 
            onPress={handleGoToSettings} 
          />
          <AppButton 
            title="Maybe later" 
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.secondaryButton}
          />
        </View>
      </FadeInView>
    </View>
  );
};
