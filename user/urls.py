from django.urls import path
from .views import *

urlpatterns = [
    path('', login, name="login"),
    path('register/', register, name="register"),
    path('logout/', user_logout, name="logout"),
]