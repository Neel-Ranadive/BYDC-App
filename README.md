# Color Scanner for pH Estimation

This project extracts and processes color data from images to estimate pH levels using a calibrated color model.

## Files

- `main.js`: Main script to process an image and output pH estimate
- `colorUtils.js`: Color conversion utilities (RGB to Lab, Lab to pH)
- `imageProcessor.js`: Server-side image processing (from original server)
- `calibration/`: Calibration data and scripts
  - `model.json`: Trained linear model coefficients
  - `generate_dataset.py`: Python script to generate calibration dataset
  - `calibration_samples.csv`: Sample calibration data

## Installation

1. Install Node.js
2. Run `npm install` to install dependencies (Sharp for image processing)

## Usage

```bash
node main.js <path_to_image.jpg>
```

Example:
```bash
node main.js sample.jpg
```

Output:
```
Average RGB: 128, 150, 200
Lab: L=65.43, a=-5.67, b=15.23
Estimated pH: 7.12
```

## Calibration

To calibrate the model:
1. Place calibration images in `calibration/images/` with filenames like `sample_pH7.0_1.jpg`
2. Run `python calibration/generate_dataset.py` to generate `calibration_samples.csv`
3. Train a linear regression model on the CSV data
4. Update `calibration/model.json` with the trained coefficients

## Dependencies

- sharp: For image processing and pixel extraction