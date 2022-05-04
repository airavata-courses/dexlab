from pydantic import BaseSettings

class Settings(BaseSettings):
    #GATEWAY_SERV_URL: str = "http://localhost:7777"
    #SESSION_SERV_URL: str = "http://localhost:10000"

    class Config:
        env_file = ".env"