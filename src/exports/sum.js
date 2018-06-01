import get from 'lodash.get';

const sum = (state, values, operations) => values.reduce((accumulator, cur, currentIndex) => {
  if (operations && operations[currentIndex] === '-') {
    return accumulator - get(state, cur, 0);
  } else if (operations && operations[currentIndex] === '%') {
    return (accumulator * cur).toFixed(2);
  } else if (operations && operations[currentIndex] === '*') {
    return accumulator * get(state, cur, 1);
  } else if (operations && operations[currentIndex] === '-/') {
    return get(state, cur, 0) / accumulator;
  } else if (operations && operations[currentIndex] === '/') {
    return accumulator / get(state, cur, 1);
  }
  return accumulator + get(state, cur, 0);
}, 0);

export default sum;
