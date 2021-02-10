from django.db.models import query
from django.shortcuts import render
from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

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
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status = status.HTTP_200_OK)
            else:
                #create a new room otherwise
                room = Room(host = host, guest_pausible = guest_pausible, votes_to_skip = votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status = status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': "Room Join!"}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Code'}, status = status.HTTP_400_BAD_REQUEST) 
        return Response({'Bad Request': 'Invalid Post Data'}, status = status.HTTP_400_BAD_REQUEST)
    
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

class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class LeaveRoom(APIView):
    def post(self, request, format=None): # post -> change, add , etc
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)

class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    
    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key): 
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_pausible')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)

            if not queryset.exists():
                return Response({'msg':'Awkward.. Room Does Not Exist....'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'msg': "Yo you cant do that, you're not the host of this room"}, status=status.HTTP_403_FORBIDDEN)
            
            room.guest_pausible = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_pausible', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status= status.HTTP_200_OK)

        return Response({"Bad Request": "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)