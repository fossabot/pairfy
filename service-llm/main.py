from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from llama_cpp import Llama
import os
from templates.product_description import product_description


MODEL_PATH = os.getenv("MODEL_PATH")

app = FastAPI()

llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,      
    n_threads=8,
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/api/llm/product-description")
def generate_product_description(data: PromptRequest):
    
    input_ = data.prompt.strip()
    
    if not input_:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    if len(input_) > 1000:
        raise HTTPException(status_code=400, detail="Prompt exceeds 1000 characters.")

    prompt = product_description.format(product=data.prompt.strip())
    
    print(prompt)
    
    def token_stream():
        for output in llm.create_completion(
            prompt=prompt,
            max_tokens=1000,
            stream=True,
            temperature=0.7,
            top_p=0.9,
            repeat_penalty=1.1,
            stop=["</s>"]
        ):
            yield output["choices"][0]["text"]

    return StreamingResponse(token_stream(), media_type="text/plain")



