# Dockerfile

FROM node:20

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY ./src ./src

# Build TypeScript
RUN npm run build

# Expose app port
EXPOSE 5000

# Start app
CMD ["node", "dist/index.js"]
