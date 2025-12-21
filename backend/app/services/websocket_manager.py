# app/services/websocket_manager.py

import json
import asyncio
from fastapi import WebSocket
from app.core.redis_client import get_redis

class WebSocketManager:
    def __init__(self):
        self.active_connections: dict = {} # user_id -> [websocket]

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
        
        # Start listening to Redis for this user
        asyncio.create_task(self.subscribe_to_user_events(user_id, websocket))

    def disconnect(self, websocket: WebSocket, user_id: str):
        self.active_connections[user_id].remove(websocket)

    async def subscribe_to_user_events(self, user_id: str, websocket: WebSocket):
        redis = get_redis()
        pubsub = redis.pubsub()
        await pubsub.subscribe(f"user:{user_id}")
        async for message in pubsub.listen():
            if message['type'] == 'message':
                await websocket.send_text(message['data'])

    async def broadcast_to_user(self, user_id: str, message: dict):
        """Publish event to Redis (triggered by API)"""
        redis = get_redis()
        await redis.publish(f"user:{user_id}", json.dumps(message))

manager = WebSocketManager()