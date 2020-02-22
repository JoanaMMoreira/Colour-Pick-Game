import * as PIXI from 'pixi.js';
import { getRandomNumber } from './utils';

const renderNewGame = () => {
  let playerScore: number = 0;

  let numberOfClicks: number = 0;

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

  let colourIndex = 0;

  const timeField = new PIXI.Text(`Timer ${timeRemaining}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });

  timeField.anchor.set(0.5, 0.5);
  timeField.position.set(renderer.width / 2, 40);

  stage.addChild(timeField);

  const playerScoreText = new PIXI.Text(`Score ${playerScore}`, {
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

  mainCircle.drawCircle(renderer.width / 2, 220, 100);

  mainCircle.endFill();

  stage.addChild(mainCircle);

  let circleXPosition = 0;

  availableColours.map((colour, index) => {
    const colourCircle = new PIXI.Graphics();

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
    mainCircle.drawCircle(renderer.width / 2, 220, 100);

    renderer.render(stage);
  };

  const startTimer = () => {
    const downloadTimer = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(downloadTimer);
        timeField.text = 'Time is up';
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

    const setIntervalID = setInterval(rotateColours, 100);

    const randomNumber = await getRandomNumber();

    const stopInterval = () => {
      clearInterval(setIntervalID);

      mainCircle.clear();
      mainCircle.beginFill(availableColours[randomNumber]);
      mainCircle.lineStyle(2, 0xffffff);
      mainCircle.drawCircle(renderer.width / 2, 220, 100);

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

const displayResults = () => {
  const renderer: PIXI.Renderer = PIXI.autoDetectRenderer({
    width: 480,
    height: 600,
    backgroundColor: 0x1f1f1f
  });

  document.getElementById('pixi-app').appendChild(renderer.view);

  const stage: PIXI.Container = new PIXI.Container();

  const title = new PIXI.Text(`Game Over`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
  });

  title.anchor.set(0.5, 0.5);
  title.position.set(renderer.width / 2, 40);

  stage.addChild(title);

  const animate = () => {
    renderer.render(stage);
    requestAnimationFrame(animate);
  };

  animate();
};

renderNewGame();
