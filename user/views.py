from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required

# Create your views here.


def login(request):
    if request.method == 'POST':
        username_or_email = request.POST['username_or_email']
        password = request.POST['password']

        if User.objects.filter(username=username_or_email).exists():
            username = username_or_email
        elif User.objects.filter(email=username_or_email).exists():
            username = User.objects.get(email=username_or_email).username
        else:
            username = None

        if username is not None:
            try:
                user = authenticate(username=username, password=password)
                auth.login(request, user)
                messages.success(request, f"Welcome back {username}")
                return redirect('home')
            except:
                messages.error(request, "Incorrect password.")
                return redirect('login')
        else:
            messages.error(request, "User does not exist.")
            return redirect('login')

    return render(request, 'user/login.html')


def register(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 == password2:
            if User.objects.all().filter(username=username).exists():
                messages.error(request, "Username has already been used.")
                return redirect('register')
            else:
                user = User.objects.create_user(
                    username=username, email=email, password=password1)
                
                auth.login(request, user)
                messages.success(request, "Your account has been created successfully.")
                
                return redirect('home')

        else:
            messages.error(request, "The passwords provided do not match.")
            return redirect('register')

    return render(request, 'user/register.html')


@login_required
def user_logout(request):
    logout(request)
    return redirect('login')
