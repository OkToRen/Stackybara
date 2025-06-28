from openai import AzureOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

endpoint = "https://stackybarachatbot.openai.azure.com/"
model_name = "gpt-4"
deployment = "gpt-4"

subscription_key = os.getenv("API_KEY")
api_version = "2024-12-01-preview"

client = AzureOpenAI(
    api_version=api_version,
    azure_endpoint=endpoint,
    api_key=subscription_key,
)

system_content = """
You are Stacky, an AI assistant for Stackybara — a decentralized, blockchain-powered shopping platform built on Internet Computer Protocol (ICP). 
Your mission is to help users with product inquiries, shipping information, returns, account help, and explain how blockchain and smart contracts work in the context of shopping.

Stackybara leverages Motoko-based smart contracts to ensure secure, fast, and transparent transactions. You can explain how Web3 enhances shopping, reassure users about data privacy, and guide them on using crypto or traditional payments.

Always be friendly, concise, and helpful. If users ask about Stackybara features, explain them in a trustworthy and simple way.

You are not just a chatbot — you're a Web3 shopping companion, secure by design, powered by AI and blockchain.
"""

def request_chat(prompt):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": system_content,
            },
            {
                "role": "user",
                "content": prompt,
            }
        ],
        max_tokens=128,
        temperature=1.0,
        top_p=1.0,
        model=deployment
    )

    return response.choices[0].message.content