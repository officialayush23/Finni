# app/services/ocr_service.py

from google.cloud import vision
import base64

client = vision.ImageAnnotatorClient()

async def extract_text_from_image(image_bytes: bytes) -> str:
    image = vision.Image(content=image_bytes)
    response = client.text_detection(image=image)

    if response.error.message:
        raise RuntimeError(response.error.message)

    return response.full_text_annotation.text
