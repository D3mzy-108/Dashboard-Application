from datetime import datetime
from django.shortcuts import render, redirect
from dashboard_application.forms import DashboardCardSettingsForm, DashboardChartSettingsForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from dashboard_application.models import DashboardCardSettings, DashboardChartSettings, UploadedFile
import csv

# Create your views here.


@login_required
def home(request):
    files = UploadedFile.objects.all().filter(user=request.user)
    hour = datetime.now().strftime("%H")
    date_time = datetime.now().strftime("%d/%m/%Y %H:%M %p")
    
    if int(hour) < 12:
        greet = "Good morning"
        icon = "partly-sunny"
    elif int(hour) < 16:
        greet = "Good afternoon"
        icon = "sunny"
    else:
        greet = "Good evening"
        icon = "cloudy-night"

    context = {
        'files': files,
        'greet': greet,
        'icon': icon,
        'date_time': date_time
    }

    return render(request, 'dashboard_application/home.html', context)


def file_details(request, id):
    uploaded_file = UploadedFile.objects.get(id=id)
    file_url = uploaded_file.file.url[1:]

    file = open(f"{file_url}", 'rb')
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
        third_chart_id = None
        fourth_chart_id = None
        fifth_chart_id = None
    elif len(charts) == 2:
        first_chart_id = charts[0].id
        second_chart_id = charts[1].id
        third_chart_id = None
        fourth_chart_id = None
        fifth_chart_id = None
    elif len(charts) == 3:
        first_chart_id = charts[0].id
        second_chart_id = charts[1].id
        third_chart_id = charts[2].id
        fourth_chart_id = None
        fifth_chart_id = None
    elif len(charts) == 4:
        first_chart_id = charts[0].id
        second_chart_id = charts[1].id
        third_chart_id = charts[2].id
        fourth_chart_id = charts[3].id
        fifth_chart_id = None
    elif len(charts) == 5:
        first_chart_id = charts[0].id
        second_chart_id = charts[1].id
        third_chart_id = charts[2].id
        fourth_chart_id = charts[3].id
        fifth_chart_id = charts[4].id
    else:
        first_chart_id = None
        second_chart_id = None
        third_chart_id = None
        fourth_chart_id = None
        fifth_chart_id = None

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
        'third_chart_id': third_chart_id,
        'fourth_chart_id': fourth_chart_id,
        'fifth_chart_id': fifth_chart_id,
    }

    return render(request, 'dashboard_application/file_details.html', context)


@login_required
def add_file(request):
    if request.method == "POST":
        title = request.POST['title']
        file = request.FILES['file']

        if title is not None and file is not None:
            UploadedFile(title=title, file=file, user=request.user).save()
            return redirect('home')

    else:
        return redirect('home')


@login_required
def edit_file(request, id):
    if request.method == "POST":
        title = request.POST['edit_title']
        file = request.FILES['edit_file_input']
        
        editting_file = UploadedFile.objects.get(id=id)
        
        if file == "" or file == None:
            editting_file.title = title
            editting_file.save()
        else:
            editting_file.title = title
            editting_file.file = file
            editting_file.save()
        return redirect('home')
    else:
        messages.error(request, "There was an error while updating file.")
        return redirect('home')


@login_required
def delete_file(request, id):
    file = UploadedFile.objects.get(id=id)
    if request.user.id is file.user.id:
        file.delete()
    else:
        messages.warning(request, "You are not permitted to delete this file")
    return redirect('home')


@login_required
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


@login_required
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


@login_required
def add_chart(request, id):
    if request.method == "POST":
        title = request.POST['chart_title']
        data_y = request.POST['data_y']
        data_x = request.POST['data_x']
        group_common_data = request.POST['group_common_data']
        chart_type = request.POST['chart_type']

        if title is not None and data_x is not None and data_y is not None:
            DashboardChartSettings(
                title=title, data_y=data_y, data_x=data_x, group_common_data=group_common_data, uploaded_file=UploadedFile.objects.get(id=id), chart_type=chart_type).save()

        return redirect('file_details', id)
    else:
        return redirect('file_details', id)


@login_required
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
