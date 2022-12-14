from django.db import models
from quizzes.models import Quiz

# Create your models here.

class Result(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.TextField()
    score = models.FloatField()

    def __str__(self):
        return str(self.pk)