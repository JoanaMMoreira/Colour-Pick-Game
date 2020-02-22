import * as PIXI from 'pixi.js';
import { getRandomNumber } from './utils';

let playerScore: number = 0;

let numberOfClicks: number = 0;

let chosenColours: number[] = [];

const renderNewGame = () => {
  let timeRemaining: number = 20;

  const renderer: PIXI.Renderer = PIXI.autoDetectRenderer({
    width: 480,
    height: 600,
    backgroundColor: 0x1f1f1f
  });

  document.getElementById('pixi-app').appendChild(renderer.view);

  const stage: PIXI.Container = new PIXI.Container();

  const availableColours: number[] = [
    0xff2d00,
    0x002eff,
    0x31bb23,
    0xfbfe33,
    0xff7c00
  ];

  let colourIndex:number = 0;

  const timeField: PIXI.Text = new PIXI.Text(`Timer ${timeRemaining}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });

  timeField.anchor.set(0.5, 0.5);
  timeField.position.set(renderer.width / 2, 40);

  stage.addChild(timeField);

  const playerScoreText: PIXI.Text = new PIXI.Text(`Score ${playerScore}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });

  playerScoreText.anchor.set(0.5, 0.5);
  playerScoreText.position.set(renderer.width / 2, 75);

  stage.addChild(playerScoreText);

  const mainCircle: PIXI.Graphics = new PIXI.Graphics();

  mainCircle.beginFill(availableColours[colourIndex]);

  mainCircle.lineStyle(2, 0xffffff);

  mainCircle.drawCircle(renderer.width / 2, 260, 100);

  mainCircle.endFill();

  stage.addChild(mainCircle);

  let circleXPosition: number = 0;

  availableColours.map((colour: number, index: number) => {
    const colourCircle: PIXI.Graphics = new PIXI.Graphics();

    colourCircle.buttonMode = true;

    colourCircle.interactive = true;

    colourCircle.on('click', () => {
      handleClick(index);
    });

    colourCircle.beginFill(colour);

    colourCircle.lineStyle(2, 0xffffff);

    circleXPosition += 80;

    colourCircle.drawCircle(circleXPosition, 500, 30);

    colourCircle.endFill();

    stage.addChild(colourCircle);
  });

  const animate = () => {
    renderer.render(stage);
    requestAnimationFrame(animate);
  };

  animate();

  const rotateColours = () => {
    colourIndex += 1;
    if (colourIndex >= availableColours.length) {
      colourIndex = 0;
    }

    mainCircle.clear();
    mainCircle.beginFill(availableColours[colourIndex]);
    mainCircle.lineStyle(2, 0xffffff);
    mainCircle.drawCircle(renderer.width / 2, 260, 100);

    renderer.render(stage);
  };

  const startTimer = () => {
    const downloadTimer: NodeJS.Timeout = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(downloadTimer);
        document.getElementById('pixi-app').removeChild(renderer.view);
        displayResults();
      } else {
        timeField.text = `Timer ${timeRemaining}`;
      }
      timeRemaining -= 1;
    }, 1000);
  };

  const handleClick = async (index: number) => {
    // disable buttons
    renderer.plugins.interaction.destroy();

    numberOfClicks += 1;

    if (numberOfClicks === 1) {
      startTimer(); // start the timer on the first click
    }

    chosenColours = [...chosenColours, availableColours[index]];

    const setIntervalID: NodeJS.Timeout = setInterval(rotateColours, 100);

    const randomNumber: number = await getRandomNumber();

    const stopInterval = () => {
      clearInterval(setIntervalID);

      mainCircle.clear();
      mainCircle.beginFill(availableColours[randomNumber]);
      mainCircle.lineStyle(2, 0xffffff);
      mainCircle.drawCircle(renderer.width / 2, 260, 100);

      renderer.render(stage);

      if (index === randomNumber) {
        playerScoreText.text = `Score ${(playerScore += 1)}`;
      }

      // enable buttons
      renderer.plugins.interaction = new PIXI.interaction.InteractionManager(
        renderer
      );
    };

    setTimeout(stopInterval, 2000); // stop rotating after 2 seconds
  };
};

renderNewGame();

const displayResults = () => {
  const renderer: PIXI.Renderer = PIXI.autoDetectRenderer({
    width: 480,
    height: 600,
    backgroundColor: 0x1f1f1f
  });

  document.getElementById('pixi-app').appendChild(renderer.view);

  const stage: PIXI.Container = new PIXI.Container();

  const title: PIXI.Text = new PIXI.Text('Time is up!', {
    fontFamily: 'Arial',
    fontSize: 30,
    fill: 0xffffff,
    align: 'center'
  });

  title.anchor.set(0.5, 0.5);
  title.position.set(renderer.width / 2, 120);

  stage.addChild(title);

  const finalScore: PIXI.Text = new PIXI.Text(`Final score: ${playerScore}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });

  finalScore.anchor.set(0.5, 0.5);
  finalScore.position.set(renderer.width / 2, 200);

  stage.addChild(finalScore);

  const numberOfAttempts: PIXI.Text = new PIXI.Text(
    `Number of attempts: ${numberOfClicks}`,
    {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center'
    }
  );

  numberOfAttempts.anchor.set(0.5, 0.5);
  numberOfAttempts.position.set(renderer.width / 2, 260);

  stage.addChild(numberOfAttempts);

  let circleXPosition: number = 100;

  chosenColours.map((colour, index) => {
    const colourCircle = new PIXI.Graphics();

    colourCircle.beginFill(colour);

    colourCircle.lineStyle(2, 0xffffff);

    circleXPosition += 30;

    colourCircle.drawCircle(circleXPosition, 290, 10);

    colourCircle.endFill();

    stage.addChild(colourCircle);
  });

  const buttonText: PIXI.Text = new PIXI.Text('Try again', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });
  buttonText.anchor.set(0.5, 0.5);
  buttonText.position.set(75, 50);

  const playAgainButton: PIXI.Graphics = new PIXI.Graphics();

  playAgainButton.beginFill(0x425cff);
  playAgainButton.drawRoundedRect(0, 0, 150, 100, 10);
  playAgainButton.endFill();

  playAgainButton.buttonMode = true;
  playAgainButton.interactive = true;

  playAgainButton.addChild(buttonText);
  playAgainButton.position.set(170, 350);

  playAgainButton.on('click', () => {
    // reset game
    playerScore = 0;
    numberOfClicks = 0;
    chosenColours = [];
    document.getElementById('pixi-app').removeChild(renderer.view);
    renderNewGame();
  });

  stage.addChild(playAgainButton);

  const animate = () => {
    renderer.render(stage);
    requestAnimationFrame(animate);
  };

  animate();
};
