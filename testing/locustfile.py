from locust import HttpUser, task, between

class serviceSeller(HttpUser):

    host = "http://service-seller:8000"
    
    wait_time = between(1, 2)

    @task
    def healthcheck(self):
        self.client.get("/api/seller/healthcheck")

class serviceUser(HttpUser):

    host = "http://service-user:8000"
    
    wait_time = between(1, 2)

    @task
    def healthcheck(self):
        self.client.get("/api/user/healthcheck")        

class serviceProduct(HttpUser):

    host = "http://service-product:4000"
    
    wait_time = between(1, 2)

    @task
    def healthcheck(self):
        self.client.get("/api/product/healthcheck")             