import endpoints
import logging
from models.models 						import *
from protorpc 							import remote, message_types
from endpoints_proto_datastore.ndb		import EndpointsModel
from settings 							import WEB_CLIENT_ID
from request_models.user_rpc_messages 	import *

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name="user_endpoint", version="v1", allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE], description="Endpoint for managing user login and signup")
class UserEndpoint(remote.Service):

    @endpoints.method(UserSignupData, UserSignupResponse, path="user_signup_path", http_method="POST", name="user_signup")
    def store_user(self, user_data):
    	user_stored = User.store_user(user_data)
    	if user_stored:
    		return UserSignupResponse(user_stored=1, error_msg="no error")
    	elif not user_stored:
    		return UserSignupResponse(user_stored=0, error_msg="users account name already exists")
    
    @endpoints.method(UserLoginData, UserLoginResponse, path="user_login_path", http_method="POST", name="user_login")
    def logged_in(self, user_login_data):
    	user_logged_in, msg = User.login_user(user_login_data)
    	if user_logged_in:
    		return UserLoginResponse(successful=1)
    	else:
    		return UserLoginResponse(successful=0, error_msg=msg)


    @endpoints.method(UserEventRequest, UserEventResponse, path="create_event_path", http_method="POST", name="create_event")
    def create_event(self, event_data):
    	event_stored, msg = Event.store_event(event_data)
    	return UserEventResponse(successful="1", error_msg="no error")
    	

    @endpoints.method(message_types.VoidMessage,message_types.VoidMessage,path="get_events", http_method="POST", name="all_events")
    def return_events(self):
    	return Event.all()



    

""" 
For a void return type, use message_types.VoidMessage
"""
