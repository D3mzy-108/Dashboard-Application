from django.urls import path
from .views import *

urlpatterns = [
    path('my_files/', home, name='home'),
    path('my_file/<int:id>/dashboard/', file_details, name='file_details'),
    path('addfile/', add_file, name='addfile'),
    path('editfile/<int:id>', edit_file, name='edit_file'),
    path('deletefile/<int:id>/', delete_file, name='deletefile'),
    path('add_card/<int:id>/', add_card, name='add_card'),
    path('edit_card/<int:file_id>/<int:id>/', edit_card, name='edit_card'),
    path('add_chart/<int:id>/', add_chart, name='add_chart'),
    path('edit_chart/<int:file_id>/<int:id>/', edit_chart, name='edit_chart'),
]
