from django.urls import path

from . import views

# api/v1/boards/
urlpatterns = [
    path("new/", views.NewBoard.as_view()),
]