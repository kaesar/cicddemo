# 1. Base Image 
FROM node:lts-alpine

# 2. Folder in container
WORKDIR /app

# 3. Files required
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose API
EXPOSE 3000

# Launch service
CMD ["node", "node dist/index.js"]
