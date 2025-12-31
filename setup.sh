#!/bin/bash

echo "========================================="
echo "Hanuman Chalisa App - Setup Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend setup
echo -e "${GREEN}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit backend/.env with your credentials${NC}"
fi

echo "Installing backend dependencies..."
npm install

echo -e "${GREEN}Backend setup complete!${NC}"
echo ""

# Frontend setup
echo -e "${GREEN}Setting up Frontend...${NC}"
cd ../front-end

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit front-end/.env with your configuration${NC}"
fi

echo "Installing frontend dependencies..."
npm install

echo -e "${GREEN}Frontend setup complete!${NC}"
echo ""

cd ..

echo "========================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your database and API credentials"
echo "2. Configure front-end/.env with your backend URL"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd front-end && npm start"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Happy coding! 🚀"
