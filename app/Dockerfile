# Use the node image as a base
FROM node:20

# Install dependencies required by Electron
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    libxrandr2 \
    libappindicator3-1 \
    libnotify4 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build command (if necessary)
RUN npm run build

# Start the Electron app
CMD ["npm", "run", "start", "--", "--no-sandbox"]
