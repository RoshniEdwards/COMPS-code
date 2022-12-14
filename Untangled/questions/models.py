from django.db import models
from quizzes.models import Quiz

# Create your models here.

class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.text)

    def get_answers(self):
        return self.answer_set.all()

class Answer(models.Model):
    text = models.CharField(max_length=200)
    #correct = models.BooleanField(default=False)
    Type_1A = models.BooleanField(default=False)
    Type_1B = models.BooleanField(default=False)
    Type_1C = models.BooleanField(default=False)
    Type_2A = models.BooleanField(default=False)
    Type_2B = models.BooleanField(default=False)
    Type_2C = models.BooleanField(default=False)
    Type_3A = models.BooleanField(default=False)
    Type_3B = models.BooleanField(default=False)
    Type_3C = models.BooleanField(default=False)
    Type_4A = models.BooleanField(default=False)
    Type_4B = models.BooleanField(default=False)
    Type_4C = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"question: {self.question.text}, answer: {self.text}, Type_1A: {self.Type_1A}, Type_1B: {self.Type_1B}, Type_1C: {self.Type_1C}, Type_2A: {self.Type_2A}, Type_2B: {self.Type_2B}, Type_2C: {self.Type_2C}, Type_3A: {self.Type_3A}, Type_3B: {self.Type_3B}, Type_3C: {self.Type_3C}, Type_4A: {self.Type_4A}, Type_4B: {self.Type_4B}, Type_4C: {self.Type_4C}"
