docker run -it --rm -p 8000:8000 \
  -v ./models:/models \
  -e MODEL_PATH=/models/Mistral-7B-Instruct-v0.3.Q4_K_M.gguf \
  pairfy/service-llm
