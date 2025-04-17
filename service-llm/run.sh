docker run -it --rm -p 8002:8002 \
  -v ./models:/models \
  -e MODEL_PATH=/models/Mistral-7B-Instruct-v0.3.Q4_K_M.gguf \
  pairfy/service-llm
