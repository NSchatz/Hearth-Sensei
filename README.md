## Install Requirements
1. ```sudo apt-get update```
2. ```sudo apt install python3-pip```
3. ```python3 -m ensurepip --upgrade```
4. ```pip3 install flask```
5. ```pip install python-dotenv```
6. ```pip install requests```
7. ```sudo apt install postgresql```
8. ```sudo -u postgres psql```
9. ```pip install psycopg2-binary```
10. ```pip install Flask-SQLAlchemy==2.1```
11. ```pip install flask-login```
12. ```sudo apt install npm```
13. ```npm install```

## Running locally
1. In your desired directory, clone the repo ```https://github.com/NSchatz/Hearth-Sensei.git```
2. ```cd``` to Hearth-Sensei directory.

## Install Requirements
1. ```sudo apt-get update```
2. ```sudo apt install python3-pip```
3. ```python3 -m ensurepip --upgrade```
4. ```pip3 install flask```
5. ```pip install python-dotenv```
6. ```pip install requests```
7. ```sudo apt install postgresql```
8. ```sudo -u postgres psql```
9. ```pip install psycopg2-binary```
10. ```pip install Flask-SQLAlchemy==2.1```
11. ```pip install flask-login```
12. ```sudo apt install npm```
13. ```npm install```

## Running locally
1. In your desired directory, clone the repo ```https://github.com/NSchatz/Hearth-Sensei.git```
2. ```cd``` to Hearth-Sensei directory.
3. ```npm start```

## Using the Application 
1. From the Login Page, click 'Sign Up' and create a unique username and password. 
2. Once your account has been created, log in and you will be redirected to the homepage
3. You have many options from the main page/battle page including: 'Profile', 'Select Two Cards to Battle', 'Randomize Yourself',
   'Randomize Opponent', Or 'Randomize Both'.
4. To Battle, Select two cards from the drop down menu and click 'battle'. Your result will be shown and the battle will be recorded. 
5. Clicking 'Randomize Yourself' will select a random card for you. Select the opponents card and click 'battle'.
6. Clicking 'Randomize Opponent' will select a random card for the opponent. Select your card and click 'battle'.
7. Clicking 'Randomize Both' will select random cards for both you and the opponent. Click 'battle'
8. Clicking View Profile will take you to your profile page. This page shows your past battles, the cards involved, and the result of each battle
9. Clicking 'Main Page' will redirect you to the main page/battle page.

## Upcoming Features 
1. 'Battle History Edit/Delete. Ability to edit/delete the battle history on your profile page.
2. 'Card Creation'. Ability to create new cards and edit the attack/health stats.
3. 'Redo Battle'. Ability to redo the most previous battle.
4. 'Logout'. Ability to logout and create a new account.
4. More to come!

## Heroku Link
https://hearth-sensei.herokuapp.com/

## Linting 
1. hearth_routes.py, Line 8,13,16: Invalid-Name. The Header, URL, and hearth_routes were not considered 'good-names' 
2. hearth_routes.py, Line 65,66: No-Member. Disabled. False positive for the '.commit()'
3. account_routes.py, Line 8: Invalid-Name. Invalid-Name. The account_routes were not considered 'good-names'
4. account_routes.py, Line 41,42: No-Member. Diabled. False positive for the '.commit()'
5. account_routes.py, Line 53: No-Else-Return. Disabled. Our if does have an else return