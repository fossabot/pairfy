from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from llama_cpp import Llama
import os

MODEL_PATH = os.getenv("MODEL_PATH", "/models/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf")

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
            temperature=0.7,
            top_p=0.9,
            repeat_penalty=1.1,
            stop=["</s>", "User:", "Okay", "I will now", "Let me", "Here is", "Alright" ,"I should"]
        ):
            yield output["choices"][0]["text"]

    return StreamingResponse(token_stream(), media_type="text/plain")
