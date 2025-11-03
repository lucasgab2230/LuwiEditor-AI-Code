from django.urls import path
from .views import (
    upscale,
    music_generation,
    sound_effects,
    transitions,
    visual_effects,
    tts,
    text_to_video,
    color_correction,
    aspect_ratio_conversion,
    noise_reduction,
    silence_detection,
    shorts_generator,
    chat,
)

urlpatterns = [
    path('upscale/', upscale.UpscaleView.as_view(), name='upscale'),
    path('music-generation/', music_generation.MusicGenerationView.as_view(), name='music-generation'),
    path('sound-effects/', sound_effects.SoundEffectsView.as_view(), name='sound-effects'),
    path('transitions/', transitions.TransitionsView.as_view(), name='transitions'),
    path('visual-effects/', visual_effects.VisualEffectsView.as_view(), name='visual-effects'),
    path('tts/', tts.TTSView.as_view(), name='tts'),
    path('text-to-video/', text_to_video.TextToVideoView.as_view(), name='text-to-video'),
    path('color-correction/', color_correction.ColorCorrectionView.as_view(), name='color-correction'),
    path('aspect-ratio/', aspect_ratio_conversion.AspectRatioConversionView.as_view(), name='aspect-ratio'),
    path('noise-reduction/', noise_reduction.NoiseReductionView.as_view(), name='noise-reduction'),
    path('silence-detection/', silence_detection.SilenceDetectionView.as_view(), name='silence-detection'),
    path('shorts-generator/', shorts_generator.ShortsGeneratorView.as_view(), name='shorts-generator'),
    path('chat/', chat.ChatView.as_view(), name='chat'),
]
