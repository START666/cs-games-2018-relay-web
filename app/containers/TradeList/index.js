import React from 'react';
import {call, put, takeLatest} from 'redux-saga/effects';
import request from '../../api/request';
import Deferred from '../Deferred';
import {loadWallets} from "../Wallet/actions";

export default class CurrentAmount extends React.Component {
    getTradeList() {
        return request('/api/trades');
    }

    render() {
        return (
            <div>
                {this.getTradeList()}
            </div>
        )
    }
}

class TradeList extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <button onClick={this.props.onLoadTradeList} className={this.props.classes.test}>
                    click here to load tradelist
                </button>
                <LoadingError
                    loading={this.props.walletsLoading}
                    error={this.props.walletsError}
                    errorNode={<p>error</p>}
                >
                    <div>
                        {this.props.wallets.map((wallet, index) => (
                            <div key={wallet.address}>
                                <h3>wallet {index}:</h3>
                                <div>
                                    <div><span>address: </span><span>{wallet.address}</span></div>
                                    <div><span>username: </span><span>{wallet.username }</span></div>
                                    <div><span>amount: </span><span>{wallet.amount} {wallet.currency}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </LoadingError>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoadTradeList: (evt) => {
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        dispatch(loadWallets());
    },
});