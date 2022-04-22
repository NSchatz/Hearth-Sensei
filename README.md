## Heroku Link
https://hearth2sensei.herokuapp.com/


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
3. ```npm start``` or ```npm run build``` > ```python3 app.py```

## Using the Application 
1. From the Login Page, click 'Sign Up' and create a unique username and password. 
2. Once your account has been created, log in and you will be redirected to the homepage
3. You have many options from the main page/battle page including: 'Profile', 'Select Two Cards to Battle', 'Randomize Yourself',
   'Randomize Opponent', Or 'Randomize Both'.
4. To Battle, Select two cards from the drop down menu and click 'battle'. Your result will be shown and the battle will be recorded. 
5. Clicking 'Randomize Yourself' will select a random card for you. Select the opponents card and click 'battle'.
6. Clicking 'Randomize Opponent' will select a random card for the opponent. Select your card and click 'battle'.
7. Clicking 'Randomize Both' will select random cards for both you and the opponent. Click 'battle'
8. In Custom Battle, Enter values for Attack and Health for your custom card. Then randomize or select your opponent's card  and click 'battle'. 
9. Clicking View Profile will take you to your profile page. This page shows your past battles, the cards involved, and the result of each battle.
10. In Your Profile, you have the ability of deleting a past battle by clicking 'delete', or scroll to the bottom and click 'delete all enteries'. 
11. In Users, you can view all the profiles using Hearth-Sensei. This includes the user's name and their entire battle history. Use the select tab for a list of the users. Then click 'Load Profile' 
12. Clicking 'Main Page' will redirect you to the main page/battle page.
13. Clicking 'Github' will redirect you to our group Github repo. 
14. Clicking 'Logout' will log out the current user and redirect to the login page.


## Linting 
Python:
1. hearth_routes.py, Line 8,13,16: Invalid-Name. The Header, URL, and hearth_routes were not considered 'good-names' 
2. hearth_routes.py, Line 65,66: No-Member. Disabled. False positive for the '.commit()'
3. hearth_routes.py, Line 21: Function name "getHistory" doesn't conform to snake_case naming style (invalid-name). Disabled. 'getHistory' naming style
4. hearth_routes.py, Line 25: Variable name "id" doesn't conform to snake_case naming style (invalid-name). Disabled. 'id' naming style
5. hearth_routes.py, Line 57: Function name "mainUser" doesn't conform to snake_case naming style (invalid-name) Disabled. 'mainUser' naming style
6. hearth_routes.py, Line 68: Variable name "userList" doesn't conform to snake_case naming style (invalid-name) Disabled. 'userList' naming style
7. hearth_routes.py, Line 95: Instance of 'scoped_session' has no 'commit' member (no-member) Disabled. Empty commit. 
8. hearth_routes.py, Line 134: String statement has no effect (pointless-string-statement) Disabled. Multiple line comment. 
9. account_routes.py, Line 8: Invalid-Name. Invalid-Name. The account_routes were not considered 'good-names'
10. account_routes.py, Line 41,42: No-Member. Diabled. False positive for the '.commit()'
11. account_routes.py, Line 53: No-Else-Return. Disabled. Our if does have an else return
12. models.py, no-member. False Positives
13. models.py, too-few-public-methods. Did not need public methods in this file.
14. app.py, Line 29: Argument name "e" doesn't conform to snake_case naming style (invalid-name). Disabled. 'e' naming Style. 
15. app.py, Line 38: Argument name "id" doesn't conform to snake_case naming style (invalid-name). Disabled. 'id' naming Style.
Javascript: 
1. Battle.js, Line 2-5: 'Image1' is defined but never used. 'Image' is defined but never used. 'Container' is defined but never used. 'Link' is defined but never used   Disabled.  Added for later. 
2. Battle.js, Line 126-128: img elements must have an alt prop, either with meaningful text, or an empty string for decorative images. Disable. No need to have alt property. 
3. customBattle.js, Line 2,5,107: 'Image' is defined but never used. 'Link' is defined but never used. 'handleRandomize' is defined but never used Disabled. Added for later. 
4. Landing.js, Line 16,32: img elements must have an alt prop, either with meaningful text, or an empty string for decorative images. Disabled.
5. Profile.js, Line 9,10: Expected dot to be on same line as property  dot-location. Disabled. Dot location is fine. 
6. User.js, Line 10,11: Expected dot to be on same line as property  dot-location. Disabled. Dot location is fine. 
7. User.js, Line 35: Expected '===' and instead saw '=='. Disabled. '==' is fine. 