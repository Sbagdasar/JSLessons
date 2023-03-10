import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyType} from '../../redux/currencyReducer';
import {ChangeActionAC, ChangeCurrencyFieldAC, ChangeCurrentCurrencyAC} from '../../redux/actions';
import {useAppDispatch, useAppSelector} from "../../redux/state";

export const CurrencyEContainer = () => {


    const currencies = useAppSelector<Array<CurrencyType>>(state => state.currency.currencies)
    const currentCurrency = useAppSelector<string>(state => state.currency.currentCurrency)
    const isBuying = useAppSelector<boolean>(state => state.currency.isBuying)
    const amountOfBYN = useAppSelector<string>(state => state.currency.amountOfBYN)
    const amountOfCurrency = useAppSelector<string>(state => state.currency.amountOfCurrency)

    const dispatch = useAppDispatch()

    const setCurrencyAmount=(amountOfBYN: string, amountOfCurrency: string)=> {
        dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
    }
    const setAction=(isBuying: boolean)=> {
        dispatch(ChangeActionAC(isBuying));
    }
    const changeCurrency=(currency: string)=> {
        dispatch(ChangeCurrentCurrencyAC(currency));
    }

    let
        currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                }
            } else {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};


