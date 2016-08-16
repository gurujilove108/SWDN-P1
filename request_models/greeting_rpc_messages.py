from protorpc import messages

class GreetingMessage(messages.Message):
    name = messages.StringField(1)
    message = messages.StringField(2)

