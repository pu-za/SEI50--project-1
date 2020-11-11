## General Assembly Project 1: Shooter Game
This is a project of a browser game using javascript and CSS.
Timeframe: 7days
## Goal
Functional use Vanilla JavaScript to create a game.
## Wins
Manage to complete the MVP on time.
Resolve the debugging.
 
## Challenges
Animate the moving structures of the game and make it smoother.
## Technologies
```
HTML, CSS, JavaScript, GIT
```
- version: 1.0.0
- License: MIT
- Author: Puja
 
## Shooter Game
A single-player game collecting the points shooting the balloons. Users watch out for toxic balloons.
Get 10 points in 30 seconds to win the game.
## Controls
movement: arrows (left, right, up, down),\
shoot: space
## Development process
* Create the game structure of the game board using HTML, CSS, and JavaScript (10 x 10)
Grid 10 x 10 was made with for loop and javascript attribute createElement. The function draws the game board.
* Set up the initial score and time on click the <i>start</i> button.
Function setTimeout starts counting the time and stops if it gains 10 points or after 30 seconds from the start. Return the result and clear the score and time.
* Create a box for a shooter and organize the functionality.
Function <i>panelControl</i> executes the given keyCode of pressed keyboard button. User manipulate the position up and down. On click the <i>space</i> button its creates the bullet. The destination of the bullet if from left to the right.
* Make the balloons appearing from the bottom and moving to the top of the screen.
Function <i>createBalloon</i> appears one balloon per one second with setTimeout as a loop until the end of the game. Balloons change the initial position randomly appearing normal and toxic balloons. Balloons move to the top clearing the box behind them. Once the initial position of the balloon does not change to the left or right until the top of the board.
 
* Check if there is a collision of the balloon with a bullet.
 
Inside the balloon movement, the if statement checks if the case of collision is true or false. On false function continue the loop. If it returns true then the balloon and bullet disappear. Users lose one point if the balloon was the toxic type or player gets one point if the balloon was the normal type.
 
* Update the score
 
Function <i>updateScore</i> recognise the collision cases. Then it passes the given parameters into the score.
 
* Update the time
 
Function <i>updateTime</i> change time state every second until it collets 30. Then it passes the given parameters into the score.
 
* Return the result
 
The <i>if statement</i> checks if the score has 10 points of time has 30 then the global function returns the last communication with the won or lost the game and the button to start again.
 



