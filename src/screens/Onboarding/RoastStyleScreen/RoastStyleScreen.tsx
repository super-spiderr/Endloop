import React, { useMemo, useState } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Flame, Heart, Brain, Info } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { OnboardingStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Screen, AppButton } from '../../../components';
import { createStyles } from './styles';
import { getRoastStyle, setRoastStyle } from '../../../utils/storage';
import { RoastStyle } from '../../../types/roast';

interface StyleOption {
  id: RoastStyle;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const RoastStyleScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const [selectedStyle, setSelectedStyle] = useState<RoastStyle>((getRoastStyle() as RoastStyle) || 'savage');

  const options: StyleOption[] = [
    {
      id: 'savage',
      title: 'Savage',
      description: 'Zero mercy. We will destroy your ego until you quit.',
      icon: Flame,
    },
    {
      id: 'passive_aggressive',
      title: 'Passive Aggressive',
      description: "Not mad, just disappointed. Sarcasm is its only language.",
      icon: Info,
    },
    {
      id: 'stoic',
      title: 'Stoic',
      description: 'Cold, logical reminders that your time is literally dying.',
      icon: Brain,
    },
    {
      id: 'supportive',
      title: 'Supportive',
      description: 'Kind but firm boundaries. Heart-to-heart focus tips.',
      icon: Heart,
    },
  ];

  const handleStyleSelect = (style: RoastStyle) => {
    setSelectedStyle(style);
    setRoastStyle(style);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.title}>Pick Your Executioner</Text>
          <Text style={styles.subtitle}>
            How should we bully you when you inevitably fail? Don&apos;t cry.
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.styleSelectionContainer}>
            {options.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStyle === option.id;

              return (
                <Pressable
                  key={option.id}
                  onPress={() => handleStyleSelect(option.id)}
                  style={[styles.styleCard, isSelected && styles.selectedCard]}
                >
                  <View style={[styles.iconContainer, 
                    { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface }]}
                  >
                    <Icon size={20} color={isSelected ? theme.colors.black : theme.colors.textPrimary} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardDescription}>{option.description}</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>

        <View style={styles.footer}>
          <AppButton
            title="Finish Onboarding"
            onPress={() => navigation.navigate('AllDone')}
          />
        </View>
      </View>
    </Screen>
  );
};
