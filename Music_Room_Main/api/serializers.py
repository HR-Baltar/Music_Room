from django.db.models import fields
from rest_framework import serializers
from rest_framework.utils import field_mapping ### utils import field_mapping
from .models import *

class RoomSerializer(serializers.ModelSerializer): #ModelSerializers
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_pausible', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_pausible', 'votes_to_skip')