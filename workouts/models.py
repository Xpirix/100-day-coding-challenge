from django.db import models

class Workout(models.Model):
    name = models.CharField(max_length=100)
    duration = models.IntegerField()  # Duration in minutes
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
