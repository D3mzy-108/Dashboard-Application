from random import choices
from django.shortcuts import render, redirect
from dashboard_application.forms import DashboardCardSettingsForm, DashboardChartSettingsForm

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

    dashboard_cards = DashboardCardSettings.objects.all().filter(
        uploaded_file=uploaded_file)

    cards = []

    for card in dashboard_cards:
        cards.append(card)

    dashboard_charts = DashboardChartSettings.objects.all().filter(
        uploaded_file=uploaded_file)

    charts = []

    for chart in dashboard_charts:
        charts.append(chart)
    
    if len(charts) == 1:
        first_chart_id = charts[0].id
        second_chart_id = None
    elif len(charts) == 2:
        first_chart_id = charts[0].id
        second_chart_id = charts[1].id
    else:
        first_chart_id = None
        second_chart_id = None

    context = {
        'uploaded_file': uploaded_file,
        'headings': headings,
        'rows': rows,
        'downloadable_file': uploaded_file.file.url,
        'cards': cards,
        'no_of_card_data': len(cards),
        'charts': charts,
        'no_of_charts': len(charts),
        'first_chart_id': first_chart_id,
        'second_chart_id': second_chart_id,
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


def add_card(request, id):
    if request.method == "POST":
        title = request.POST['title']
        data_column = request.POST['data_column']
        action = request.POST['action']

        if title is not None and data_column is not None and action is not None:
            DashboardCardSettings(title=title, data_column=data_column, action=action,
                                  uploaded_file=UploadedFile.objects.get(id=id)).save()
            return redirect('file_details', id)
    else:
        return redirect('file_details', id)


def edit_card(request, id, file_id):
    file_url = UploadedFile.objects.get(id=file_id).file.url[1:]
    file = open(f"{file_url}")
    csvreader = csv.reader(file)
    headings = []
    headings = next(csvreader)

    if request.method == "POST":
        form = DashboardCardSettingsForm(
            request.POST, instance=DashboardCardSettings.objects.get(id=id))
        # form.data_column = request.POST['data_columns']

        if form.is_valid():
            form.save()
            return redirect('file_details', file_id)
    else:
        form = DashboardCardSettingsForm(
            instance=DashboardCardSettings.objects.get(id=id))

    context = {
        'form': form,
        'file_id': file_id,
        'headings': headings,
        'selected_data_column': DashboardCardSettings.objects.get(id=id).data_column
    }

    return render(request, "dashboard_application/edit_card_and_chart.html", context)


def add_chart(request, id):
    if request.method == "POST":
        title = request.POST['chart_title']
        data_y = request.POST['data_y']
        data_x = request.POST['data_x']
        group_common_data = request.POST['group_common_data']

        if title is not None and data_x is not None and data_y is not None:
            DashboardChartSettings(
                title=title, data_y=data_y, data_x=data_x, group_common_data=group_common_data, uploaded_file=UploadedFile.objects.get(id=id)).save()

        return redirect('file_details', id)
    else:
        return redirect('file_details', id)


def edit_chart(request, id, file_id):
    file_url = UploadedFile.objects.get(id=file_id).file.url[1:]
    file = open(f"{file_url}")
    csvreader = csv.reader(file)
    headings = []
    headings = next(csvreader)

    if request.method == "POST":
        form = DashboardChartSettingsForm(
            request.POST, instance=DashboardChartSettings.objects.get(id=id))

        if form.is_valid():
            form.save()
            return redirect('file_details', file_id)
    else:
        form = DashboardChartSettingsForm(
            instance=DashboardChartSettings.objects.get(id=id))

    context = {
        'form': form,
        'file_id': file_id,
        'headings': headings,
        'selected_data_y': DashboardChartSettings.objects.get(id=id).data_y,
        'selected_data_x': DashboardChartSettings.objects.get(id=id).data_x
    }

    return render(request, "dashboard_application/edit_card_and_chart.html", context)
