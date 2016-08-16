import endpoints
from request_models.greeting_rpc_messages import *
from protorpc import remote

@endpoints.api(name="greeting_endpoint", version="v1", description="greeting")
class GreetingEndpoint(remote.Service):

    @endpoints.method(GreetingMessage, GreetingMessage, path="modify_greeting", http_method="POST", name="modify_greeting")
    def modify_greeting(self, greeting):
        greeting.name = greeting.name * 2
        logging.info(greeting)
        return greeting