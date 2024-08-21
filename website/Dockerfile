# Use the node image as a base
FROM node:20-alpine

# Set working directory
WORKDIR /website

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the website code
COPY . .

# Run the build command
RUN npm run build

# Serve the Vite app
CMD ["npm", "run", "preview", "--", "--host"]