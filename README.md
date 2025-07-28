# CoCoRaHS SWE Calculator
A simple web app to calculate snow water equivalent from the weight CoCoRaHS approved 4” rain gauges.

![app example](docs/iphone_app_example.png)

## Usage
To use the app, go to [apps.lake-effect.dev/swe-calculator](https://apps.lake-effect.dev/swe-calculator/) or open the installed app on your mobile device.

1) Measure the gross weight of the snow within the outer cylinder of the gauge.
2) Select the gauge that you're using (for tare weight calculation).
3) Enter the measured weight from your scale as the gross weight in grams.
4) Press the "Calculate" button.

The weight of the snow will then be displayed in grams along with the liquid equivalent of the snow in inches.

## Installation

To install the app, navigate to [apps.lake-effect.dev/swe-calculator](https://apps.lake-effect.dev/swe-calculator/) on your mobile device. Using Safari on iOS and Chrome on Android is recommended.

### Installing on iOS

1) Tap the Share ![box with the arrow pointing upwards](https://storage.googleapis.com/support-kms-prod/Oi0DNDXtcV89telFhTPd7Okn7yoTpSfkX19z) button.
2) Scroll down in the list and select the "Add to Home Screen" option.
3) In the window that appears, press the "Add" button in the upper-right. 
4) The app should now be installed on your home screen.

### Installing on Android
You may be automatically prompted to install the app when you first visit the page, if not, follow these instructions:

1) On the right of the address bar, tap the ![Google Three Dots](https://lh3.googleusercontent.com/W0wvq2J2waF71Qa0jA84ozgvd-x7-o0n7HgMl3ok7kC0eW1lK8Qunbke6MmrqZnJ6w=h36) button.
2) Select "More" and then "Add to home screen".
3) Finally, select "Install".
4) The app should now be installed on your home screen.

## Methodology

$$
SWE = \frac{m_\text{gross} - m_\text{tare}}{\pi r^2 \rho}
$$

Where:  
- $SWE$ = liquid water equivalent depth (in)  
- $m_\text{gross}$ = total weight (gauge + snow), in grams  
- $m_\text{tare}$ = empty gauge weight, in grams  
- $r$ = radius of the gauge opening, in inches  
- $\rho$ = density of water, in g/in³ (typically 1 g/cm³ ≈ 16.387 g/in³)

## Local Hosting Option via Docker

If you wish to host the web application locally, you can do so via docker by running the command below. The app can then be accessed at [127.0.0.1:8000](http://127.0.0.1:8000/).

```bash
git clone https://github.com/HumphreysCarter/CoCoRaHS-SWE-Calculator.git

cd CoCoRaHS-SWE-Calculator

docker run -d \
  --name CoCoRaHS-SWE-Calculator \
  -p 8000:80 \
  -v $(pwd)/src:/usr/share/nginx/html:ro \
  nginx:alpine
```

Alternatively, the `src` directory could be copied to an existing web server.