from django.urls import path
from .views import add_file, delete_file, file_details, home

urlpatterns = [
    path('', home, name='home'),
    path('file_details/<int:id>/', file_details, name='file_details'),
    path('addfile/', add_file, name='addfile'),
    path('deletefile/<int:id>/', delete_file, name='deletefile')
]
