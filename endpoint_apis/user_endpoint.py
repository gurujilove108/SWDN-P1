import endpoints
from request_models.user_rpc_messages import *
from protorpc import remote
from settings import WEB_CLIENT_ID

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name="user_endpoint", version="v1", allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE], description="Endpoint for managing user functions")
class UserEndpoint(remote.Service):
    @endpoints.method(UserCredentialsMessage, UserCredentialsMessage, path="modify_user_credentials", http_method="POST", name="modify_credentials")
    def modify_user_credentials(self, user_credentials):
        user_credentials.username *= 2
        return user_credentials