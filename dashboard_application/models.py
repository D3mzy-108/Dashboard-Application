from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User

# Create your models here.


class UploadedFile(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='files', validators=[FileExtensionValidator(
        ['csv'])])
    date_added = models.DateField(auto_now_add=True)
    selected = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="my_files")

    def __str__(self):
        return f"{self.title}"


class DashboardCardSettings(models.Model):
    actions = [
        ('len', 'len'),
        ('sum', 'sum'),
        ('avg', 'avg')
    ]

    title = models.CharField(max_length=50)
    data_column = models.CharField(max_length=100)
    uploaded_file = models.ForeignKey(
        UploadedFile, on_delete=models.CASCADE, related_name='dashboard_data')
    action = models.CharField(max_length=10, choices=actions, default='len')

    def __str__(self):
        return self.title


class DashboardChartSettings(models.Model):
    chart_types = [
        ('bar', 'Bar Chart'),
        ('line', 'Line Graph'),
        ('doughnut', 'Doughnut Chart')
    ]
    
    title = models.CharField(max_length=50)
    data_y = models.CharField(max_length=100)
    data_x = models.CharField(max_length=100)
    uploaded_file = models.ForeignKey(
        UploadedFile, on_delete=models.CASCADE, related_name='dashboard_charts')
    group_common_data = models.BooleanField(default=False)
    chart_type = models.CharField(max_length=20, choices=chart_types, default='bar')

    def __str__(self):
        return self.title
