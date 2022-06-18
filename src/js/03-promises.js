import Notiflix from 'notiflix';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  const delayValue = parseInt(formRef.elements.delay.value);
  const stepValue = parseInt(formRef.elements.step.value);
  const amountValue = parseInt(formRef.elements.amount.value);

  e.preventDefault();
  createPromises(amountValue, delayValue, stepValue);
});

function createPromises(amount, delay, step) {
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    formRef.reset()
  }}


