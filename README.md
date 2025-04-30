# 🚀 SocketIOTest

[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Built%20With-Docker-blue)](https://www.docker.com/)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](#)

A simple test project to debug why **Kubernetes** is cutting off **Socket.IO** connections.

> 🔍 This is a public repository to make debugging easier – no credentials or sensitive data involved.

---

## 🧪 What this is about

We're encountering issues where **Socket.IO** connections are unexpectedly dropped when deployed in a Kubernetes environment. This repo serves as a **minimal reproducible example** to:

- Investigate WebSocket behavior in Kubernetes
- Check for ingress controller or timeout issues
- Play with keep-alive intervals and reconnection logic

---

## 🛠️ Tech Stack

- Node.js + Express
- Socket.IO
- Docker
- Kubernetes (for testing)

---

## 🚀 Getting Started

### Run locally:

```bash
docker compose up --build
cd client
npm install
npm start