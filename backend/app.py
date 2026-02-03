from __future__ import annotations

from datetime import datetime
from typing import Dict, List
from uuid import uuid4

from flask import Flask, jsonify, request


app = Flask(__name__)

POSTS: List[Dict[str, str]] = []


def _now_iso() -> str:
    return datetime.utcnow().isoformat() + "Z"


@app.get("/posts")
def list_posts():
    return jsonify(POSTS)


@app.post("/posts")
def create_post():
    payload = request.get_json(silent=True) or {}
    required_fields = {"message", "location", "category", "status", "userId", "email"}
    missing = [field for field in required_fields if not payload.get(field)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    post = {
        "id": str(uuid4()),
        "message": payload["message"],
        "location": payload["location"],
        "category": payload["category"],
        "status": payload["status"],
        "statusColor": payload.get("statusColor", "text-foreground"),
        "userId": payload["userId"],
        "email": payload["email"],
        "timestamp": payload.get("timestamp", _now_iso()),
    }
    POSTS.append(post)
    return jsonify(post), 201


@app.get("/posts/<post_id>")
def get_post(post_id: str):
    post = next((item for item in POSTS if item["id"] == post_id), None)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    return jsonify(post)


@app.patch("/posts/<post_id>")
def update_post(post_id: str):
    post = next((item for item in POSTS if item["id"] == post_id), None)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    payload = request.get_json(silent=True) or {}
    for key in [
        "message",
        "location",
        "category",
        "status",
        "statusColor",
    ]:
        if key in payload:
            post[key] = payload[key]
    return jsonify(post)


@app.delete("/posts/<post_id>")
def delete_post(post_id: str):
    index = next((i for i, item in enumerate(POSTS) if item["id"] == post_id), None)
    if index is None:
        return jsonify({"error": "Post not found"}), 404
    POSTS.pop(index)
    return jsonify({"status": "deleted"})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
