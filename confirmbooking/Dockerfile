# Dockerfile for booking-detail
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
