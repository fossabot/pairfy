from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from llama_cpp import Llama
import os

MODEL_PATH = os.getenv("MODEL_PATH", "/models/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf")

app = FastAPI()

llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=1024,
    n_threads=8,
)

class PromptRequest(BaseModel):
    prompt: str
    max_tokens: int = 128

@app.post("/generate-stream")
def generate_stream(data: PromptRequest):
    def token_stream():
        for output in llm.create_completion(
            prompt=data.prompt,
            max_tokens=data.max_tokens,
            stream=True,
            stop=["</s>"]
        ):
            yield output["choices"][0]["text"]

    return StreamingResponse(token_stream(), media_type="text/plain")
