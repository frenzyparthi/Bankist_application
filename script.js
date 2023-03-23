'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Parthi Ban',
  movements: [1200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Sasi Dharan',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Dinesh Kumar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sri Ram',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const arrow = mov < 0 ? '🔻' : '💹';
    const html = `<div class="movements__row">
                  <div class="movements__type movements__type--${type}">
                  ${i + 1} ${type}
                  </div>
                  <div class="movements__value">₹ ${mov}${arrow}</div>
                  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, temp) => sum + temp, 0);
  labelBalance.textContent = `₹ ${acc.balance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, temp) => sum + temp, 0);
  labelSumIn.textContent = `Rs.${incomes}`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, temp) => sum + temp, 0);
  labelSumOut.textContent = `Rs.${Math.abs(outcomes)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter(deposits => deposits > 1)
    .reduce((sum, _interest) => sum + _interest, 0);

  labelSumInterest.textContent = `Rs.${interest.toFixed(2)}`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};
createUserNames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display Balance
  calcDisplayBalance(acc);
  //Display Summary
  calcDisplaySummary(acc);
};

const createCreditScore = function (acc) {
  const calc = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((sum, temp) => sum + temp, 0)
  );
  const random = Number((calc * Math.random()).toFixed());
  console.log(random);
  const formula = random > 600 ? random : random + 350;
  acc.creditScore = random > 900 ? 850 : formula;
  console.log(`Your Credit Score is ${acc.creditScore}`);
  return acc.creditScore;
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  console.clear();
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount)
    console.log(
      `currentAccount is ${currentAccount.owner.split(' ').join('')}`
    );
  else console.log(`User not found`);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    console.log(`Logged in successfully`);
    containerApp.style.opacity = 100;
    //Display UI message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //Updating UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(`Transfer is getting validated please wait....`);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  setTimeout(function () {
    if (
      currentAccount.balance >= amount &&
      amount > 0 &&
      recieverAcc &&
      recieverAcc.username !== currentAccount.username
    ) {
      currentAccount.movements.push(-amount);
      recieverAcc.movements.push(amount);
      console.log(
        `🟢Transfered ${amount} rupees successfully to ${recieverAcc.owner}`
      );
      updateUI(currentAccount);
    } else {
      console.log(
        `🔴 Transfer failed:
         due to undefined reciever username 
         or due to insufficient balance 
         or trying to transfer to the same account`
      );
    }
  }, 3000);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(`Delete Account initiated`);

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin &&
    confirm(`Are you sure to delete your account?`)
  ) {
    console.log(`Closing the Account`);
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    setTimeout(function () {
      alert(`Account Deleted successfully`);
    }, 1000);
  } else {
    console.log(`Wrong Credentials! Please Try again!!!!`);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';

  if (amount > 0 && confirm('Are you sure applying for the Loan')) {
    console.log(`checking for credit score...`);
    setTimeout(function () {
      const eligible = createCreditScore(currentAccount);
      console.log(eligible);
      if (
        eligible > 720 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)
      ) {
        console.log(`You are eligible for the loan amount`);
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
        setTimeout(function () {
          alert(
            `Loan amount ${amount} is successfully credited to your account`
          );
        }, 2000);
      } else {
        console.log(
          eligible > 720
            ? `You are not eligible,since any of your transaction is not greater than the 10% of loan amount`
            : `You are not eligible,since your credit score is below 720`
        );
        alert(
          eligible > 720
            ? `You are not eligible,since any of your transaction is not greater than the 10% of loan amount`
            : `You are not eligible,since your credit score is below 720`
        );
      }
    }, 3000);
  }
});
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const maximumValue = movements.reduce((max, i) => {
//   if (i > max) return i;
//   else return max;
// }, movements[0]);
// console.log(maximumValue);

// console.log(movements);
