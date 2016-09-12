# User database, I like ndb.Expando because you can dynamically add columns
from google.appengine.ext import ndb
import logging

class User(ndb.Expando):
    account_name = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)        
    phone = ndb.StringProperty()
    employer = ndb.StringProperty()

    @classmethod
    def store_user(cls, user_data):
        if cls.exists(user_data.account_name):
            return False
        else:
            new_user_object = User(account_name = user_data.account_name,email = user_data.email,password = user_data.password,phone = user_data.phone,employer = user_data.phone)
            key = new_user_object.put()
            return True

    @classmethod
    def login_user(cls, user_data):
        if not cls.exists(user_data.account_name):
            return (False, "user account name does not exist")
        else:
            return (True, "user is logged in")

    @classmethod 
    def exists(cls, account_name):
        query = User.query(User.account_name == account_name)
        return query.get() != None

    @classmethod
    def match(cls, username, passwd):
        query = User.query(User.account_name == username and User.password == passwd)
        return query.get() != None



class Event(ndb.Expando):
    event_name          = ndb.StringProperty(required=True)
    event_types         = ndb.StringProperty(repeated=True)
    event_host          = ndb.StringProperty(required=True)
    event_start         = ndb.IntegerProperty(required=True)
    event_end           = ndb.IntegerProperty(required=True)
    event_guestlist     = ndb.StringProperty(repeated=True)
    event_guestmessage  = ndb.TextProperty()
    event_created       = ndb.DateTimeProperty(auto_now_add=True)
    event_last_modified = ndb.DateTimeProperty(auto_now=True)
    event_address       = ndb.StringProperty(required=True)

    @classmethod
    def store_event(cls, event_data):
        new_event = Event(
            event_name = event_data.event_name,
            event_types = event_data.event_types,
            event_host = event_data.event_host,
            event_start = event_data.event_start,
            event_end = event_data.event_end,
            event_guestlist = event_data.event_guestlist,
            event_guestmessage = event_data.event_guestmessage,
            event_address = event_data.event_address
        )

        key = new_event.put()
        return (True, "event stored")


        