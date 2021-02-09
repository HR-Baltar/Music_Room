from django.urls import path #forgot .urls
from . import views

urlpatterns = [ 
    path('create_room', views.RoomCreate.as_view()), #as_view()
    path('', views.RoomView.as_view()),
    path('get-room', views.GetRoom.as_view()),
    path('join-room', views.JoinRoom.as_view()),
    path('user-in-room', views.UserInRoom.as_view()),
    path('leave-room', views.LeaveRoom.as_view()),

]