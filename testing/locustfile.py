from locust import HttpUser, task, between, TaskSet
import requests
import logging

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class ServiceSeller(HttpUser):

    host = "http://service-seller:8000"
    
    wait_time = between(1, 2)

    @task
    def healthcheck(self):
        self.client.get("/api/seller/healthcheck")

class ServiceUser(HttpUser):

    host = "http://service-user:8000"
    
    wait_time = between(1, 2)

    @task
    def healthcheck(self):
        self.client.get("/api/user/healthcheck")        

class CreateProductTest(TaskSet):

    def on_start(self):
        self.jwt_token = self.get_jwt_token()

    def get_jwt_token(self):
        auth_service_host = "http://service-seller:8000" 
        auth_endpoint = "/api/seller/login-seller" 
        credentials = {
            "email": "tester1@gmail.com", 
            "password": "Test123",
        }
        

        try:
            response = requests.post(
                f"{auth_service_host}{auth_endpoint}",
                json=credentials,
                timeout=5  
            )
            response.raise_for_status() 

            logger.info(f"Auth Response JSON: {json.dumps(response.json(), indent=2)}")
            
            return response.json().get("token")
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch JWT token: {e}")
            return None
        
    @task
    def graphql_query(self):
        if not self.jwt_token:

            return

        query = """
        query {
            someData {
                id
                name
            }
        }
        """
        headers = {"Authorization": f"Bearer {self.jwt_token}"}
        

        response = self.client.post(
            "/api/product/graphql",  
            json={"query": query},
            headers=headers,
        )
        
        if response.status_code != 200:
            response.failure("GraphQL query failed")

class ServiceProduct(HttpUser):
    tasks = [CreateProductTest]
    host = "http://service-product:4000" 
    wait_time = between(1, 3)  