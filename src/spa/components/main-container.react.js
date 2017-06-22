import React from 'react';
import SetupProfile from './profile/setup-profile.react';
import { defaultStore } from '../flux/default/default-store.js';
import { mainViews } from '../enums/main-views.js';
import { modalKeys } from '../enums/modal-keys.js';
import Chats from './chat/chats.react.js';

import './main.scss';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    _getState() {
        return {
            mainView: defaultStore.mainView
        };
    }

    render() {
        let content;
        switch (this.state.mainView) {
            case mainViews.chats:
                content = <Chats />;
                break;
            case mainViews.setupProfile:
                content = <SetupProfile />;
                break;
            default:
                content = <span>Unexpected view</span>
                break;
        }
        return (
            <div className="main-container">
                {content}
            </div>
        );
    }

    componentDidMount() {
        defaultStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        defaultStore.removeChangeListener(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(this._getState());
    }
}

export default MainContainer;