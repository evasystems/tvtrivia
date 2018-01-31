'use strict';

// Array that all questions are being pushed to from the constructor
Question.allQuestions = [];

var questionCounter = 0;
var downloadTimer = null;

// sound files
var correct = new Audio('sound/correct.mp3');
var gameover = new Audio('sound/gameover.mp3');
var ticktock = new Audio('sound/ticktock.mp3');
var outoftime = new Audio('sound/outoftime.mp3');

// variables accessing elements in the HTML
var divQuestionEl = document.getElementById('question');
var divAnswerEl = document.getElementById('answers');
var divAnswerElAB = document.getElementById('answersAB');
var divAnswerElCD = document.getElementById('answersCD');
var nextQuestionDiv = document.getElementById('next-question');
var timerEl = document.getElementById('timer');
var divLevelIndicatorEl = document.getElementById('levelIndicator');
var endGameMsgEl = document.getElementById('endGameMsg');
var level = document.getElementById('level');
var divLogOutEl = document.getElementById('logout');
var rand = 0;

function User(username, password) {
  this.username = username;
  this.password = password;
  this.topScore = 0;
  User.allUsers.push(this);
}

// if page is refreshed set current user's score to 0 and save it to localStorage
// if currentUser's data exists in localStorage, retrieve it

User.currentUser = {name: '', score: 0, topScore: 0};
if(performance.navigation.type === 1 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
  User.currentUser['score'] = 0;
  saveCurrentUser();
  //set questionCounter to 0 as well
  questionCounter = 0;
}else if(performance.navigation.type === 0 && localStorage.currentUser){
  checkSavedCurrentUser();
  returnUser();
}


// Constructor function
function Question(question, answer, setOfAnswers) {
  this.question = question;
  this.answer = answer;
  this.setOfAnswers = setOfAnswers;
  Question.allQuestions.push(this);
}

// New Instances of the constructor
new Question('What movie won best picture at the 2017 Academy Awards?', 'Moonlight', ['Moonlight', 'La La Land', 'Manchester by the Sea', 'Fences']);
new Question('In the movie The Terminator, what is the name of the company that created Skynet?', 'Cyberdyne Systems', ['Cyberdyne Systems', 'Code Fellows', 'Multi-National United', 'Tetravaal']);
new Question('Emma Watson is known for playing which character in Harry Potter?', 'Hermione Granger', ['Hermione Granger', 'Luna Lovegood', 'Bellatrix Lestrange', 'Nymphadora Lupin']);
new Question('Bruce Banner turns into what fictional superhero when he becomes angry?', 'The Hulk', ['The Hulk', 'Batman', 'Ironman', 'Antman']);
new Question('Which actor played Marty McFly in the 1980\'s sci-fi classic Back to the Future?', 'Michael J. Fox', ['Michael J. Fox', 'John Cusak', 'Tom Cruise', 'Michael Keaton']);
new Question('Tyler Durden is a fictional character appearing as the central protagonist and antagonist in what 1999 american film?', 'Fight Club', ['Fight Club', 'The Matrix', 'The Green Mile', 'The Sixth Sense']);
new Question('What is the stage name of the member of Public Enemy who would later have a reality dating show?', 'Flavor Flav', ['Flavor Flav', 'Chuck D', 'Ice Cube' , 'Ol\' Dirty Bastard']);
new Question('Who interrupted Taylor Swift\'s acceptance speech at the 2009 Video Music Awards?', 'Kanye West', ['Kanye West', 'Blake Shelton', '2 Chains', 'Lil Wayne']);
new Question('Who is the former drummer for Nirvana that went on to become the frontman for the Foo Fighters?', 'Dave Grohl', ['Dave Grohl', 'Kurt Cobain', 'Chris Stapleton', 'Johnny Cash']);
new Question('Victoria Beckham was a member of which all girl English pop group formed in 1994?', 'The Spice Girls', ['The Spice Girls', 'Fifth Harmony', 'TLC', 'Destiny\'s Child']);
new Question('Released in 1992, what is the best selling soundtrack album of all time?', 'The Bodyguard', ['The Bodyguard', 'Aladdin', 'Gladiator', 'Batman Returns']);
new Question('"I\'d buy that for a dollar", is a catchphrase from what 1987 action movie set in Detroit, Michigan, in the near future?', 'Robocop', ['The Lost Boys', 'Lethal Weapon', 'Predator', 'Robocop']);
new Question('As a protest to Hollywood\'s portrayal of Native Americans in film, Marlon Brando declined an Academy Award for his performance in what movie?', 'The Godfather', ['The Godfather', 'Dirty Dancing', 'Ishtar', 'Fatal Attraction']);
new Question('In Disney\'s 1959 animated film Sleeping Beauty, who is Princess Aurora is betrothed to?', 'Prince Phillip', ['Belle', 'Prince Phillip', 'Prince Naveen', 'Prince Charming']);
new Question('Who produced and directed the American epic aviation war film "Hell\'s Angels", released in 1930?', 'Howard Hughes', ['Howard Hughes', 'William Powell', 'Leslie Howard', 'Fredric Marc']);
new Question('What was John Candy\'s character\'s name in the in 1987 comedy movie, "Planes, Trains, and Automobiles"?', 'Del Griffith', ['Del Griffith', 'Popeye', 'Frank Drebin', 'Barney Fife']);
new Question('In what year did Nintendo release its first game console in North America?', '1985', ['1985', '1980', '2000', '1995']);
new Question('American mobster Al Capone was sentenced to 11 years in federal prison for what crime', 'Tax Evasion', ['Tax Evasion', 'Murder', 'Trafficking', 'Kidnapping']);
new Question('How many people have walked on the moon?', 'Twelve', ['Twelve', 'One', 'Five', 'Fourteen']);
new Question('What is the name for the monetary unit used in Thailand?', 'Baht', ['Kyat', 'Baht', 'Riel', 'Rupee']);
new Question('The vehicle manufacturer Volvo was founded in what country?', 'Sweden', ['Finland', 'Norway', 'Sweden', 'Germany']);
new Question('In which country did cheddar cheese originate?', 'England', ['England', 'Netherlands', 'United States', 'Ireland']);
new Question('What is the name of the world’s fastest snake whose bite is almost 100% fatal?', 'Black Mamba', ['Black Mamba', 'King Cobra', 'Pit Viper', 'Sidewinder']);
new Question('The llama is native to which continent?', 'South America', ['North America', 'South America', 'Africa', 'Australia']);
new Question('The Great Red Spot is a giant storm located on which planet?', 'Jupiter', ['Saturn', 'Jupiter', 'Mars', 'Neptune']);
new Question('In humans, what is the only internal organ capable of regenerating lost tissue?', 'Liver', ['Liver', 'Spleen', 'Pancreas', 'kidney']);
new Question('What was the highest selling album of the 1980s in the United States?', 'Thriller', ['Thriller', 'Back in Black', 'Pretenders', 'Blizzard of Ozz'] );
new Question('What was the title of Kayne West\'s debut album release in 2004?','The College Dropout',['The College Dropout', 'The Life of Pablo', 'Yeezus', 'Graduation']);
new Question('Who was the lead singer of the band Audioslave?','Chris Cornell',['Chris Cornell', 'Eddie Vedder', 'Sammy Hagar', 'Bruce Springsteen']);
new Question('New Orleans is known as the birthplace of what type of music?','Jazz',['Jazz', 'Rock', 'Country', 'Hip Hop']);
new Question('Which pop star sang the national anthem at the 50th Super Bowl?','Lady Gaga',['Lady Gaga', 'Justin Timberlake', 'Katy Perry', 'Taylor Swift']);
new Question('Who was the lead singer of the rock band Queen?','Freddie Mercury',['Freddie Mercury', 'Mick Jagger', 'Steven Tyler', 'Bono']);
new Question('Which music group has received the most Grammy Awards?','U2',['U2', 'Metallica', 'Rolling Stones', 'Aerosmith']);
new Question('Which planet has the most moons?','Jupiter',['Jupiter', 'Uranus', 'Neptune', 'Saturn']);
new Question('In computer science, what does "GUI" stand for?','Graphical user interface',['Graphical user interface', 'Global Unique Identifier', 'Gyroscopic Upper Stage', 'Gaming Under the Influence']);

// random number generator
function randomNumGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Fisher-Yates Shuffle gives us a random order of an array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Main game question function
function gameQuestions() {
  divAnswerEl.addEventListener('click', answerButtonHandler);

  timerEl.removeAttribute('class', 'hidden-element');

  questionCounter += 1;
  countDownTimer();
  console.log(questionCounter);
  // pulling a random number from our array of questions
  rand = randomNumGenerator(0, Question.allQuestions.length - 1);
  var q1 = Question.allQuestions[rand];
  console.log(q1.question);
  var pEl = document.createElement('p');
  console.log(pEl);
  pEl.textContent = q1.question;
  //appending random question to an element in game.html
  divQuestionEl.appendChild(pEl);
  // shuffling the array of possible answer so that they appear in a random order and assigning to a variable
  var answerArray = shuffle(q1.setOfAnswers);
  // for loop to assign a letter to each question in the correct order
  for (var i = 0; i < answerArray.length; i++) {
    var letterIndex;
    if (i === 0) {
      letterIndex = 'A';
    } else if (i === 1) {
      letterIndex = 'B';
    } else if (i === 2) {
      letterIndex = 'C' ;
    } else {
      letterIndex = 'D';
    }
    // creating button elements for each letter/answer, assigning the value of an answer and appending to the form element that holds the buttons/answers
    var button = document.createElement('button');
    var span = document.createElement('span');
    span.textContent = letterIndex;
    button.setAttribute('name', answerArray[i]);
    button.innerHTML = answerArray[i];
    if (i === 0 || i === 1) {
      divAnswerElAB.appendChild(span);
      divAnswerElAB.appendChild(button);
    } else if (i === 2 || i === 3) {
      divAnswerElCD.appendChild(span);
      divAnswerElCD.appendChild(button);
    }
  }

  //remove previous level indicator
  if (divLevelIndicatorEl.childElementCount !== 0){
    removeLevelIndicator();
    levelIndicator();
  } else {
    //display current level
    levelIndicator();
  }
}

// Event Listener on div that holds questions
function answerButtonHandler(e) {
  console.log(e);
  var target = e.target.name;
  var correctAnswer = Question.allQuestions[rand].answer;
  var answerChoice = e.srcElement;
  var answerArray = Question.allQuestions[rand].setOfAnswers;
  var answerButtonEls = document.getElementsByTagName('button');
  if (!e.target.name) {
    return;
  }
  divAnswerEl.removeEventListener('click', answerButtonHandler);
  timerEl.setAttribute('class', 'hidden-element');
  if (correctAnswer === target) {
    answerChoice.setAttribute('id', 'correct');
    for (var i = 0; i < answerArray.length; i++) {
      answerButtonEls[i].setAttribute('class', 'no-hover');
      if (correctAnswer === answerArray[i]) {
        answerButtonEls[i].setAttribute('id', 'correct');
      }
    }

    User.currentUser['score'] += 1;
    ticktock.pause();
    correct.play();


    resetCurrentUserTopScore();
    //save currentUser to localStorage
    saveCurrentUser();

    Question.allQuestions.splice(rand, 1);
    clearCountDown();

    // if(questionCounter === 3){
    //   alert('Correct, but you have reached the max number of question');
    //   clearCountDown();
    //   endingGame();
    // }else{
    // clearCountDown();
    // creates button for next question
    var nextQuestionBtn = document.createElement('button');
    nextQuestionBtn.innerHTML = 'Next Question';
    nextQuestionDiv.appendChild(nextQuestionBtn);
    nextQuestionBtn.addEventListener('click', nextQuestionHandler);

  }else{
    answerChoice.setAttribute('id', 'incorrect');
    for (var j = 0; j < answerArray.length; j++) {
      answerButtonEls[j].setAttribute('class', 'no-hover');
      if (correctAnswer === answerArray[j]) {
        answerButtonEls[j].setAttribute('id', 'correct');
      }
    }
    console.log('incorrect');
    clearCountDown();
    ticktock.pause();
    gameover.play();
    resetCurrentUserScore();
    resetCurrentUserTopScore();
    saveCurrentUser();
    updateCUToAllUser();
    //ending game
    timerEl.innerHTML = '';
    endGameMsgEl.innerHTML = '<h2>Incorrect - Game Over</h2>';
    window.setInterval(function() {
      endingGame();
    }, 3000);
  }
}

function nextQuestionHandler(){
  divQuestionEl.innerHTML = '';
  divAnswerElAB.innerHTML = '';
  divAnswerElCD.innerHTML = '';
  nextQuestionDiv.innerHTML = '';
  gameQuestions();
}


function checkSavedCurrentUser(){
  var retrieve = JSON.parse(localStorage.getItem('currentUser'));
  User.currentUser['name'] = retrieve.name;
  User.currentUser['score'] = retrieve.score;
  User.currentUser['topScore'] = retrieve.topScore;

}

function saveCurrentUser(){
  localStorage.setItem('currentUser', JSON.stringify(User.currentUser));
}

function endingGame(){

  //retrieve currentUser info
  checkSavedCurrentUser();

  // clear out div
  endGameMsgEl.innerHTML = '';
  divLevelIndicatorEl.innerHTML = '';
  divQuestionEl.innerHTML = '';
  divAnswerEl.innerHTML = '';
  clearCountDown();
  timerEl.style.display = 'none';

  //display current user's name & score
  var nameScore = document.createElement('h2');
  nameScore.textContent = User.currentUser['name'] + ', your score is: ' + User.currentUser['score'];

  divQuestionEl.appendChild(nameScore);

  //display play again button
  var playAgainBtn = document.createElement('button');
  playAgainBtn.innerHTML = 'Play Again!';
  divQuestionEl.appendChild(playAgainBtn);
  playAgainBtn.addEventListener('click', pageReload);

  //save user info into localStorage
  saveCurrentUser();

}
function pageReload(){
  location.reload();
}

function resetCurrentUserScore(){
  User.currentUser['score'] = 0;
}

function countDownTimer(){
  var timeleft = 10;
  downloadTimer = setInterval(function(){
    document.getElementById('timer').innerHTML = --timeleft;
    ticktock.play();
    if (timeleft <= 0){
      ticktock.pause();
      outoftime.play();
      clearInterval(downloadTimer);
      document.getElementById('timer').innerHTML = '';
      endingGame();
    }
  },1000);
}

function clearCountDown(){
  clearInterval(downloadTimer);
  timerEl.innerHTML = '';
}


function levelIndicator(){
  if (questionCounter < 4){
    //display level 1
    level.textContent = 'Question ' + questionCounter + ' - Level EASY';
    divLevelIndicatorEl.appendChild(level);
  } else if (questionCounter > 3 && questionCounter < 7){
    //display level 2
    level.textContent = 'Question ' + questionCounter + ' - Level MEDIUM';
    divLevelIndicatorEl.appendChild(level);
  } else {
    //display level 3
    level.textContent = 'Question ' + questionCounter + ' - Level HARD';
    divLevelIndicatorEl.appendChild(level);
  }
}

function removeLevelIndicator(){
  level.remove;
}

function resetCurrentUserTopScore(){
  if(User.currentUser['score'] > User.currentUser['topScore']){
    User.currentUser['topScore'] = User.currentUser['score'];
  }
}

function updateCUToAllUser(){
  User.allUsers = JSON.parse(localStorage.getItem('allUsers'));
  for(var x = 0; x < User.allUsers.length; x++) {
    if(User.allUsers[x].username === User.currentUser['name']) {
      User.allUsers[x].topScore = User.currentUser['topScore'];
      localStorage.setItem('allUsers', JSON.stringify(User.allUsers));
    }
  }

}

function dispalyLogoutBtn(){
  var logOutBtn = document.createElement('button');
  logOutBtn.innerHTML = 'Logout';
  divLogOutEl.appendChild(logOutBtn);
  logOutBtn.addEventListener('click', logOutHandler);
}

function logOutHandler(e){
  e.preventDefault();
  //remove logout button
  divLogOutEl.innerHTML = '';
  //remove currentUser from localStorage
  localStorage.removeItem('currentUser');
  resetCurrentUserTopScore();
  updatingCurrentUserAllUserObject();

  //back to index.page
  window.location.href = 'index.html';


}

function returnUser(){
  //if currentUser exists in localStorage
  if(User.currentUser['name'].length > 0){
    //don't display login form
    //instead display welcome back message
    dispalyLogoutBtn();

  }else{
    //display login form
    //Add event listener to login-form
  }

}

function updatingCurrentUserAllUserObject(){
  for(var i in User.allUsers){
    if(User.allUsers[i].name === User.currentUser['name']){
      User.allUsers[i].topScore = User.currentUser['topScore'];
    }
  }
}

// calling the main game function on page load
gameQuestions();
