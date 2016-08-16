from protorpc import messages

class UserCredentialsMessage(messages.Message):
    username = messages.StringField(1)
    password = messages.StringField(2)

