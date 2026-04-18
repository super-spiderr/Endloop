import React, { useState, useMemo } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Screen } from '../../../components/Screen';
import { AppButton } from '../../../components/ui/AppButton';
import { AppTextInput } from '../../../components/ui/AppTextInput';
import { createStyles } from './styles';
import { setUserName } from '../../../utils/storage';

const { width } = Dimensions.get('window');

const NameStep = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What is your name?</Text>
      <AppTextInput
        placeholder="Enter your name"
        value={value}
        onChangeText={onChange}
        autoFocus
      />
    </View>
  );
};

const AgeStep = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>How old are you?</Text>
      <AppTextInput
        placeholder="Enter your age"
        value={value}
        onChangeText={text => {
          const numericText = text.replaceAll(/\D/g, '');
          if (numericText === '' || Number.parseInt(numericText, 10) <= 100) {
            onChange(numericText);
          }
        }}
        keyboardType="numeric"
        autoFocus
      />
    </View>
  );
};

const GenderStep = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>What is your gender?</Text>
      <View style={styles.optionsGrid}>
        {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(option => (
          <View key={option} style={styles.optionItem}>
            <AppButton
              title={option}
              variant={value === option ? 'primary' : 'secondary'}
              onPress={() => onChange(option)}
              style={styles.optionButton}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const UsageStep = ({ value, onChange }: { value: string; onChange: (text: string) => void }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.question}>Daily phone usage?</Text>
      <Text style={styles.description}>Hours spent scrolling on average.</Text>
      <AppTextInput
        placeholder="e.g. 5"
        value={value}
        onChangeText={text => {
          const numericText = text.replaceAll(/[^0-9.]/g, '');
          const val = Number.parseFloat(numericText);
          if (numericText === '' || (!Number.isNaN(val) && val < 24)) {
            onChange(numericText);
          }
        }}
        keyboardType="numeric"
        autoFocus
      />
    </View>
  );
};

export const ProfileSurveyScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    usage: '',
  });

  const [slideAnim] = useState(() => new Animated.Value(0));

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim().length > 0;
      case 1: {
        const age = Number.parseInt(formData.age, 10);
        return !Number.isNaN(age) && age > 0 && age <= 100;
      }
      case 2:
        return formData.gender.length > 0;
      case 3: {
        const usageValue = Number.parseFloat(formData.usage);
        return !Number.isNaN(usageValue) && usageValue >= 0 && usageValue < 24;
      }
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      return;
    }
    if (currentStep < 3) {
      Animated.timing(slideAnim, {
        toValue: -(currentStep + 1) * width,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setCurrentStep(prev => prev + 1);
    } else {
      setUserName(formData.name);
      navigation.navigate('InitialRoast', {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        usage: formData.usage,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      Animated.timing(slideAnim, {
        toValue: -(currentStep - 1) * width,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Screen showBackButton={true} onBack={handleBack}>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of 4
          </Text>
        </View>

        <Animated.View
          style={[
            styles.contentMask,
            {
              transform: [{ translateX: slideAnim }],
              width: width * 4,
            },
          ]}
        >
          <View style={styles.stepWrapper}>
            <NameStep
              value={formData.name}
              onChange={text => setFormData(prev => ({ ...prev, name: text }))}
            />
          </View>
          <View style={styles.stepWrapper}>
            <AgeStep
              value={formData.age}
              onChange={text => setFormData(prev => ({ ...prev, age: text }))}
            />
          </View>
          <View style={styles.stepWrapper}>
            <GenderStep
              value={formData.gender}
              onChange={text => setFormData(prev => ({ ...prev, gender: text }))}
            />
          </View>
          <View style={styles.stepWrapper}>
            <UsageStep
              value={formData.usage}
              onChange={text => setFormData(prev => ({ ...prev, usage: text }))}
            />
          </View>
        </Animated.View>

        <View style={styles.footer}>
          {currentStep === 0 ? (
            <AppButton
              title="Continue"
              onPress={handleNext}
              disabled={!isStepValid()}
              style={styles.fullButton}
            />
          ) : (
            <View style={styles.buttonGroup}>
              <AppButton
                title="Back"
                variant="secondary"
                onPress={handleBack}
                style={styles.backButton}
              />
              <AppButton
                title={currentStep === 3 ? 'Finish' : 'Continue'}
                onPress={handleNext}
                disabled={!isStepValid()}
                style={styles.nextButton}
              />
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
};
