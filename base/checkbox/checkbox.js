import React, { Component } from 'react';

export default class BaseCheckbox extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }



    changeHadler(e)
    {
        this.props.onChange(e.target.checked);
    }



    getChecked()
    {
        return this.props.checked;
    }



    getKey()
    {
        if (typeof this.props.key == 'string') {
            return this.props.key;
        } else {
            return '';
        }
    }


    getCaption()
    {
        if (typeof this.props.Caption == 'string') {
            return this.props.Caption;
        } else {
            return 'Да';
        }
    }


    getDisabled()
    {
        if (typeof this.props.IsDisabled == 'boolean') {
            return this.props.IsDisabled;
        } else {
            return false;
        }
    }


    render() {
        return  (
            <label htmlFor="">
                <input
                  key={this.getKey()}
                  type="checkbox"
                  disabled={this.getDisabled()}
                  checked={this.getChecked()}
                  onChange={(e) => {
                    this.changeHadler(e);
                  }}
                  />&nbsp;{this.getCaption()}
            </label>
        )
    }
}