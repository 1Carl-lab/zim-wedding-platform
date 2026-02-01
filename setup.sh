#!/bin/bash

echo "======================================"
echo "Zimbabwe Wedding Platform - Quick Start"
echo "======================================"
echo ""

# Check if MongoDB is running (optional)
echo "Note: Make sure MongoDB is running on localhost:27017"
echo ""

# Backend setup
echo "Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "✓ .env file created. Please update with your actual credentials."
fi

if [ ! -d node_modules ]; then
    echo "Installing backend dependencies..."
    npm install
    echo "✓ Backend dependencies installed"
else
    echo "✓ Backend dependencies already installed"
fi

cd ..

# Frontend setup
echo ""
echo "Setting up Frontend..."
cd frontend

if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "✓ .env file created"
fi

if [ ! -d node_modules ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo "✓ Frontend dependencies installed"
else
    echo "✓ Frontend dependencies already installed"
fi

cd ..

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Start the backend (in one terminal):"
echo "   cd backend && npm start"
echo ""
echo "2. Start the frontend (in another terminal):"
echo "   cd frontend && npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
