from django.urls import path
from . import views

app_name = "main"

urlpatterns = [
    # Route view
    path('', views.route, name="route"),

    # Map view
    path('map/', views.map, name="map"),
]
