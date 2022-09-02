from dashboard_application.models import DashboardCardSettings
from django import forms



class DashboardCardSettingsForm(forms.ModelForm):
    title = forms.CharField(label="Title:", max_length=50, required=True, widget=forms.TextInput(attrs={'class':'mt-2 w-full border px-2 py-1 focus:border-blue-300 focus:outline-none'}))
    data_column = forms.CharField(label="Select column:", max_length=100, required=True, widget=forms.TextInput(attrs={'class':'hidden'}))
    action = forms.Select(attrs={})
    
    class Meta:
        model = DashboardCardSettings
        fields = ("title", "action", "data_column")
