from django.urls import path #forgot .urls
from . import views

urlpatterns = [ 
    path('get-auth-url' ,views.AuthURL.as_view()),
    path('redirect', views.spotify_callback),
    path('is-authenticated', views.IsAuthenticated.as_view()),
    path('current-song', views.CurrentSong.as_view()),
    path('play-song', views.PlaySong.as_view()),
    path('pause-song', views.PauseSong.as_view()),
    path('skip-song', views.SkipSong.as_view()),
]