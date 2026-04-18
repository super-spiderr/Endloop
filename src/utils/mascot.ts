import mascotImpressed from '../assets/images/mascot_impressed.png';
import mascotMonitoring from '../assets/images/mascot_monitoring.png';
import mascotFiling from '../assets/images/mascot_filing.png';
import mascotDebrief from '../assets/images/mascot_debrief.png';

export const getMascotForRatio = (ratio: number) => {
  if (ratio < 0.5) {
    return mascotImpressed;
  }
  if (ratio < 0.9) {
    return mascotMonitoring;
  }
  if (ratio < 1.2) {
    return mascotFiling;
  }
  return mascotDebrief;
};

export const getMascotForMinutesOver = (minutesOver: number) => {
  if (minutesOver <= 0) {
    return mascotImpressed;
  }
  if (minutesOver < 15) {
    return mascotMonitoring;
  }
  if (minutesOver < 45) {
    return mascotFiling;
  }
  return mascotDebrief;
};
