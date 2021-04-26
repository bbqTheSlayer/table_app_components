import React, { Component } from 'react';

export default class BaseTextArea extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }



    changeHadler(e)
    {
        this.props.onChange(e.target.value);
    }



    getPlaceholder()
    {
        if (typeof this.props.placeholder == 'string') {
            return this.props.placeholder;
        } else {
            return '';
        }
    }



    getValue()
    {
        if (typeof this.props.value == 'string') {
            return this.props.value;
        } else {
            return '';
        }
    }


    getKey()
    {
        if (typeof this.props.key == 'string') {
            return this.props.key;
        } else {
            return '';
        }
    }



    render()
    {
        let ClassArray = [
            'form-control'
        ];

        const ClassString = ClassArray.join(' ');

        return (
            <textarea
              key={this.getKey()}
              className={ClassString}
              placeholder={this.getPlaceholder()}
              onChange={(e) => {
                this.changeHadler(e);
              }}
              value={this.getValue()}
            >
            </textarea>
        )
    }
}