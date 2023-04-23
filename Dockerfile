# Use the official Node.js v14 LTS image as a base
FROM node:14-alpine

# Create and set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000 for incoming traffic
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application using the built TypeScript code
CMD ["node", "dist/index.js"]
