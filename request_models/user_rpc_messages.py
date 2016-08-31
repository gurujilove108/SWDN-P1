from protorpc import messages

class UserSignupData(messages.Message):
    account_name = messages.StringField(1, required=True)
    email        = messages.StringField(2, required=True)
    password     = messages.StringField(3, required=True)
    phone        = messages.StringField(4, required=True)
    employer     = messages.StringField(5, required=True)

class UserSignupResponse(messages.Message):
    user_stored = messages.IntegerField(1, required=True)
    error_msg   = messages.StringField(2)

class UserLoginData(messages.Message):
    account_name = messages.StringField(1, required=True)
    password     = messages.StringField(2, required=True)

class UserLoginResponse(messages.Message):
    successful  = messages.IntegerField(1, required=True)
    error_msg   = messages.StringField(2)

class UserEventRequest(messages.Message):
    event_name         = messages.StringField(1, required=True)
    event_type         = messages.StringField(2, required=True)
    event_host         = messages.StringField(3, required=True)
    event_start        = messages.StringField(4, required=True)
    event_end          = messages.StringField(5, required=True)
    event_guestlist    = messages.StringField(6, repeated=True)
    event_guestmessage = messages.StringField(7)

class UserEventResponse(messages.Message):
    successful = messages.StringField(1, required=True)
    error_msg  = messages.StringField(2)


class EventsList(messages.Message):
    events = messages.MessageField(UserEventRequest, 1, repeated=True)

"""
34:40
In case I wanted to send requests manualy opposed to using gapi.client.apiname.methodname
I could just use the path 
"http://localhost:8080/_ah/api/endpoint_name/v1/path
obviously replacing localhost with whatever the correct url is

"""