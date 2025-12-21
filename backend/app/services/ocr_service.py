# app/services/ocr_service.py
from google.cloud import vision

_client = None

def get_vision_client():
    global _client
    if _client is None:
        _client = vision.ImageAnnotatorClient()
    return _client

async def extract_text_from_image(image_bytes: bytes) -> str:
    client = get_vision_client()
    image = vision.Image(content=image_bytes)
    response = client.text_detection(image=image)

    if response.error.message:
        raise RuntimeError(response.error.message)

    return response.full_text_annotation.text
