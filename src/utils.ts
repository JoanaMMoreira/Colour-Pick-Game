export const getRandomNumber = () => {
  // fetch random number
  return fetch(
    'https://www.random.org/integers/?num=1&min=0&max=4&col=1&base=10&format=plain&rnd=new'
  )
    .then((response) => response.json())
    .then((generatedRandomNumber) => generatedRandomNumber)
    .catch((error) => {
      console.log(error);
    });
};
