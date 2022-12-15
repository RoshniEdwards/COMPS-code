# Replication Instructions

Use [this link]([http://a.com](https://www.makeuseof.com/django-project-clone-run-locally/)) for further instruction on how to run a django project.
This was used for the text below..

To execute my code and run my web application you would need these things to start off:
- Python (Python3 and above)
- some sort of Python IDE to run the code
- Django installed on computer([Django Installation Guide](https://docs.djangoproject.com/en/4.1/topics/install/))
- A working knowledge of the Python-Django Library
- Pip3
- Familiarity with Python virtual environments
- Basic knowledge of Git and GitHub
- A GitHub account
- Git installed on your local machine
- Familiarity with the command line

## 1. Clone the Project From GitHub
## 2. Inspect the Project Files
Type ls in terminal to list all the content in the folder and check if all files are present.
## 3. Set Up Virtual Environment for Project
To remove old environment use `pipenv --rm` command in terminal. 
Remove any prior pipfiles with `rm Pipfile*`.
Install Pipenv dependencies on your version of Python with `pipenv install --python 3.10`.
Then, run `pipenv install requests` to install all packages of Pipfile.
Then activate virtual env `pipenv shell`.
If you used Venv to create virtual env, run dependencies with `pip install -r requirements.txt`.
To list installed dependencies use `pip freeze > requiremenrs.txt`.
I used sqlite built in to Django, so no need to install outside database
## 5. Generate a Secret Key
Have to create new secret key, since the old one is hidden. `SECRET_KEY = 'whatever-blah-blah-blah`
## 6. Migrate Project to the Database
In terminal use `python manage.py makemigrations Untangled`
Then, `python manage.py migrate`
## 7. Run the Project
Type `python manage.py runserver`in terminal and view project.



