docker run -it --rm -p 8000:8000 \
  -v ./models:/models \
  -e MODEL_PATH=/models/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf \
  pairfy/service-llm
