from dashboard_application.models import DashboardCardSettings, DashboardChartSettings
from django import forms



class DashboardCardSettingsForm(forms.ModelForm):
    title = forms.CharField(label="Title:", max_length=50, required=True, widget=forms.TextInput(attrs={'class':'mt-2 w-full border px-2 py-1 focus:border-blue-300 focus:outline-none'}))
    data_column = forms.CharField(label="Select column:", max_length=100, required=True, widget=forms.TextInput(attrs={'class':'hidden'}))
    action = forms.Select(attrs={})
    
    class Meta:
        model = DashboardCardSettings
        fields = ("title", "action", "data_column")


class DashboardChartSettingsForm(forms.ModelForm):
    chart_types = [
        ('bar', 'Bar Chart'),
        ('line', 'Line Graph'),
        ('doughnut', 'Doughnut Chart')
    ]
    
    title = forms.CharField(label="Title:", max_length=50, required=True, widget=forms.TextInput(attrs={'class':'mt-2 w-full border px-2 py-1 focus:border-blue-300 focus:outline-none'}))
    data_y = forms.CharField(label="Select column:", max_length=100, required=True, widget=forms.TextInput(attrs={'class':'hidden'}))
    data_x = forms.CharField(label="Select column:", max_length=100, required=True, widget=forms.TextInput(attrs={'class':'hidden'}))
    chart_type = forms.CharField(label="Chart type:", max_length=50, required=True, widget=forms.Select(attrs={'class':'mt-2 w-full border px-2 py-1 focus:border-blue-300 focus:outline-none text-gray-700'}, choices=chart_types))
    
    class Meta:
        model = DashboardChartSettings
        fields = ("title","data_y","data_x","group_common_data", 'chart_type')

