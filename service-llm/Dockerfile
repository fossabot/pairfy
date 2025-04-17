FROM python:3.10-slim

RUN apt update && apt install -y build-essential cmake libopenblas-dev git curl

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# dejamos que /models se monte como volumen
VOLUME ["/models"]

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
