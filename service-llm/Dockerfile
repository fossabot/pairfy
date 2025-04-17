FROM python:3.10-slim

RUN apt update && apt install -y --no-install-recommends \
    build-essential cmake libopenblas-dev git curl && \
    apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código y el modelo dentro de la imagen
COPY . .

# Define la ruta absoluta al modelo embebido en la imagen
ENV MODEL_PATH=/app/models/Mistral-7B-Instruct-v0.3.Q4_K_M.gguf

EXPOSE 8002

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
