# Base image
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code to the container
COPY . .

# Build the app
#RUN npm run build

# Serve the app using Nginx
#FROM nginx:latest
#COPY --from=builder /app/build /usr/share/nginx/html
#EXPOSE 80
CMD ["npm", "run", "build"]