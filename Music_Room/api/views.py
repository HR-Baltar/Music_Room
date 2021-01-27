from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomCreate(APIView):
    serializer_class = CreateRoomSerializer #serializer_class

    #handles POST METHOD
    def post(self, request, format = None):
        #checks if user has an active session and creates one if there is not one
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()
        
        #instance a serializer with the data of interest 
        serializer = self.serializer_class(data = request.data)

        # check if the data is valid and provides an error message otherwise
        if serializer.is_valid():
            #instantiate variables for later use. 
            guest_pausible = serializer.data.get('guest_pausible')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            queryset = Room.objects.filter(host = host) #creates a list of all rooms with the host of interest 

            #check if the host key actually exists
            if queryset.exists():
                #This means the host is updating an already existing room. 
                room = queryset[0] #
                room.guest_pausible = guest_pausible
                room.votes_to_skip = votes_to_skip
                room.save(update_fields = ['guest_pausible', 'votes_to_skip']) # pass parameter to update rather then create a new room

            else:
                #create a new room otherwise
                room = Room(host = host, guest_pausible = guest_pausible, votes_to_skip = votes_to_skip)
                room.save()
    
            return Response(RoomSerializer(room).data, status = status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request':'Code Param not found in request'})

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer