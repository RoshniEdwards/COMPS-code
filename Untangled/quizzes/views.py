from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse
from questions.models import Question
from questions.models import Answer
from results.models import Result
# from django.shortcuts import HttpResponse
# Create your views here.

class QuizListView(ListView):
    model = Quiz
    template_name = 'quizzes/main.html'

def quiz_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request, 'quizzes/quiz.html', {'obj': quiz})

def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q): answers})
    return JsonResponse({
        'data': questions,
        #'time': quiz.time,
    })

def save_quiz_view(request, pk):
    #print(request.POST)
    #if request.request.headers.get('x-requested-with') == 'XMLHttpRequest':
    if request.method == 'POST':
        questions = []
        data = request.POST
        data_ = dict(data.lists())

        for k in data_.keys():
            print('key: ', k)
            if k != 'csrfmiddlewaretoken':
                question = Question.objects.get(text=k)
                questions.append(question)
        print(questions)

        user = request.user
        quiz = Quiz.objects.get(pk=pk)

        results = []
        
        type_1a_score = 0
        type_1b_score = 0
        type_1c_score = 0
        type_2a_score = 0
        type_2b_score = 0
        type_2c_score = 0
        type_3a_score = 0
        type_3b_score = 0
        type_3c_score = 0
        type_4a_score = 0
        type_4b_score = 0
        type_4c_score = 0

        correct_answer = None
        #type_1a = None
        #type_1b = None
        #type_1c = None
        #type_2a = None
        #type_2b = None
        #type_2c = None
        #type_3a = None
        #type_3b = None
        #type_3c = None
        #type_4a = None
        #type_4b = None
        #type_4c = None

        for q in questions:
            a_selected = request.POST.get(q.text)

            if a_selected != "":
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.Type_1A:
                            type_1a_score += 1
                            #type_1a = a.text
                            correct_answer = a.text
                        if a.Type_1B:
                            type_1b_score += 1
                            #type_1b = a.text
                            correct_answer = a.text
                        if a.Type_1C:
                            type_1c_score += 1
                            #type_1c = a.text
                            correct_answer = a.text
                        if a.Type_2A:
                            type_2a_score += 1
                            #type_2a = a.text
                            correct_answer = a.text
                        if a.Type_2B:
                            type_2b_score += 1
                            #type_2b = a.text
                            correct_answer = a.text
                        if a.Type_2C:
                            type_2c_score += 1
                            #type_2c = a.text
                            correct_answer = a.text
                        if a.Type_3A:
                            type_3a_score += 1
                            #type_3a = a.text
                            correct_answer = a.text
                        if a.Type_3B:
                            type_3b_score += 1
                            #type_3b = a.text
                            correct_answer = a.text
                        if a.Type_3C:
                            type_3c_score += 1
                            #type_3c = a.text
                            correct_answer = a.text
                        if a.Type_4A:
                            type_4a_score += 1
                            #type_4a = a.text
                            correct_answer = a.text
                        if a.Type_4B:
                            type_4b_score += 1
                            #type_4b = a.text
                            correct_answer = a.text
                        if a.Type_4C:
                            type_4c_score += 1
                            #type_4c = a.text
                            correct_answer = a.text
                    else:
                        if a.Type_1A:
                            #type_1a = a.text
                            correct_answer = a.text
                        if a.Type_1B:
                            #type_1b = a.text
                            correct_answer = a.text
                        if a.Type_1C:
                            #type_1c = a.text
                            correct_answer = a.text
                        if a.Type_2A:
                            #type_2a = a.text
                            correct_answer = a.text
                        if a.Type_2B:
                            #type_2b = a.text
                            correct_answer = a.text
                        if a.Type_2C:
                            #type_2c = a.text
                            correct_answer = a.text
                        if a.Type_3A:
                            #type_3a = a.text
                            correct_answer = a.text
                        if a.Type_3B:
                            #type_3b = a.text
                            correct_answer = a.text
                        if a.Type_3C:
                            #type_3c = a.text
                            correct_answer = a.text
                        if a.Type_4A:
                            #type_4a = a.text
                            correct_answer = a.text
                        if a.Type_4B:
                            #type_4b = a.text
                            correct_answer = a.text
                        if a.Type_4C:
                            #type_4c = a.text
                            correct_answer = a.text
                results.append({str(q): {'answered': a_selected}})
                #'type_1a': type_1a, 'type_1b': type_1b, 'type_1c': type_1c, 'type_2a': type_2a, 'type_2b': type_2b, 'type_2c': type_2c, 'type_3a': type_3a, 'type_3b': type_3b, 'type_3c': type_3c, 'type_4a': type_4a, 'type_4b': type_4b, 'type_4c': type_4c,
            else:
                results.append({str(q): 'not answered'})
        
        result = Result(quiz=quiz, user=user, score=type_1a_score)
        result.save()

        if type_1a_score >= 0:
            return JsonResponse({
                'passed': True,
                'results': results,
                'scores': {
                    'type_1a_score': type_1a_score,
                    'type_1b_score': type_1b_score,
                    'type_1c_score': type_1c_score,
                    'type_2a_score': type_2a_score,
                    'type_2b_score': type_2b_score,
                    'type_2c_score': type_2c_score,
                    'type_3a_score': type_3a_score,
                    'type_3b_score': type_3b_score,
                    'type_3c_score': type_3c_score,
                    'type_4a_score': type_4a_score,
                    'type_4b_score': type_4b_score,
                    'type_4c_score': type_4c_score,
                }
            })
        else:
            return JsonResponse({'passed': False})