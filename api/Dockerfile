# Use the node image as a base
FROM node:20-alpine

# Set working directory
WORKDIR /api

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the API code
COPY . .

# Expose the port the API runs on
EXPOSE 8080

# Start the Express.js API
CMD ["npm", "run", "nodemon"]
