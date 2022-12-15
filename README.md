# Code Architecture
Django is set up in a way where you can create files called "apps" within your overall application. These apps are in charge of different components of your web application. The main apps I created for my quiz application were questions, quizzes, and results. 

Each app includes some main python file components within the app:
- **models.py** file where the databases, base structure and configuration of your app is built using python. (You use the admin panel to control the inputs for each model in a more clean interface.)
- **admin.py** file registers your models into your admin panel(a space to view and control your SQLite databases and structure of your app). 
- **apps.py file** configures your app in your project. 
- **views.py file** allows you to control the output and create functions, and runs when a request to the URL associated with it is run. \newline

Within your base app, which in my case is "Untangled", there are some included files that are not present in other apps mostlyh for configuration purposes:
- **urls.py file** creates the URL pattern for that specific app in your overall website. (In my code this is also seen in my quizzes app since it has several views that need URL pathways)
- **settings.py file** deals with the entire configuration of your app, its URLs, databases, templates, apps, all need to be accounted for here.

Within my quizzes app I also included a templates folder with html files for the front end display of both the main and quiz URL paths as well as an img folder with all the user images. I also added a static folder to the quizzes app containing the main and quiz javascript files.


## MODELS.PY FILES

Within my models.py file for my **quizzes app** I included a quiz model that allows you to create different quizzes within the overall application and determine different components within them like what the number of questions are, what the topic is and what the name of the quiz is as seen below.

```
from django.db import models

class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_questions = models.IntegerField()

    def __str__(self):
        return f"{self.name}-{self.topic}"

    def get_questions(self):
        return self.question_set.all()[:self.number_of_questions]

    class Meta:
        verbose_name_plural = 'Quizzes'
```

The models.py file for my **questions app** includes a Question model which allows you to create questions and an Answer model which gives different answer choices and assigns them to the quizzes you want them to show up in. I only had one quiz, so I assigned all of my questions to the hair-identification quiz using the admin panel. In the Answer model, I also included a feature where the superuser can mark whether each answer associates with a certain hair type in the admin panel. (shown below)

```
from django.db import models

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
        return f"question: {self.question.text}
```

The models.py file for the **results app** stores user results with the Result model. I did not add a feature to store actual user accounts, so the results are not connected to specific users taking the quiz. (shown below)

```
from django.db import models

class Result(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.TextField()
    score = models.FloatField()

    def __str__(self):
        return str(self.pk)
```
## ADMIN.PY FILES
My admin.py files are very simple since they are just registering my models and this looks very similar across the apps. You would also need to import your model into the file, so if I wanted to register my quiz model you would see:
```
from django.contrib import admin
from quizzes.models import Quiz

admin.site.register(Quiz)
```

## APPS.PY FILES
apps.py files are similar to admin.py files in that they are usually very concise and uniform across most apps. The general structure looks something like this as displayed in my questions app apps.py file:
```
from django.apps import AppConfig


class QuestionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'questions'
```

## URLS.PY FILES
These files create URL paths to the different parts of your app. This is usually seen in just your main base app, but you can also create them for other apps within your Web application.
You also need to import your views used as well since views.py files are tied the the URL paths. For each view, you need to assign a URL path, as you can see in the bottom portion of my code below.

I added a urls.py file for quizzes that looks like this, because I created several different functions for views within my quizzes views.py file:
```
from django.urls import path
from .views import(
    QuizListView,
    quiz_view,
    quiz_data_view,
    save_quiz_view,
)

app_name = 'quizzes'

urlpatterns = [
    path('', QuizListView.as_view(), name='main-view'),
    path('<pk>/', quiz_view, name='quiz-view'),
    path('<pk>/save/', save_quiz_view, name='save-view'),
    path('<pk>/data/', quiz_data_view, name='quiz-data-view'),
]
```

This is urls.py file of my main app, Untangled:
```
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

#from django.views.static import serve
#from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('quizzes.urls', namespace='quizzes')),

    #url(r'^media/(?P<path>.*)$', serve,{'document_root':       settings.MEDIA_ROOT}), 
    #url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),    
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```
## VIEWS.PY FILES

I only updated my views.py file for one app which was my quizzes app because it had several functions that I wanted to include in my web app. I actually used an ajax function which refreshes part of the page instead of directing the site to a new URL path and added the user results in this new refreshed portion, after the user finishes answering the quiz questions and presses save. 

In this views.py file I started off by using the quiz_view function to show the properties of the quiz like the number of questions and a short description. I also made sure to import the necessary files at the top.
```
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
```
I then used the quiz_data_view function to display the different questions in my quiz to the users to answer.
```
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
```

After this I added a save_quiz_view function which clears the old data from the screen and gives your results page. Within this function, I created a long for loop with several if, and if else statements to determine what results to display to the user based on their answers to the quiz questions.
```
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
```

## SETTINGS.PY FILE
My primary Untangled app contains a settings.py file that registers almost every part of the django project as shown below:
```
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-&erw0444j^8@nx!hoe@)!uvfim8v=&fcvc&i$vk)%a0y)tqry-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True #False

ALLOWED_HOSTS = [] #'127.0.0.1'


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'quizzes',
    'questions',
    'results',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    #'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Untangled.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#WSGI_APPLICATION = 'Untangled.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'quizzes' / 'static',
    BASE_DIR / 'quizzes' / 'templates' / 'quizzes',
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
```
