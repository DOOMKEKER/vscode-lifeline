# Lifeline

A Visual Studio Code extensions that shows a clock and the current battery state in the status bar.

## Features
Lifeline presents the time and battery level of your laptop in the bottom right of the status bar. It tries to always be the the rightmost item. By default, it displays the time on the right and the battery on the left. You can swap the positioning (and the time format) in the extension settings. It contains no styling of its own, so the status bar items will always match your theme of choice.

Lifeline will also indicate if laptop is charging. It will not show the battery status at all if one is not detected.

## Preview
| Device unplugged | Device charging |
| - | - |
| ![Device unplugged](./media/device-unplugged.png) | ![Device charging](./media/device-charging.png) |

## Configuration
### `lifeline.battery.interval`
Set the polling interval for the battery in ms. Ignored if device has no battery. By default, set to 3000ms.

### `lifeline.clock.format`
Sets the display format for the clock. By default, set to `h:mm:ss A`.

### `lifeline.clock.interval`
Set the polling interval for the clock in ms. By default, set to 1000ms.

### `lifeline.swap`
Swap the display order of the battery and clock. Ignored if device has no battery. By default, set to `false`.

### `lifeline.battery.performance`
To improve battery performance, the battery level should remain between 40 and 80%. By default, set to `false`.
