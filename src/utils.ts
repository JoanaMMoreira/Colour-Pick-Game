export const getRandomNumber = (min: number, max: number) => {
  // fetch random number
  return fetch(
    `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
  )
    .then((response) => response.json())
    .then((generatedRandomNumber) => generatedRandomNumber)
    .catch((error) => {
      console.log(error);
    });
};
