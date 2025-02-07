# Step 1: Specify the base image
FROM node:18-bullseye-slim

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the required port
EXPOSE 3000

# Step 7: Specify the command to run the app
CMD ["npm", "run","dev"]