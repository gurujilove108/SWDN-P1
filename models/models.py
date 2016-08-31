# User database, I like ndb.Expando because you can dynamically add columns
from google.appengine.ext import ndb
import logging

class User(ndb.Expando):
    account_name = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)        
    phone = ndb.StringProperty(required=True)
    employer = ndb.StringProperty(required=True)

    @classmethod
    def store_user(cls, user_data):
        if cls.exists(user_data.account_name):
            return False
        else:
            new_user_object = User(account_name = user_data.account_name,email = user_data.email,password = user_data.password,phone = user_data.phone,employer = user_data.phone)
            key = new_user_object.put()
            logging.info(key)
            logging.info(key.id())
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



class Event(ndb.Expando):
    event_name = ndb.StringProperty(required=True)
    event_type = ndb.StringProperty(required=True)
    event_host = ndb.StringProperty(required=True)
    event_start = ndb.StringProperty(required=True)
    event_end = ndb.StringProperty(required=True)
    event_guestlist = ndb.StringProperty(repeated=True)
    event_guest_message = ndb.TextProperty()

    @classmethod
    def store_event(cls, event_data):
        new_event = Event(
            event_name = event_data.event_name,
            event_type = event_data.event_type,
            event_host = event_data.event_host,
            event_start = event_data.event_start,
            event_end = event_data.event_end,
            event_guestlist = event_data.event_guestlist,
            event_guestmessage = event_data.event_guestmessage
        )

        key = new_event.put()
        logging.info("key and new_event")
        logging.info(key)
        logging.info(new_event)

        return (True, "event stored")


        