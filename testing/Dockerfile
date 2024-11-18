# Base image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Copy test files and install dependencies
COPY . .

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Expose Locust web UI and worker communication ports
EXPOSE 8089 5557 5558

# Start Locust master or worker based on an environment variable
RUN ["sh", "-c", "locust --version"]

CMD ["sh", "-c", "locust -f locustfile.py"]