"""
Base model class for all AI models in LuwiEditor-AI.
"""
import torch
import torch.nn as nn
import onnx
import onnxruntime as ort
from abc import ABC, abstractmethod
from typing import Dict, Any
import yaml


class BaseModel(ABC, nn.Module):
    """Base class for all AI models."""
    
    def __init__(self, config_path: str = None):
        super().__init__()
        self.config = self.load_config(config_path) if config_path else {}
        
    def load_config(self, config_path: str) -> Dict[str, Any]:
        """Load model configuration from YAML file."""
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
    
    @abstractmethod
    def forward(self, x):
        """Forward pass - must be implemented by subclasses."""
        pass
    
    def export_onnx(self, output_path: str, input_shape: tuple, **kwargs):
        """Export model to ONNX format."""
        self.eval()
        dummy_input = torch.randn(input_shape)
        
        torch.onnx.export(
            self,
            dummy_input,
            output_path,
            opset_version=17,
            input_names=['input'],
            output_names=['output'],
            dynamic_axes={
                'input': {0: 'batch_size'},
                'output': {0: 'batch_size'}
            },
            **kwargs
        )
        
        # Verify the exported model
        onnx_model = onnx.load(output_path)
        onnx.checker.check_model(onnx_model)
        print(f"Model exported successfully to {output_path}")
    
    def load_weights(self, checkpoint_path: str):
        """Load model weights from checkpoint."""
        checkpoint = torch.load(checkpoint_path, map_location='cpu')
        self.load_state_dict(checkpoint['model_state_dict'])
        print(f"Loaded weights from {checkpoint_path}")


class ONNXInference:
    """Wrapper for ONNX Runtime inference."""
    
    def __init__(self, model_path: str, providers=['CPUExecutionProvider']):
        self.session = ort.InferenceSession(model_path, providers=providers)
        self.input_name = self.session.get_inputs()[0].name
        self.output_name = self.session.get_outputs()[0].name
    
    def __call__(self, input_data):
        """Run inference on input data."""
        return self.session.run(
            [self.output_name],
            {self.input_name: input_data}
        )[0]
