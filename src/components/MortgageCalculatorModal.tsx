import React, { useState } from 'react';
import { X, Calculator, DollarSign, Percent, Calendar, ShieldCheck, Check } from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { motion } from 'motion/react';

export const MortgageCalculatorModal: React.FC = () => {
  const { isMortgageCalcOpen, setIsMortgageCalcOpen, selectedProperty, formatPrice } = useRealEstate();

  const initialPrice = selectedProperty ? selectedProperty.price : 4500000;
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.1);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(4800);
  const [hoaMonthly, setHoaMonthly] = useState<number>(850);

  if (!isMortgageCalcOpen) return null;

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principal = homePrice - downPaymentAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Monthly Principal & Interest Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPrincipalAndInterest = monthlyRate === 0
    ? principal / totalPayments
    : (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyHomeInsurance = homeInsuranceAnnual / 12;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + hoaMonthly;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE4DA] relative my-6"
      >
        {/* Close button */}
        <button
          onClick={() => setIsMortgageCalcOpen(false)}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#1E232A] flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-[#FAF7F2] p-6 border-b border-[#E8E2D9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E232A] text-[#F2C98A] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-[#1E232A]">
              Luxury Investment & Mortgage Calculator
            </h3>
            <p className="text-xs text-[#7D8592]">
              Estimate monthly payments, private wealth loan amortization, taxes and insurance.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Big Result Card */}
          <div className="bg-[#1E232A] rounded-2xl p-6 text-white text-center space-y-1 shadow-lg border border-[#343D4A]">
            <span className="text-[10px] uppercase font-bold text-[#F2C98A] tracking-wider">
              Estimated Total Monthly Payment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              ${Math.round(totalMonthlyPayment).toLocaleString()} <span className="text-sm font-normal text-[#A0AAB8]">/ month</span>
            </div>
            <div className="pt-3 flex items-center justify-center gap-4 text-xs text-[#A0AAB8] border-t border-white/10 mt-3">
              <span>Principal & Interest: <strong>${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</strong></span>
              <span>Taxes & HOA: <strong>${Math.round(monthlyPropertyTax + hoaMonthly).toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Sliders and Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            
            {/* Property Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#1E232A]">
                <span>Property Purchase Price</span>
                <span>${homePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={50000000}
                step={50000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-[#C6852C] cursor-pointer"
              />
            </div>

            {/* Down Payment % */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#1E232A]">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span>${Math.round(downPaymentAmount).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#C6852C] cursor-pointer"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#1E232A]">
                <span>Interest Rate (%)</span>
                <span>{interestRate}%</span>
              </div>
              <input
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 font-bold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-[#1E232A]">
                <span>Loan Term</span>
                <span>{loanTermYears} Years</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermYears(term)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      loanTermYears === term
                        ? 'bg-[#1E232A] text-white border-[#1E232A]'
                        : 'bg-[#FAF8F5] text-[#1E232A] border-[#DDD6CB]'
                    }`}
                  >
                    {term} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly HOA */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E232A] block">Monthly HOA / Maintenance ($)</label>
              <input
                type="number"
                value={hoaMonthly}
                onChange={(e) => setHoaMonthly(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 font-bold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            {/* Property Tax Rate */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E232A] block">Annual Property Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 font-bold text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

          </div>

          <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-[#8A92A0]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#C6852C]" />
              Abdul's Private Wealth Concierge Financing Partner
            </span>
            <button
              onClick={() => setIsMortgageCalcOpen(false)}
              className="px-6 py-2 bg-[#1E232A] text-white rounded-full font-bold hover:bg-[#343D4A] cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
