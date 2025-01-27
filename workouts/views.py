from .models import Workout
from .serializers import WorkoutSerializer
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

class WorkoutPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class WorkoutList(generics.ListCreateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    pagination_class = WorkoutPagination
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name']  # Search by name (case-insensitive search)
    filterset_fields = ['name']  # Filter by name (case-insensitive search)
    ordering_fields = ['name', 'duration']  # Sort by name or duration
    ordering = ['name']  # Default ordering

class WorkoutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
