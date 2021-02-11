from django.urls import path #forgot .urls
from . import views

urlpatterns = [ 
    path('get-auth-url' ,views.AuthURL.as_view()),
    path('redirect', views.spotify_callback),
    path('is-authenticated', views.IsAuthenticated.as_view()),
]