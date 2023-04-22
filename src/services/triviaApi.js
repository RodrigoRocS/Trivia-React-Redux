const getRequest = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const returnRequest = request.json();
  return returnRequest;
};

const getTrivia = async (test) => {
  const requestTrivia = await fetch(`https://opentdb.com/api.php?amount=5&token=${test}`);
  const returnTrivia = requestTrivia.json();
  return returnTrivia;
};

export { getRequest, getTrivia };
