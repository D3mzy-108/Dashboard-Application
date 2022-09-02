from django.urls import path
from .views import add_card, add_file, delete_file, edit_card, file_details, home

urlpatterns = [
    path('', home, name='home'),
    path('file_details/<int:id>/', file_details, name='file_details'),
    path('addfile/', add_file, name='addfile'),
    path('deletefile/<int:id>/', delete_file, name='deletefile'),
    path('add_card/<int:id>/', add_card, name='add_card'),
    path('edit_card/<int:file_id>/<int:id>/', edit_card, name='edit_card'),
]
