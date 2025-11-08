# LuwiEditor-AI Models

This directory contains all AI models for the LuwiEditor-AI project. Each model is trained using PyTorch and exported to ONNX format for production inference.

## Directory Structure

- `upscaling/` - Video upscaling to 4K60FPS
- `music-generation/` - Copyright-free music generation
- `sound-effects/` - Sound effects generation
- `transitions/` - Transition generation
- `visual-effects/` - Visual effects generation
- `tts/` - Text-to-Speech models
- `text-to-video/` - Text to video generation
- `color-correction/` - Automatic color correction
- `aspect-ratio/` - Smart aspect ratio conversion
- `noise-reduction/` - Audio noise reduction
- `silence-detection/` - Silence detection and removal
- `shorts-generator/` - Long video to shorts converter
- `weights/` - Trained model weights (ONNX and PyTorch)

## Training Data

All models are trained on copyright-free datasets:
- Videos: Open-source video datasets
- Audio: Creative Commons licensed audio
- Music: Public domain and CC0 licensed music
- Images: Pexels, Pixabay, Unsplash APIs

## Model Architecture

Each model directory contains:
- `model.py` - PyTorch model architecture
- `train.py` - Training script
- `inference.py` - ONNX inference
- `export.py` - PyTorch to ONNX export
- `config.yaml` - Model configuration
- `README.md` - Model-specific documentation

## Usage

### Training a Model

```bash
cd ai-models/<model-name>
python train.py --config config.yaml
```

### Exporting to ONNX

```bash
python export.py --checkpoint weights/best_model.pth --output weights/model.onnx
```

### Running Inference

```bash
python inference.py --model weights/model.onnx --input sample_input.mp4
```

## Performance

All models are optimized for CPU inference using ONNX Runtime with the following targets:
- Upscaling: < 5s per frame (1080p to 4K)
- Music Generation: < 30s per minute
- Sound Effects: < 5s per effect
- Transitions: < 2s per transition
- Visual Effects: < 10s per second of video
- TTS: < 1s per sentence
- Text-to-Video: < 60s per video
- Color Correction: < 5s per second of video
- Aspect Ratio: < 3s per second of video
- Noise Reduction: < 5s per second of audio
- Silence Detection: < 2s per second of audio
- Shorts Generator: < 60s for 5-minute video

## License

All models and training code are released under the MIT License.
All training data used is copyright-free and properly attributed.
