import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('EndloopMonitor', () => {
  return async () => {
    // This is required on Android to allow the task to run in background.
    // The actual logic is handled by react-native-background-actions
    // but the taskName must be registered.
  };
});
