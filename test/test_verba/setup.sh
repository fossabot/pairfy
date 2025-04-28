docker run --rm -p 8000:8000 \
  -e WEAVIATE_URL_VERBA=http://localhost:8080 \
  -e WEAVIATE_API_KEY_VERBA= \
  -e OLLAMA_URL=http://host.docker.internal:11434 \
  -e OLLAMA_MODEL=llama3 \
  -e OLLAMA_EMBED_MODEL=llama3 \
  semitechnologies/verba:latest



curl -X POST http://localhost:8080/v1/schema \
  -H 'Content-Type: application/json' \
  -d '{
    "class": "verba_embedding_llama3",
    "description": "Collection for Verba using Llama3 embeddings",
    "vectorizer": "none",
    "replicationConfig": {
      "factor": 1
    },
    "properties": [
      {
        "name": "content",
        "dataType": ["text"],
        "description": "The text content to be embedded"
      }
    ]
}'
