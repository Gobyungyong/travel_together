from django.urls import path

from . import views

# api/v1/comments/
urlpatterns = [
    path("", views.NewComment.as_view()),
]
