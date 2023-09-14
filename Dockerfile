# 1. Base Image 
FROM node:lts-alpine

# 2. Folder in container
WORKDIR /app

# 3. Files required
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy bundle code
COPY . .

# 6. Build the bundle
RUN npm run build

# 7. Touch executable dist. & clean source code
RUN chmod +x dist/index.js && rm -rf src

# 8. Expose API
EXPOSE 3000

# 9. Launch service
CMD ["node", "dist/index.js"]
