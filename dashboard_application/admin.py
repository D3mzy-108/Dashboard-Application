from django.contrib import admin
from .models import DashboardCardSettings, DashboardChartSettings, UploadedFile

# Register your models here.


@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    pass


@admin.register(DashboardCardSettings)
class DashboardCardSettingsAdmin(admin.ModelAdmin):
    pass


@admin.register(DashboardChartSettings)
class DashboardChartSettingsAdmin(admin.ModelAdmin):
    pass
