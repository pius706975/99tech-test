# Scoreboard API Service Documentation

## Overview
This document provides a detailed specification for the **Scoreboard API Service**, which is responsible for managing user scores, providing real-time scoreboard updates, and ensuring secure score updates through robust authentication and validation mechanisms.

The goal is to enable live updates of the top 10 user scores on a website, while ensuring the integrity of the data by preventing unauthorized updates.

---

## Features
- Retrieve the **top 10 scores** of users.
- Securely **update user scores** based on completed actions.
- **Live updates** for all clients using WebSocket connections.
- Robust mechanisms to prevent **malicious score updates**.

---

## API Endpoints

### 1. **POST /api/v1/score**
**Description**: Updates a user's score upon completion of a specific action.

#### Request Format
- **URL**: /api/v1/score
- **Method**: POST
- **Content-Type**: application/json

#### Request Body
```json
{
  "user_id": "1234",
  "action_id": "5678",
  "new_score": 1500,
  "auth_token": "valid_token_here"
}
```

| Parameter   | Type     | Description                                     |
|-------------|----------|-------------------------------------------------|
| user_id   | string | Unique identifier for the user.                |
| action_id | string | Identifier for the completed action.           |
| new_score | number | The updated score after action completion.     |
| auth_token| string | Token for authentication and verification.     |

#### Responses
1. **Success**: 200 OK
```json
{
  "message": "Score updated successfully."
}
```

2. **Unauthorized**: 401 Unauthorized
```json
{
  "message": "Invalid or missing authorization token."
}
```

3. **Forbidden**: 403 Forbidden
```json
{
  "message": "User is not authorized to update this score."
}
```

4. **Invalid Input**: 400 Bad Request
```json
{
  "message": "Invalid input. Please check the user_id, action_id, or new_score."
}
```

### 2. **GET /api/v1/scoreboard**
**Description**: Retrieves the top 10 scores of users for display on the scoreboard.

#### Request Format
- **URL**: /api/v1/scoreboard
- **Method**: GET

#### Responses
1. **Success**: 200 OK
```json
{
  "scores": [
    {"user_id": "1", "score": 2000},
    {"user_id": "2", "score": 1985},
    {"user_id": "3", "score": 1500}
  ]
}
```

---

## Authentication and Authorization Flow

### Overview
To ensure secure access and control over the API, the following **authentication** and **authorization** flows are implemented:

1. **Token-Based Authentication**:
   - Users must include a valid `auth_token` in the headers of API requests.
   - Tokens are issued after successful login and have a limited validity period.

2. **Role-Based Authorization**:
   - Only authorized users are allowed to update their own scores.
   - Role checks prevent unauthorized actions, such as updating another user's score.

### Flow Steps
1. **User Authentication**:
    - A user logs in and receives an `auth_token`.
    - The `auth_token` is verified for each API call using a secure session or JWT decoding.

2. **Authorization Check**:
    - Upon receiving a request, the backend ensures the `user_id` in the request matches the ID associated with the provided token.
    - Any mismatch results in a `403 Forbidden` response.

3. **Rate Limiting**:
    - Each user is limited to a specific number of requests per minute to prevent abuse.

4. **Logging and Monitoring**:
    - Every score update is logged, including user ID, action ID, timestamp, and outcome (success/failure).

---

## Security Measures

1. **Authentication and Authorization**
   - Each API call to update scores requires a valid **auth_token**.
   - Tokens are validated against a secure session or database.
   - Users can only update their own scores, not scores of others.

2. **Input Validation**
   - Ensure all inputs, such as user_id, new_score, and action_id, are validated to prevent SQL injection or invalid data types.

3. **Rate Limiting**
   - Implement rate limiting to prevent abuse from malicious actors.

4. **Data Integrity**
   - Log all score update attempts, successful or otherwise, for auditing purposes.

5. **WebSocket Security**
   - Ensure WebSocket connections are authenticated and encrypted to prevent unauthorized access to live updates.

---

## Database Schema

### **Users Table**
| Column       | Type       | Description                     |
|--------------|------------|---------------------------------|
| user_id    | string   | Primary key, unique user ID.    |
| username   | string   | User's display name.            |
| score      | integer  | Current score of the user.      |

### **Actions Table**
| Column       | Type       | Description                     |
|--------------|------------|---------------------------------|
| action_id  | string   | Primary key, unique action ID.  |
| description| string   | Description of the action.      |

---

## Real-Time Score Updates

### Implementation
- **WebSocket Endpoint**: /ws/scoreboard
- **Purpose**: Broadcast updated scores to all connected clients whenever a user score changes.
- **Flow**:
    1. User completes an action.
    2. Backend updates the user's score in the database.
    3. Top 10 scores are recalculated and broadcast to all clients via WebSocket.

---

## Diagram: Execution Flow
1. User completes an action.
2. API call to /api/v1/score with user ID, action ID, and new score.
3. Backend validates the auth_token and checks if the user is authorized.
4. Backend validates the action_id and new_score.
5. If valid, the score is updated in the database.
6. The top 10 scores are recalculated.
7. The updated scoreboard is sent via WebSocket to connected clients.

---

## Suggestions for Improvement
1. **Scalability**:
   - Use a caching layer (e.g., Redis) to store the top 10 scores for faster retrieval.
   - Implement a message queue (e.g., RabbitMQ) for handling WebSocket broadcasts efficiently.

2. **Monitoring**:
   - Add dashboards for tracking API usage and score update patterns.
   - Implement alerts for suspicious activities, such as rapid score increases.

3. **Future Features**:
   - Allow users to view their rank beyond the top 10.
   - Add APIs for retrieving historical scores or trends over time.

---

This specification is designed to provide clear and actionable requirements for the backend engineering team. For any further clarification, please reach out to the project lead.

