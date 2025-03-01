import { RewardRadar } from './task.ts';

type FirstScan = '🌳🌳[0$]🌲⚡️[100$]⚡️🌳🌳🌳';
type SecondScan = '🌲🌳⚡️[20$]⚡️🌲🌲[0$]🌲[🔥]🌲';
type ThirdScan = '🌳🌲[❌]🌳🌳[🔥]⚡️🌳🌲';

export function terrainScanResults() {
  const result1: RewardRadar<FirstScan> = '100$';
  const result2: RewardRadar<SecondScan> = '20$';
  const result3: RewardRadar<ThirdScan> = null;

  return [result1, result2, result3];
}
