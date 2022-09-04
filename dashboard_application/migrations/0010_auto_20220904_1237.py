# Generated by Django 3.2 on 2022-09-04 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard_application', '0009_dashboardcardsettings_chart_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dashboardcardsettings',
            name='chart_type',
        ),
        migrations.AddField(
            model_name='dashboardchartsettings',
            name='chart_type',
            field=models.CharField(choices=[('bar', 'Bar Chart'), ('line', 'Line Graph'), ('doughnut', 'Doughnut Chart')], default='bar', max_length=20, null=True),
        ),
    ]
