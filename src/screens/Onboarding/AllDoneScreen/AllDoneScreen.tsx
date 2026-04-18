import React, { useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Screen, AppButton } from '../../../components';
import { createStyles } from './styles';
import { setHasLaunched, getUserName } from '../../../utils/storage';

import mascotImg from '../../../assets/images/mascot.png';

export const AllDoneScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const name = getUserName();

  const handleFinish = () => {
    setHasLaunched(true);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'App' }],
      }),
    );
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <Animated.View entering={ZoomIn.duration(800).delay(200)} style={styles.iconContainer}>
          <Image source={mascotImg} style={styles.mascotImage} resizeMode="contain" />
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(800).delay(400)}>
          <Text style={styles.title}>All Set, {name}!</Text>
          <Text style={styles.subtitle}>
            Agent Loop is watching you, {name}. Your transformation starts now. Don&apos;t let us down.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(800).delay(600)} style={styles.footer}>
          <AppButton title="Let END the LOOP" onPress={handleFinish} />
        </Animated.View>
      </View>
    </Screen>
  );
};
