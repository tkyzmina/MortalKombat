const getRandom = (num) => Math.ceil(Math.random() * num);

const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export { getRandom, getTime };
