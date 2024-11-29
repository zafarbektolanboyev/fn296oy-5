import React, { useState } from "react";
import calc from "./assets/calc.svg";

function App() {
  const [mortgageAmount, setMortgageAmount] = useState(0);
  const [term, setTerm] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [mortgageType, setMortgageType] = useState("repayment");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  function calculateRepayments() {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = term * 12;
    const repayment =
      mortgageType === "repayment"
        ? (mortgageAmount * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -numPayments))
        : mortgageAmount * monthlyRate;

    setMonthlyPayment(repayment.toFixed(2));
    setTotalRepayment(
      (repayment * (mortgageType === "repayment" ? numPayments : term * 12)).toFixed(2)
    );
  }

  const clearAll = () => {
    setMortgageAmount(300000);
    setTerm(25);
    setInterestRate(5.25);
    setMortgageType("repayment");
    setMonthlyPayment(null);
    setTotalRepayment(null);
  };

  return (
    <div>
      <div className="calcutator flex justify-center mt-[50px] w-[800px] mr-auto ml-auto bg-white flex-row">
        <div className="calc p-[20px] w-[500px] bg-white">
          <div className="title flex justify-between">
            <h3 className="text-xl text-[#133041] mb-5">Mortgage Calculator</h3>
            <a href="#" onClick={clearAll} className="text-gray-400">
              Clear all
            </a>
          </div>
          <div className="flex flex-col gap-[10px] mb-[20px]">
            <span className="text-gray-400">Mortgage Amount</span>
            <div className="flex">
              <span className="bg-[#E4F4FD] text-gray-400 p-[10px]">£</span>
              <input
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(+e.target.value)}
                className="border p-[8px] rounded-sm"
                type="number"
              />
            </div>
          </div>
          <div className="inputs flex gap-4 justify-between">
            <div className="flex flex-col">
              <span className="text-gray-400">Mortgage Term</span>
              <div className="flex">
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(+e.target.value)}
                  className="border rounded-sm p-[8px] w-[170px]"
                  placeholder="Enter number"
                />
                <span className="bg-[#E4F4FD] text-gray-400 p-[9px]">years</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">Interest Rate</span>
              <div className="flex">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(+e.target.value)}
                  className="border rounded-sm p-[8px] w-[170px]"
                  placeholder="Enter number"
                />
                <span className="p-[9px] bg-[#E4F4FD] text-gray-400">%</span>
              </div>
            </div>
          </div>
          <div className="radio-inputs mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                checked={mortgageType === "repayment"}
                value="repayment"
                onChange={(e) => setMortgageType(e.target.value)}
              />
              <span className="ml-2">Repayment</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                checked={mortgageType === "interestOnly"}
                value="interestOnly"
                onChange={(e) => setMortgageType(e.target.value)}
              />
              <span className="ml-2">Interest Only</span>
            </div>
          </div>
          <button
            onClick={calculateRepayments}
            className="flex gap-[12px] items-center text-center p-[15px] px-8 rounded-3xl bg-[#D8DB2F]"
          >
            <img src={calc} alt="Calculate" />
            <span className="text-[#133041] text-lg">Calculate Repayments</span>
          </button>
        </div>
        <div className="result bg-[#133041] w-[504px] rounded-r-[50px]  rounded-b-[50px] text-white p-8">
          <h4 className="text-2xl text-center mb-3">Results</h4>
          {monthlyPayment && totalRepayment ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-400">
                £{monthlyPayment}
              </h3>
              <p>Your monthly repayments</p>
              <h3 className="text-lg font-bold mt-4">£{totalRepayment}</h3>
              <p>Total you'll repay over the term</p>
            </div>
          ) : (
            <p className="text-center text-[#9ABED5]">
              Complete the form and click “Calculate Repayments” to see results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
