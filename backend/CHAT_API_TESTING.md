# Chat API Testing Guide

## How Session ID Works

The `session_id` is used to maintain conversation context across multiple messages.

### Flow:
1. **First message**: Don't provide `session_id` → API creates new session → Returns `session_id`
2. **Next messages**: Use the returned `session_id` → API continues same conversation

---

## API Endpoint

**POST** `/api/v1/chat/`

### Request Body
```json
{
  "message": "Your message here",
  "session_id": "optional-uuid-string"  // Omit for new conversation
}
```

### Response
```json
{
  "response": "AI response text",
  "session_id": "uuid-string"  // Always returned - use for next message
}
```

---

## Testing Examples

### Example 1: Start New Conversation

**Request:**
```bash
curl -X POST http://localhost:8000/api/v1/chat/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a budget of 5000 for food"
  }'
```

**Response:**
```json
{
  "response": "✅ Budget **Food** created.\nLimit: ₹5000 (monthly)",
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### Example 2: Continue Conversation (Use session_id)

**Request:**
```bash
curl -X POST http://localhost:8000/api/v1/chat/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is my current spending?",
    "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }'
```

**Response:**
```json
{
  "response": "Based on your recent transactions...",
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Note:** The `session_id` stays the same for the same conversation thread.

---

## Using Postman/Thunder Client

### Step 1: First Message
1. Method: `POST`
2. URL: `http://localhost:8000/api/v1/chat/`
3. Headers:
   - `Authorization: Bearer YOUR_TOKEN`
   - `Content-Type: application/json`
4. Body (JSON):
   ```json
   {
     "message": "Hello, I want to track my expenses"
   }
   ```
5. **Save the `session_id` from response**

### Step 2: Continue Conversation
1. Same endpoint and headers
2. Body (JSON):
   ```json
   {
     "message": "Show me my budgets",
     "session_id": "PASTE_SESSION_ID_FROM_STEP_1"
   }
   ```

---

## Using Python/JavaScript

### Python Example
```python
import requests

BASE_URL = "http://localhost:8000/api/v1/chat/"
TOKEN = "YOUR_TOKEN"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# First message - no session_id
response1 = requests.post(
    BASE_URL,
    headers=headers,
    json={"message": "Create a budget of 5000 for groceries"}
)
data1 = response1.json()
session_id = data1["session_id"]
print(f"Response: {data1['response']}")
print(f"Session ID: {session_id}")

# Second message - use session_id
response2 = requests.post(
    BASE_URL,
    headers=headers,
    json={
        "message": "What budgets do I have?",
        "session_id": session_id
    }
)
data2 = response2.json()
print(f"Response: {data2['response']}")
```

### JavaScript/TypeScript Example
```javascript
const BASE_URL = "http://localhost:8000/api/v1/chat/";
const TOKEN = "YOUR_TOKEN";

async function chat(message, sessionId = null) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      session_id: sessionId
    })
  });
  
  return await response.json();
}

// First message
const firstResponse = await chat("Create a budget of 5000 for food");
console.log("Response:", firstResponse.response);
console.log("Session ID:", firstResponse.session_id);

// Continue conversation
const secondResponse = await chat(
  "What is my spending this month?",
  firstResponse.session_id
);
console.log("Response:", secondResponse.response);
```

---

## Session ID Format

- **Type**: UUID string
- **Example**: `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`
- **Generated**: Automatically by the API when creating a new session
- **Persistent**: Same session_id for entire conversation thread
- **User-specific**: Each user has their own sessions

---

## Important Notes

1. **Optional for first message**: You can omit `session_id` or set it to `null` for new conversations
2. **Always returned**: Every response includes `session_id` - save it for next message
3. **Same session = same context**: Messages in the same session share conversation history
4. **New session = fresh start**: Without `session_id`, a new conversation starts
5. **User isolation**: Sessions are tied to the authenticated user

---

## Testing Different Actions

### Create Transaction
```json
{
  "message": "I spent 500 at Starbucks"
}
```

### Create Budget
```json
{
  "message": "Set a budget of 5000 for food monthly"
}
```

### Create Goal
```json
{
  "message": "I want to save 100000 for a car by 2025-12-31"
}
```

### Confirm Action (if confirmation required)
```json
{
  "message": "confirm",
  "session_id": "your-session-id"
}
```

---

## Error Handling

If you provide an invalid `session_id`:
- API will create a new session
- Returns new `session_id` in response
- Previous conversation context is lost

If `session_id` belongs to another user:
- API will create a new session
- Security: Users can only access their own sessions

