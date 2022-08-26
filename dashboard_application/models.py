from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.


class UploadedFile(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='files', validators=[FileExtensionValidator(
        ['csv'])])
    date_added = models.DateField(auto_now_add=True)
    selected = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.file}"
