from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Workout
from .serializers import WorkoutSerializer

class WorkoutList(APIView):
    def get(self, request):
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)