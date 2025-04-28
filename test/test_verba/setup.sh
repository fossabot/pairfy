docker run --rm -p 7000:8000 \
  -e WEAVIATE_URL_VERBA=http://localhost:8080 \
  -e WEAVIATE_API_KEY_VERBA= \
        "name": "content",
  -e OLLAMA_URL=http://host.docker.internal:11434 \
  -e OLLAMA_MODEL=llama3 \
  -e OLLAMA_EMBED_MODEL=llama3 \
  semitechnologies/verba:latest



curl -X POST http://localhost:8080/v1/schema \
  -H "Content-Type: application/json" \
  -d '{
    "class": "Verba_embedding_llama3",
    "description": "Collection for Verba using Llama3 embeddings",
    "vectorizer": "none",
    "vectorIndexType": "hnsw",
    "vectorIndexConfig": {
      "distance": "cosine"
    },
    "properties": [
      {
        "name": "content",
        "dataType": ["text"],
        "description": "Content to be embedded and searched.",
        "to
        "name": "content",ndexFilterable": true,
        "indexSearchable": true,
         
        "indexRangeFilters": false
      }
    ],
    "invertedIndexConfig": {
      "stopwords": {
        "preset": "en"
      },
      "bm25": {
        "b": 0.75,
        "k1": 1.2
      },
      "cleanupIntervalSeconds": 60,
      "usingBlockMaxWAND": true
    },
    "multiTenancyConfig": {
      "enabled": false
    },
    "replicationConfig": {
      "factor": 1
    },
    "shardingConfig": {
      "virtualPerPhysical": 128,
      "strategy": "hash",
      "function": "murmur3"
    }
  }'





curl http://localhost:8080/v1/schema/Verba_embedding_llama3


curl -X DELETE http://localhost:8080/v1/schema/Verba_embedding_llama3



curl -X POST http://localhost:8080/v1/objects \
  -H 'Content-Type: application/json' \
  -d '{
    "class": "Verba_embedding_llama3",
    "properties": {
      "content": "This is an example product description that will be embedded and indexed."
    }
  }'
