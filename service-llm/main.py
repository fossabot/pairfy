from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from llama_cpp import Llama
import os

MODEL_PATH = os.getenv("MODEL_PATH")

app = FastAPI()

llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,      
    n_threads=8,
)

class PromptRequest(BaseModel):
    prompt: str
    max_tokens: int = 256 

@app.post("/generate-stream")
def generate_stream(data: PromptRequest):
    def token_stream():
        for output in llm.create_completion(
            prompt=data.prompt.strip(),
            max_tokens=data.max_tokens,
            stream=True,
            temperature=0.7,
            top_p=0.9,
            repeat_penalty=1.1,
            stop=["</s>"]
        ):
            yield output["choices"][0]["text"]

    return StreamingResponse(token_stream(), media_type="text/plain")
