from django.shortcuts import render, redirect

from dashboard_application.models import DashboardCardSettings, DashboardChartSettings, UploadedFile
import csv

# Create your views here.


def home(request):
    files = UploadedFile.objects.all()
    
    context = {
        'files': files,
    }

    return render(request, 'dashboard_application/home.html', context)

def file_details(request, id):
    uploaded_file = UploadedFile.objects.get(id=id)
    file_url = uploaded_file.file.url[1:]
    file = open(f"{file_url}")
    csvreader = csv.reader(file)
    
    headings = []
    headings = next(csvreader)
    
    rows = []
    for row in csvreader:
        rows.append(row)
        
    dashboard_cards = DashboardCardSettings.objects.all().filter(uploaded_file=uploaded_file)
    
    cards = []
    
    for card in dashboard_cards:
        cards.append(card)
        
    dashboard_charts = DashboardChartSettings.objects.all().filter(uploaded_file=uploaded_file)
    
    charts = []
    
    for chart in dashboard_charts:
        charts.append(chart)
    
    context = {
        'uploaded_file': uploaded_file,
        'headings': headings,
        'rows': rows,
        'downloadable_file': uploaded_file.file.url,
        'cards': cards,
        'no_of_card_data': len(cards),
        'charts': charts,
        'no_of_charts': len(charts),
    }
    
    return render(request, 'dashboard_application/file_details.html', context)

def add_file(request):
    if request.method == "POST":
        title = request.POST['title']
        file = request.FILES['file']
        
        if title is not None and file is not None:
            UploadedFile(title=title, file=file).save()
            return redirect('home')
            
    else:
        return redirect('home')


def delete_file(request, id):
    file = UploadedFile.objects.get(id=id)
    file.delete()
    return redirect('home')