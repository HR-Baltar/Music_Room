from django.db import models
from django.db.models.fields import CharField
import string, random

# Create your models here.

# generates a random defaut code
def generate_code():
    length = 6

    # instantiate a code until it is considered unique
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k = length)) #string.ascii
        if Room.objects.filter(code = code).count() == 0: # checks if the code is unique
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_pausible = models.BooleanField(null = False, default=True)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)