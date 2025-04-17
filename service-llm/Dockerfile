FROM python:3.10-slim

RUN apt update && apt install -y --no-install-recommends \
    build-essential cmake libopenblas-dev git curl && \
    apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

VOLUME ["/models"]

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
