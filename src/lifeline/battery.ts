import { battery as batteryInfo } from 'systeminformation';
import { StatusBarAlignment, StatusBarItem, window, ThemeColor } from 'vscode';
import { BatteryLevel, Position, BatteryPerformance} from '../constants';
import { ExtensionConfiguration } from '../interfaces';
import { utils } from './utils';

export class Battery {
  private config: ExtensionConfiguration;
  private battery: StatusBarItem;
  private interval: NodeJS.Timeout;

  constructor(currentConfig: ExtensionConfiguration) {
    this.config = currentConfig;
    this.battery = this.createBattery();
    this.interval = this.startBattery();

    this.battery.show();
  }

  getClock(): StatusBarItem {
    return this.battery;
  }

  updateConfig() {
    this.config = utils.getConfig();
    this.redraw();
  }

  dispose() {
    this.battery.dispose();
    clearInterval(this.interval);
  }

  redraw() {
    this.dispose();
    this.battery = this.createBattery();
    this.interval = this.startBattery();
    this.battery.show();
  }

  private createBattery(): StatusBarItem {
    return window.createStatusBarItem(StatusBarAlignment.Right, this.config.swap ? Position.RIGHT : Position.LEFT);
  }

  private updateBattery(): void {
    batteryInfo().then((data) => {
      const level = Math.min(Math.max(data.percent, BatteryLevel.MIN), BatteryLevel.MAX);
      const charging = data.ischarging ? '+' : '';
      this.battery.text = `${charging}${level}%`;
      if ((level < BatteryPerformance.MIN || level > BatteryPerformance.MAX) && this.config.batteryPerformance) {
        this.battery.backgroundColor = new ThemeColor('statusBarItem.errorBackground');
      } else {
        this.battery.backgroundColor = undefined;
      }
    });
  }

  private startBattery(): NodeJS.Timeout {
    this.updateBattery();

    return setInterval(() => {
      this.updateBattery();
    }, this.config.batteryInterval);
  }
}