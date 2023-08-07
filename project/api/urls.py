from django.urls import path
from . import views

urlpatterns = [
    path('ngrams/', views.ngrams_comparison, name='ngrams_comparison'),
]
